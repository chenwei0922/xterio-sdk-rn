import { LoginMethodType, type Env, type ISSoTokensParams, type ITokenRes, type IUserInfo, type LoginType, type PageUriMapType } from "@/interfaces/loginInfo"
import { XTERIO_CONST } from "@/utils"
import { XterioCache } from "./XterCache"

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
  /** account callback function */
  static onAccount: ((p: IUserInfo) => void)[] = []
  /** login way */
  static loginType?: LoginType
  /** otac(2m expired) */
  static otac?: string
  /** page uri map */
  static pageUriMap: PageUriMapType
  /** s3 api for page uri map */
  static PageUriApi: string

  /** record logined ui type */
  static async setLoginType(_type: string){
    await XterioCache.set(XTERIO_CONST.LOGIN_TYPE, _type)
  }
  static async getLoginType() {
    const _type = (await XterioCache.get(XTERIO_CONST.LOGIN_TYPE)) as LoginType
    return _type ? _type : undefined
  }

  /** record logined way */
  static async setLoginMethod(val: LoginMethodType) {
    await XterioCache.set(XTERIO_CONST.LOGIN_METHOD, val)
  }
  static async getLoginMethod() {
    const _loginMethod = (await XterioCache.get(XTERIO_CONST.LOGIN_METHOD)) as LoginMethodType
    return _loginMethod
  }

  /** record logined wallet address */
  static async setLoginWallet(val: string) {
    await XterioCache.set(XTERIO_CONST.LOGIN_WALLET_ADDRESS, val)
  }
  static async getLoginWallet() {
    const _loginMethod = await this.getLoginMethod()
    const _loginWalletAddress = await XterioCache.get(XTERIO_CONST.LOGIN_WALLET_ADDRESS)
    if (
      [
        LoginMethodType.METAMASK,
        LoginMethodType.BYBIT,
        LoginMethodType.WALLETCONNECT,
        LoginMethodType.TRUST,
        LoginMethodType.SAFEPAL,
        LoginMethodType.BINANCE
      ].includes(_loginMethod)
    ) {
      return _loginWalletAddress
    }
    return ''
  }
}

export class XterioAuthTokensManager {
  static async setTokens(value: Partial<ITokenRes>) {
    const { id_token = '', access_token = '', refresh_token = '' } = value || {}
    XterioAuthInfo.tokens = { id_token, access_token, refresh_token }
    await XterioCache.setTokens(value)
  }
  static async removeTokens() {
    XterioAuthInfo.tokens = undefined
    await XterioCache.deleteTokens()
  }
  static async removeIdToken() {
    const { refresh_token = '', access_token = '' } = XterioAuthInfo.tokens || {}
    XterioAuthInfo.tokens = { refresh_token, access_token, id_token: '' }
    await XterioCache.deleteTokens(XTERIO_CONST.ID_TOKEN)
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
  static async setUserInfo(value: IUserInfo) {
    XterioAuthInfo.userInfo = value
    await XterioCache.setUserInfo(value)
  }
  static async removeUserInfo() {
    XterioAuthInfo.userInfo = undefined
    await XterioCache.deleteUserInfo()
  }
  static get userInfo() {
    return XterioAuthInfo.userInfo
  }
}
