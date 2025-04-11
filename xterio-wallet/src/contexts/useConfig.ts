import { Env } from '@xterio-sdk/rn-auth';
import { EnvBaseURLConst, type EnvItemType } from '../common/utils/const';

export interface IUseConfigState extends EnvItemType {
  // transactionMode?: SendTransactionMode
}
export const useConfig = (
  env: Env = Env.Dev,
  pn_app_id?: string
  // transactionMode?: SendTransactionMode
): IUseConfigState => {
  const _env = EnvBaseURLConst[env || Env.Dev];
  return {
    ..._env,
    PN_APP_ID: pn_app_id || _env.PN_APP_ID,
    // transactionMode
  };
};
