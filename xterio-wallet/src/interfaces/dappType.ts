import type {
  BigNumber,
  BigNumberish,
  Contract,
  ContractTransaction,
} from 'ethers';

export type { LogDescription } from 'ethers/lib/utils';

export interface TransactionParam {
  to: string;
  value?: string;
  data?: string;
  nonce?: number | string;
  gasLimit?: number | string;
}

export interface Log {
  blockNumber: number;
  blockHash: string;
  transactionIndex: number;

  removed: boolean;

  address: string;
  data: string;

  topics: Array<string>;

  transactionHash: string;
  logIndex: number;
}

export type AccessList = Array<{ address: string; storageKeys: Array<string> }>;
export interface Transaction {
  hash?: string;

  to?: string;
  from?: string;
  nonce: number;

  gasLimit: BigNumber;
  gasPrice?: BigNumber;

  data: string;
  value: BigNumber;
  chainId: number;

  r?: string;
  s?: string;
  v?: number;

  // Typed-Transaction features
  type?: number | null;

  // EIP-2930; Type 1 & EIP-1559; Type 2
  accessList?: AccessList;

  // EIP-1559; Type 2
  maxPriorityFeePerGas?: BigNumber;
  maxFeePerGas?: BigNumber;
}

export interface TransactionResponse extends Transaction {
  hash: string;

  // Only if a transaction has been mined
  blockNumber?: number;
  blockHash?: string;
  timestamp?: number;

  confirmations: number;

  // Not optional (as it is in Transaction)
  from: string;

  // The raw transaction
  raw?: string;

  // This function waits until the transaction has been mined
  wait: (confirmations?: number) => Promise<TransactionReceipt>;
}

export type TransactionState =
  | 'None'
  | 'PendingSignature'
  | 'Mining'
  | 'Success'
  | 'Fail'
  | 'Exception'
  | 'CollectingSignaturePool';

export interface TransactionOptions {
  gasLimit: BigNumberish;
  txValue?: BigNumberish;
  feeData?: {
    lastBaseFeePerGas: null | BigNumber;
    maxFeePerGas: null | BigNumber;
    maxPriorityFeePerGas: null | BigNumber;
    gasPrice: null | BigNumber;
  };
}

export interface TransactionStatus {
  /**
   * Current state of the transaction. See [TransactionState](https://usedapp-docs.netlify.app/docs/API%20Reference/Models#transactionstate).
   */
  status: TransactionState;
  /**
   * optional field. See [Transaction Response](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse).
   */
  transaction?: TransactionResponse;
  /**
   * optional field. See [Transaction Receipt](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt).
   */
  receipt?: TransactionReceipt;
  /**
   * optional field. See [ChainId](#chainid). Available when `status` is not `None`.
   */
  chainId?: number;
  /**
   * optional field that contains error message when transaction fails or throws.
   */
  errorMessage?: string;
  /**
   * string that can contain one of `None` `PendingSignature` `Mining` `Success` `Fail` `Exception` `CollectingSignaturePool`
   */
  errorCode?: number;
  /**
   * string that can contain one of `None` `PendingSignature` `Mining` `Success` `Fail` `Exception` `CollectingSignaturePool`
   */
  errorHash?: string;
  /**
   * string that can contain one of `None` `PendingSignature` `Mining` `Success` `Fail` `Exception` `CollectingSignaturePool`
   */
  originalTransaction?: TransactionResponse;
  transactionName?: string;
}

export interface TransactionReceipt {
  to: string;
  from: string;
  contractAddress: string;
  transactionIndex: number;
  root?: string;
  gasUsed: BigNumber;
  logsBloom: string;
  blockHash: string;
  transactionHash: string;
  logs: Array<Log>;
  blockNumber: number;
  confirmations: number;
  cumulativeGasUsed: BigNumber;
  effectiveGasPrice: BigNumber;
  byzantium: boolean;
  type: number;
  status?: number;
}

export type Falsy = false | 0 | '' | null | undefined;

export type TypedContract = Contract & {
  functions: Record<string, (...args: any[]) => any>;
  filters: Record<string, (...args: any[]) => any>;
};

export type ContractFunctionNames<T extends TypedContract> = keyof {
  [P in keyof T['functions']as ReturnType<
    T['functions'][P]
  > extends Promise<ContractTransaction>
  ? P
  : never]: void;
} &
  string;

export type ContractMethodNames<T extends TypedContract> = keyof {
  [P in keyof T['functions']as ReturnType<T['functions'][P]> extends Promise<
    any[]
  >
  ? P
  : never]: void;
} &
  string;

export type Params<
  T extends TypedContract,
  FN extends ContractFunctionNames<T> | ContractMethodNames<T>,
> = Parameters<T['functions'][FN]>;
