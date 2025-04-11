import type { Env, ISSoTokensParams } from '@xterio-sdk/rn-auth';

export interface IXterioWalletContextProps extends Partial<ISSoTokensParams> {
  env?: Env;
  enableAuthInit?: boolean;
  pn_app_id?: string;
}
