import { useCallback, useState } from 'react';
import BigNumber from 'bignumber.js';
import type {
  ContractFunctionNames,
  Falsy,
  Params,
  Transaction,
  TransactionStatus,
  TypedContract,
} from '../interfaces/dappType';

import { XLog } from '../common/utils';
import { useXterioWalletContext } from '.';
import * as particleAA from '@particle-network/rn-aa';
import { evm, type CommonError } from '@particle-network/rn-auth-core';
import { AAFeeMode, EvmService } from '@particle-network/rn-base';
import type { WholeFeeQuote } from '@particle-network/rn-aa';
import { SendTransactionMode } from '../interfaces/types';

export interface IPnTransactionState<
  T extends TypedContract,
  FN extends ContractFunctionNames<T>,
> {
  sendTransaction(
    ...args: [...Params<T, FN>, Transaction?]
  ): Promise<void | string>;
  sendUserOperation(tx: Transaction | Transaction[]): Promise<void | string>;
  state: TransactionStatus;
  resetState(): void;
}

export const useXterioTransaction = <
  T extends TypedContract,
  FN extends ContractFunctionNames<T>,
>(
  contract?: T | Falsy,
  functionName?: FN
): IPnTransactionState<T, FN> => {
  const { aaAddress, eoaAddress, envConfig } = useXterioWalletContext();

  const [state, setState] = useState<TransactionStatus>({ status: 'None' });
  const resetState = useCallback(() => {
    setState({ status: 'None' });
  }, [setState]);

  const getTransaction = useCallback(
    async (tx: Transaction | Transaction[]): Promise<string[]> => {
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

  const getTxHash = useCallback(
    async (tx: Transaction | Transaction[]) => {
      if (!aaAddress) {
        throw new Error('pn smartAccount not ready.');
      }
      setState({ status: 'PendingSignature' });

      const mode = envConfig?.transactionMode || SendTransactionMode.UserSelect;
      const transaction = await getTransaction(tx);

      const wholeFeeQuote = (await particleAA.rpcGetFeeQuotes(
        eoaAddress,
        transaction
      )) as WholeFeeQuote;

      XLog.debug('wholeFeeQuote=', wholeFeeQuote, mode);
      setState({ status: 'Mining' });

      //check
      if (mode === SendTransactionMode.Gasless) {
        const verifyingPaymasterGasless =
          wholeFeeQuote.verifyingPaymasterGasless;
        if (verifyingPaymasterGasless === undefined) {
          XLog.debug('Gasless mode is not available');
          setState({ status: 'Exception' });
          return;
        }
      } else if (mode === SendTransactionMode.UserPaidNative) {
        const feeQuote = wholeFeeQuote.verifyingPaymasterNative.feeQuote;
        const fee = BigNumber(feeQuote.fee);
        const balance = BigNumber(feeQuote.balance);

        // Check if user can afford te transaction
        if (balance.isLessThan(fee)) {
          XLog.debug('Native balance too low to pay for gas fees');
          setState({ status: 'Exception' });
          return;
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
          setState({ status: 'Exception' });
          return;
        }
      }

      const feeMode =
        mode === SendTransactionMode.Gasless
          ? AAFeeMode.gasless(wholeFeeQuote)
          : mode === SendTransactionMode.UserPaidNative
            ? AAFeeMode.native(wholeFeeQuote)
            : AAFeeMode.token(wholeFeeQuote);

      return evm
        .batchSendTransactions(transaction, feeMode)
        .then((res) => {
          XLog.debug('pn AA sendTransaction txhash ====', res);
          setState({ status: 'Success' });
          return res;
        })
        .catch((err: CommonError) => {
          XLog.debug('pn AA sendTransaction failure', err);
          setState({ status: 'Fail' });
        });
    },
    [aaAddress, envConfig?.transactionMode, eoaAddress, getTransaction]
  );

  const send = useCallback(
    async (...args: [...Params<T, FN>, Transaction?]) => {
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
      const opts = hasOpts ? (args[args.length - 1] as Transaction) : undefined;
      const modifiedArgs = hasOpts ? args.slice(0, args.length - 1) : args;

      const tx = {
        to: contract.address,
        data: contract.interface.encodeFunctionData(functionName, modifiedArgs),
        // value: opts?.value,
        ...opts,
      };

      return getTxHash(tx);
    },
    [contract, functionName, getTxHash]
  );

  const sendUserOperation = useCallback(
    async (tx: Transaction | Transaction[]) => {
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
  };
};
