import type { Env, ISSoTokensParams } from '@xterio-sdk/rn-auth';

export enum SendTransactionMode {
  UserSelect = 0,
  Gasless = 1,
  UserPaidNative = 2,
}

export interface IXterioWalletContextProps extends Partial<ISSoTokensParams> {
  env?: Env;
  transactionMode?: SendTransactionMode;
  PN_CHAIN_ID?: string | number;
  PN_PROJECT_ID?: string;
  PN_CLIENT_KEY?: string;
  PN_APP_ID?: string;
}
