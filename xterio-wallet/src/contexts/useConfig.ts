import { Env } from '@xterio-sdk/rn-auth';
import { EnvBaseURLConst, type EnvItemType } from '../common/utils/const';
import type { SendTransactionMode } from '../interfaces/types';

export interface IUseConfigState extends EnvItemType {
  transactionMode?: SendTransactionMode;
}
export const useConfig = (
  env: Env = Env.Dev,
  transactionMode?: SendTransactionMode
): IUseConfigState => {
  const _env = EnvBaseURLConst[env || Env.Dev];
  return {
    ..._env,
    transactionMode,
  };
};
