import { useXterioWalletContext, XterioWalletProvider } from './contexts';
import RnWallet from './NativeRnWallet';

export function multiply(a: number, b: number): number {
  return RnWallet.multiply(a, b);
}

export { XterioWalletProvider, useXterioWalletContext };
