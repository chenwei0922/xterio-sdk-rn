import { decode } from 'js-base64'
import { Env, LoginMethodType, LoginType, type ISSoTokensParams, type Payload } from '../interfaces/loginInfo'
import NativeRnAuth from '../NativeRnAuth'
import {
  EnvVariableConfig,
  getQsParams,
  LoadingState,
  setLogLevel,
  XLog,
  XTERIO_CONST,
  XTERIO_EVENTS,
  XTimeOut
} from '../utils'
import { XterioAuthService } from './AuthService'
import { XterioAuthInfo, XterioAuthTokensManager, XterioAuthUserInfoManager } from './XterAuthInfo'
import { XterioCache } from './XterCache'
import { XterEventEmiter } from './XterEventEmitter'
import qs from 'query-string'
import { getOtac } from './XterPage'

export class XterioAuth {
  /** user is login */
  private static _islogin: boolean
  static setIsLogin(f: boolean) {
    XLog.debug('set xterio auth islogin=', f)
    XterioAuth._islogin = f
  }
  static get isLogin() {
    return XterioAuth._islogin
  }

  /** idToken is expired */
  private static get isVaildIdToken() {
    const id_token = XterioAuthTokensManager.idToken

    if (!id_token) {
      XLog.error('invalid token: idtoken null')
      return false
    }
    const payload = id_token.split('.')?.[1]
    if (!payload) {
      XLog.error('invalid token: idtoken error')
      return false
    }

    try {
      const { aud, exp = 0 } = JSON.parse(decode(payload)) as Payload
      XterioAuth.setTokenTimer((exp - 60) * 1000 - Date.now())
      const isExpire = !aud || Date.now() > (exp - 60) * 1000
      return !isExpire
    } catch (error) {
      XLog.error('invalid token: idtoken error')
      return false
    }
  }

  /** idToken expired auto refresh */
  private static setTokenTimer(duration: number) {
    // const duration = 10000
    if (duration < 0) return
    XTimeOut.getInstance().addTimeout(() => {
      //idToken expired logic
      XterioAuth.setIsLogin(false)
      XterioAuthTokensManager.removeIdToken()
      XLog.info('the token timer, refresh token auto')
      XterioAuth.checkToken('tokenTimer')
    }, duration)
  }

  /** idToken check logic */
  private static async checkToken(_flag: string = 'init') {
    const _tokens = await XterioCache.getTokens()
    XterioAuthTokensManager.setTokens(_tokens)
    const refresh_token = XterioAuthTokensManager.refreshToken
    let isvalid = XterioAuth.isVaildIdToken
    if (!isvalid && refresh_token) {
      // token invalid, req tokens by refresh
      XLog.info('check token and refresh tokens')
      const res = await XterioAuthService.refreshTokenService(refresh_token)
      XterioAuthTokensManager.setTokens({ refresh_token, id_token: res.id_token, access_token: res.access_token })
      //again check
      isvalid = XterioAuth.isVaildIdToken
    }
    XLog.info('check token and the idToken isvalid=', isvalid)
    XterioAuth.setIsLogin(isvalid)
    if (!isvalid) {
      XLog.info('clear cache data')
      XterioAuth.clearData()
    } else if (_flag === 'init') {
      //get userinfo
      await XterioAuthService.getUserInfo()
    }
    return XterioAuthTokensManager.idToken || ''
  }

  /** go login with code */
  private static async codeLogin(url: string) {
    const queryParams = qs.parseUrl(url)
    const { query } = queryParams
    const code = getQsParams('code', query)
    const loginmethod = getQsParams('sso_login_method', query)
    const loginWallet = getQsParams('sso_login_wallet', query)
    XterioAuthInfo.loginMethod = (loginmethod || '') as LoginMethodType
    XterioAuthInfo.loginWallet = loginWallet || ''
    XLog.debug('code=', code, 'sso_login_method=', loginmethod, 'sso_login_wallet=', loginWallet)
    if (!code) return
    XLog.debug('going to code login ...')
    const res = await XterioAuthService.login(code as string)
    if (res?.uuid) {
      XterioCache.delete(XTERIO_CONST.LOGIN_TYPE)
    }
  }

  private static clearData() {
    XterioAuthTokensManager.removeTokens()
    XterioAuthUserInfoManager.removeUserInfo()
  }

