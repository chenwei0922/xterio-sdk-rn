import type { TurboModule } from 'react-native'
import { TurboModuleRegistry } from 'react-native'

export interface Spec extends TurboModule {
  multiply(a: number, b: number): Promise<number>
  login(url: string, scheme: string): Promise<string>
  //本地存储
  getItem(key: string): Promise<string | null>
  setItem(key: string, value: string): void
  removeItem(key: string): void
  clear(): void
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeRnAuth')
