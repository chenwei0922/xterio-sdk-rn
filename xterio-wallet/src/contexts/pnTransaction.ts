import { useCallback, useState } from 'react';
import BigNumber from 'bignumber.js';
import type {
  ContractFunctionNames,
  Falsy,
  LogDescription,
  Params,
  TransactionParam,
  TransactionReceipt,
  TransactionResponse,
  TransactionState,
  TransactionStatus,
  TypedContract,
} from '../interfaces/dappType';

import { Utils, XLog } from '../common/utils';
import { useXterioWalletContext } from '.';
import * as particleAA from '@particle-network/rn-aa';
import { evm } from '@particle-network/rn-auth-core';
import { AAFeeMode, EvmService } from '@particle-network/rn-base';
import type { WholeFeeQuote } from '@particle-network/rn-aa';
import { SendTransactionMode } from '../interfaces/types';
import { ethers, errors } from 'ethers';

export interface IPnTransactionState<
  T extends TypedContract,
  FN extends ContractFunctionNames<T>,
> {
  sendTransaction(
    ...args: [...Params<T, FN>, TransactionParam?]
  ): Promise<TransactionReceipt | undefined>;
  sendUserOperation(
    tx: TransactionParam | TransactionParam[]
  ): Promise<TransactionReceipt | undefined>;
  state: TransactionStatus;
  resetState(): void;
  events?: LogDescription[];
}

const isDroppedAndReplaced = (e: any) =>
  e?.code === errors.TRANSACTION_REPLACED &&
  e?.replacement &&
  (e?.reason === 'repriced' || e?.cancelled === false);

const usePromiseTransaction = () => {
  const [state, setState] = useState<TransactionStatus>({ status: 'None' });

  const resetState = useCallback(() => {
    setState({ status: 'None' });
  }, [setState]);

  const promiseTransaction = useCallback(
    async (transactionPromise: Promise<TransactionResponse>) => {
      let transaction: TransactionResponse | undefined;
      try {
        setState({ status: 'PendingSignature' });

        transaction = await transactionPromise;

        setState({ transaction, status: 'Mining' });
        let receipt;
        try {
          receipt = await transaction.wait();
        } catch (waitError) {
          XLog.error('Error waiting for transaction receipt:', waitError);
          setState({
            status: 'Exception',
            errorMessage: 'Failed to wait for transaction receipt.',
          });
          return undefined;
        }
        setState({ receipt, transaction, status: 'Success' });
        return receipt;
      } catch (e: any) {
        const parsedErrorCode = parseInt(
          e.error?.data?.code ?? e.error?.code ?? e.data?.code ?? e.code,
          10
        );
        const errorCode = isNaN(parsedErrorCode) ? undefined : parsedErrorCode;
        const errorHash = e?.error?.data?.originalError?.data ?? e?.error?.data;
        const errorMessage =
          e.error?.data?.message ??
          e.error?.message ??
          e.reason ??
          e.data?.message ??
          e.message;
        XLog.error('promiseTransaction err', e);
        if (transaction) {
          const droppedAndReplaced = isDroppedAndReplaced(e);

          if (droppedAndReplaced) {
            const status: TransactionState =
              e.receipt.status === 0 ? 'Fail' : 'Success';
            setState({
              status,
              transaction: e.replacement,
              originalTransaction: transaction,
              receipt: e.receipt,
              errorMessage,
              errorCode,
              errorHash,
            });
          } else {
            setState({
              status: 'Fail',
              transaction,
              receipt: e.receipt,
              errorMessage,
              errorCode,
              errorHash,
            });
          }
        } else {
          setState({ status: 'Exception', errorMessage, errorCode, errorHash });
        }
        return undefined;
      }
    },
    [setState]
  );

  return { promiseTransaction, state, resetState };
};

export const useXterioTransaction = <
  T extends TypedContract,
  FN extends ContractFunctionNames<T>,
