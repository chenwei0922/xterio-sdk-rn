import {
  LoginMethodType,
  type Env,
  type ISSoTokensParams,
  type ITokenRes,
  type IUserInfo,
  type LoginType,
  type PageUriMapType
} from '../interfaces/loginInfo'
import { XTERIO_CONST } from '../utils'
import { XterioCache } from './XterCache'

export class XterioAuthInfo {
  /** client id */
  static client_id: string = ''
  /** app id */
  static app_id: string = ''
  /** app env */
  static env: Env
  /** service base url */
  static baseURL: string = ''
  /** page base url */
  static pageURL: string = ''
  /** authrorize url */
  static authorizeUrl: string = ''
  /** sdk initial config info */
  static config?: ISSoTokensParams
  /** user logined tokens */
  static tokens?: ITokenRes
  /** user account */
  static userInfo?: IUserInfo
  /** otac(2m or used expired) */
  static otac?: string
  /** page uri map */
  static pageUriMap: PageUriMapType
  /** s3 api for page uri map */
  static PageUriApi: string

  /** record logined ui type */
  private static _loginType: LoginType
  static set loginType(_type: LoginType) {
    this._loginType = _type
    XterioCache.set(XTERIO_CONST.LOGIN_TYPE, _type)
  }
  static get loginType() {
    return this._loginType
  }

  /** record logined way */
  private static _loginMethod: LoginMethodType
  static set loginMethod(val: LoginMethodType) {
    this._loginMethod = val
    XterioCache.set(XTERIO_CONST.LOGIN_METHOD, val)
  }
  static get loginMethod() {
    return this._loginMethod
  }

  /** record logined wallet address */
  private static _loginWalletAddress: string
  static set loginWallet(val: string) {
    this._loginWalletAddress = val
    XterioCache.set(XTERIO_CONST.LOGIN_WALLET_ADDRESS, val)
  }
  static get loginWallet() {
    if (
      [
        LoginMethodType.METAMASK,
        LoginMethodType.BYBIT,
        LoginMethodType.WALLETCONNECT,
        LoginMethodType.TRUST,
        LoginMethodType.SAFEPAL,
        LoginMethodType.BINANCE
      ].includes(this.loginMethod)
    ) {
      return this._loginWalletAddress
    }
    return ''
  }
}

export class XterioAuthTokensManager {
  static setTokens(value: Partial<ITokenRes>) {
    const { id_token = '', access_token = '', refresh_token = '' } = value || {}
    XterioAuthInfo.tokens = { id_token, access_token, refresh_token }
    XterioCache.setTokens(value)
  }
  static removeTokens() {
    XterioAuthInfo.tokens = undefined
    XterioCache.deleteTokens()
  }
  static removeIdToken() {
    const { refresh_token = '', access_token = '' } = XterioAuthInfo.tokens || {}
    XterioAuthInfo.tokens = { refresh_token, access_token, id_token: '' }
    XterioCache.deleteTokens(XTERIO_CONST.ID_TOKEN)
  }
  static get idToken() {
    return XterioAuthInfo.tokens?.id_token || ''
  }
  static get refreshToken() {
    return XterioAuthInfo.tokens?.refresh_token || ''
  }
  static get accessToken() {
    return XterioAuthInfo.tokens?.access_token || ''
  }
}

export class XterioAuthUserInfoManager {
  static setUserInfo(value: IUserInfo) {
    XterioAuthInfo.userInfo = value
    XterioCache.setUserInfo(value)
  }
  static removeUserInfo() {
    XterioAuthInfo.userInfo = undefined
    XterioCache.deleteUserInfo()
  }
  static get userInfo() {
    return XterioAuthInfo.userInfo
  }
}
