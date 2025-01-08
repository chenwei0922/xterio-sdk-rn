import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  multiply(a: number, b: number): number;
  test(a: number, b: number): number;
  login(url: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RnAuth');
