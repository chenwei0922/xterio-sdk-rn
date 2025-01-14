import RnAuth from './NativeRnAuth'

export * from './utils/storage'
export * from './modules/XterAuth'
export * from './interfaces/loginInfo'
export * from './contexts/index'

export function multiply(a: number, b: number): number {
  return RnAuth.multiply(a, b)
}
