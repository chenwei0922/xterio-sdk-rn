import RnAuth from './NativeRnAuth'

export * from './utils/storage'
export * from './modules/XterAuth'
export * from './interfaces/loginInfo'
export * from './contexts/index'

export async function multiply(a: number, b: number): Promise<number> {
  return await RnAuth.multiply(a, b)
}
