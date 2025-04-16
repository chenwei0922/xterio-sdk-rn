import type { Env, ISSoTokensParams } from '@xterio-sdk/rn-auth';

export enum SendTransactionMode {
  UserSelect = 0,
  Gasless = 1,
  UserPaidNative = 2,
}

export interface IXterioWalletContextProps extends Partial<ISSoTokensParams> {
  env?: Env;
  transactionMode?: SendTransactionMode;
}
