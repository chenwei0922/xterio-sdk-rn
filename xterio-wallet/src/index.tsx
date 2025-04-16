import { useXterioWalletContext, XterioWalletProvider } from './contexts';
import {
  SendTransactionMode,
  type IXterioWalletContextProps,
} from './interfaces/types';
import { useXterioTransaction } from './contexts/pnTransaction';

export {
  XterioWalletProvider,
  useXterioWalletContext,
  useXterioTransaction,
  SendTransactionMode,
};
export type { IXterioWalletContextProps };

import RnWallet from './NativeRnWallet';

export function multiply(a: number, b: number): number {
  return RnWallet.multiply(a, b);
}
