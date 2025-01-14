import type { TurboModule } from 'react-native'
import { TurboModuleRegistry } from 'react-native'

export interface Spec extends TurboModule {
  multiply(a: number, b: number): number
  login(url: string): void
  //本地存储
  setItem(key: string, value: string): void
  getItem(key: string): string | null
  removeItem(key: string): void
  clear(): void
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeRnAuth')