>(
  contract?: T | Falsy,
  functionName?: FN
): IPnTransactionState<T, FN> => {
  const { aaAddress, eoaAddress, envConfig, provider } =
    useXterioWalletContext();
  const { promiseTransaction, state, resetState } = usePromiseTransaction();
  const [events, setEvents] = useState<LogDescription[] | undefined>(undefined);

  const createTransaction = useCallback(
    async (tx: TransactionParam | TransactionParam[]): Promise<string[]> => {
      const txs = Array.isArray(tx) ? tx : [tx];
      const transactions = await Promise.all(
        txs.map(async (_tx) => {
          const { data, value, to } = _tx;
          return EvmService.createTransaction(
            aaAddress,
            data || '',
            value ? BigNumber(value) : BigNumber(0),
            to
          );
        })
      );

      return transactions;
    },
    [aaAddress]
  );

  const getTxPromise = useCallback(
    async (_provider: ethers.providers.JsonRpcProvider, txHash: string) => {
      await Utils.sleep(500);
      for (let i = 0; ; i++) {
        let tx;
        try {
          tx = await _provider.getTransaction(txHash);
        } catch (e) {
          XLog.error('pn AA getTransaction exception:', e);
        }
        if (tx) {
          return tx;
        } else {
          await Utils.sleep(200);
        }
      }
    },
    []
  );

  const getTxHash = useCallback(
    async (tx: TransactionParam | TransactionParam[]) => {
      if (!aaAddress) {
        throw new Error('pn smartAccount not ready.');
      }

      const mode = envConfig?.transactionMode || SendTransactionMode.UserSelect;
      const transaction = await createTransaction(tx);

      const wholeFeeQuote = (await particleAA.rpcGetFeeQuotes(
        eoaAddress,
        transaction
      )) as WholeFeeQuote;

      XLog.debug('wholeFeeQuote=', wholeFeeQuote, mode);

      //check
      if (mode === SendTransactionMode.Gasless) {
        const verifyingPaymasterGasless =
          wholeFeeQuote.verifyingPaymasterGasless;
        if (verifyingPaymasterGasless === undefined) {
          XLog.debug('Gasless mode is not available');
          throw new Error('Gasless mode is not available');
        }
      } else if (mode === SendTransactionMode.UserPaidNative) {
        const feeQuote = wholeFeeQuote.verifyingPaymasterNative.feeQuote;
        const fee = BigNumber(feeQuote.fee);
        const balance = BigNumber(feeQuote.balance);

        // Check if user can afford te transaction
        if (balance.isLessThan(fee)) {
          XLog.debug('Native balance too low to pay for gas fees');
          throw new Error('Native balance too low to pay for gas fees');
        }
      } else {
        const feeQuotes = wholeFeeQuote.tokenPaymaster.feeQuotes as any[];
        const validFeeQuotes = feeQuotes.filter((item) => {
          const fee = BigNumber(item.fee);
          const balance = BigNumber(item.balance);
          if (balance.isLessThan(fee)) {
            return false;
          } else {
            return true;
          }
        });

        if (validFeeQuotes.length === 0) {
          XLog.debug('Token not valid to pay gas fees');
          throw new Error('Token not valid to pay gas fees');
        }
      }

      const feeMode =
        mode === SendTransactionMode.Gasless
          ? AAFeeMode.gasless(wholeFeeQuote)
          : mode === SendTransactionMode.UserPaidNative
            ? AAFeeMode.native(wholeFeeQuote)
            : AAFeeMode.token(wholeFeeQuote);

      const txHash = await evm.batchSendTransactions(transaction, feeMode);
      XLog.debug('pn AA sendTransaction txhash ====', txHash);
      const txPromise = getTxPromise(provider!, txHash);
      const receipt = await promiseTransaction(txPromise);
      return receipt;
    },
    [
      aaAddress,
      envConfig?.transactionMode,
      createTransaction,
      eoaAddress,
      getTxPromise,
      provider,
      promiseTransaction,
    ]
  );

  const send = useCallback(
    async (...args: [...Params<T, FN>, TransactionParam?]) => {
      if (!contract || !functionName) {
        throw new Error(`contract null or undefined`);
      }
      const numberOfArgs =
        contract.interface.getFunction(functionName).inputs.length;
      if (args.length !== numberOfArgs && args.length !== numberOfArgs + 1) {
        throw new Error(
          `Invalid number of arguments for function "${functionName}".`
        );
      }

      const hasOpts = args.length > numberOfArgs;
      const opts = hasOpts
        ? (args[args.length - 1] as TransactionParam)
        : undefined;
      const modifiedArgs = hasOpts ? args.slice(0, args.length - 1) : args;

      const tx = {
        to: contract.address,
        data: contract.interface.encodeFunctionData(functionName, modifiedArgs),
        // value: opts?.value,
        ...opts,
      };

      const receipt = await getTxHash(tx);
      if (receipt?.logs) {
        const _events = receipt.logs.reduce((accumulatedLogs, l) => {
          try {
            return l.address.toLowerCase() === contract.address.toLowerCase()
              ? [...accumulatedLogs, contract.interface.parseLog(l)]
              : accumulatedLogs;
          } catch (e) {
            XLog.error('pn AA receipt logs exception:', e);
            return accumulatedLogs;
          }
        }, [] as LogDescription[]);
        setEvents(_events);
      }
      return receipt;
    },
    [contract, functionName, getTxHash]
  );

  const sendUserOperation = useCallback(
    async (tx: TransactionParam | TransactionParam[]) => {
      //data is needed only when interacting with smart contracts.
      //Transaction: {to:'', value:'', data:''}
      return getTxHash(tx);
    },
    [getTxHash]
  );

  return {
    sendTransaction: send,
    sendUserOperation,
    state,
    resetState,
    events,
  };
};