  /** initial */
  static async init(config: Partial<ISSoTokensParams>, env?: Env) {
    const _env = env ?? Env.Dev
    const {
      app_id = '',
      client_id = '',
      client_secret = '',
      redirect_uri = '',
      mode = 'default',
      logout = _env === Env.Dev ? '1' : '1',
      logLevel = 1
    } = config
    setLogLevel(logLevel)
    const _baseURL = EnvVariableConfig[_env].API_BASE
    const _config: ISSoTokensParams = {
      app_id,
      client_id,
      client_secret,
      redirect_uri,
      response_type: 'code',
      scope: 'all',
      mode,
      grant_type: 'authorization_code',
      logout
    }
    XterioAuthInfo.app_id = app_id
    XterioAuthInfo.client_id = client_id
    XterioAuthInfo.env = _env
    XterioAuthInfo.baseURL = _baseURL
    XterioAuthInfo.pageURL = EnvVariableConfig[_env].PAGE_BASE
    XterioAuthInfo.loginType = (await XterioCache.get(XTERIO_CONST.LOGIN_TYPE)) as LoginType
    XterioAuthInfo.loginMethod = (await XterioCache.get(XTERIO_CONST.LOGIN_METHOD)) as LoginMethodType
    XterioAuthInfo.loginWallet = await XterioCache.get(XTERIO_CONST.LOGIN_WALLET_ADDRESS)

    //TODO: TT

    const { response_type, scope } = _config
    XterioAuthInfo.authorizeUrl =
      _baseURL +
      `/account/v1/oauth2/authorize?` +
      qs.stringify({ client_id, redirect_uri, response_type, scope, mode, logout })
    XterioAuthInfo.config = _config
    XterioAuthInfo.PageUriApi = EnvVariableConfig[_env].PAGES_URI_API
    const data = await XterioAuthService.getPageUrlMap()
    XterioAuthInfo.pageUriMap = data.pages
    XterioAuthInfo.pageURL = data.domain ? `https://${data.domain}` : EnvVariableConfig[_env].PAGE_BASE

    XLog.debug('auth initial')

    XterEventEmiter.subscribe(async () => {
      //req expired logic, remove idToken
      //loadingState 防止并发401处理
      LoadingState.getInstance().execute(async () => {
        XLog.debug('req 401, refresh token')
        XterioAuth.setIsLogin(false)
        XterioAuthTokensManager.removeIdToken()
        XterEventEmiter.emit(XTERIO_EVENTS.LOGOUT)
        await XterioAuth.checkToken()
      })
    }, XTERIO_EVENTS.Expired)

    await XterioAuth.checkToken()
  }
  /** login */
  static login(mode?: LoginType) {
    if (!XterioAuthInfo.config) {
      XLog.error('xterio auth sdk initial failed')
      return
    }
    if (mode && mode !== LoginType.Mini) {
      XterioAuthInfo.config = { ...XterioAuthInfo.config, mode }
      const { response_type, scope, logout, client_id, redirect_uri } = XterioAuthInfo.config
      XterioAuthInfo.authorizeUrl =
        XterioAuthInfo.baseURL +
        `/account/v1/oauth2/authorize?` +
        qs.stringify({ client_id, redirect_uri, response_type, scope, mode, logout })
    }
    if (XterioAuth.isLogin) {
      XLog.debug('get userinfo')
      XterioAuthService.getUserInfo()
      return
    }

    if (mode === LoginType.Mini) {
      XterioAuthInfo.loginMethod = LoginMethodType.Teleg
      //TODO: tt
      return
    }

    XterioAuthInfo.loginType = mode || LoginType.Default

    //go to authorize
    XLog.debug('going to authorize ...')
    XLog.debug('authorize url=', XterioAuthInfo.authorizeUrl)
    const scheme = XterioAuthInfo.config?.redirect_uri?.split('://')?.[0] || ''

    //
    // const url =
    //   'xterio-sdk-rn://auth?sso_login_method=email&sso_login_wallet=&code=MWIZY2JJMTQTMJA5MS0ZY2I3LTLKZJKTMJAZY2U5YZM3NZJK'
    // XterioAuth.codeLogin(url)
    // return
    NativeRnAuth?.login(XterioAuthInfo.authorizeUrl, scheme)
      .then((res) => {
        XLog.debug('the auth callback url=', res)
        //xterio-sdk-rn://auth?sso_login_method=email&sso_login_wallet=&code=NGY1YMRKODGTMZRKZS0ZM2I3LWJKZGMTODG0YJQYYWNLMZA1
        XterioAuth.codeLogin(res)
      })
      .catch((err: string) => {
        XLog.debug('login failed:', err)
      })
  }
  /** logout */
  static logout() {
    XLog.debug('logout success')
    XterioAuth.clearData()
    XterioAuth.setIsLogin(false)
    XterEventEmiter.emit(XTERIO_EVENTS.LOGOUT)
  }
  /** get a effective idToken */
  static async getIdToken() {
    /// idtoken not expired or refreshed if the promise return non-empty string
    return await XterioAuth.checkToken('getIdToken')
  }
  static getOtac = getOtac
  static get loginMethod() {
    return XterioAuthInfo.loginMethod
  }
  static get loginWalletAddress() {
    return XterioAuthInfo.loginWallet
  }
}
