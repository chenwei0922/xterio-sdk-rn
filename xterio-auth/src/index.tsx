import RnAuth from './NativeRnAuth'

export * from './utils/storage'
export * from './modules/XterAuth'
export * from './interfaces/loginInfo'
export * from './contexts/index'
export * from './modules/AuthService'
export * from './modules/XterEventEmitter'

export { XterioAuthTokensManager } from './modules/XterAuthInfo'
export { getFetcher, postFetcher, putFetcher, deleteFetcher } from './utils/fetchers'
export { XterLog } from './utils/logger'
export { XTERIO_CONST, XTERIO_EVENTS } from './utils/const'

export async function multiply(a: number, b: number): Promise<number> {
  return await RnAuth.multiply(a, b)
}
