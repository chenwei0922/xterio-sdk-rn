import type { ITokenRes, IUserInfo, IUserInfoRes, IWalletItem } from "../interfaces/loginInfo"
import { XterioAuth } from "../modules/XterAuth"
import { XterioAuthInfo, XterioAuthTokensManager, XterioAuthUserInfoManager } from "../modules/XterAuthInfo"
import { XterEventEmiter } from "../modules/XterEventEmitter"
import { getFetcher, postFetcher, XLog, XTERIO_EVENTS } from "../utils"

/**
 * 平台登录
 * @param code 授权code
 * @returns Promise < IUserInfo | null >
 */
export const loginService = async (code: string) => {
  const { client_id = '', client_secret = '', redirect_uri = '', grant_type = '' } = XterioAuthInfo.config || {}
  const param = { client_id, client_secret, redirect_uri, grant_type, code }
  const data = new URLSearchParams(param)
  XLog.debug('go login')

  const res = await postFetcher<ITokenRes, typeof data>(`/account/v1/oauth2/token`, data, '', {
    ['content-type']: 'application/x-www-form-urlencoded'
  })
    .then(async (res) => {
      XLog.info('login success.')
      await XterioAuthTokensManager.setTokens(res)
      XterioAuth.setIsLogin(true)
      return res
    })
    .catch((err) => {
      XLog.error('login failed.')
      return null
    })
  if (res?.id_token) {
    XLog.debug('get userinfo')
    const info = await getUserInfoService()
    if (info.uuid) {
      return info
    }
  }
  return null
}

/**
 * 查询平台用户信息
 */
export const getUserInfoService = async (): Promise<IUserInfo> => {
  const [profileInfo, wallet] = await Promise.all([getProfile(), getWallet()])
  const res = {
    ...profileInfo,
    wallet
  }
  await XterioAuthUserInfoManager.setUserInfo(res)
  if (res?.uuid) {
    XterEventEmiter.emit(XTERIO_EVENTS.ACCOUNT, res)
  }
  return res
}

const getProfile = async (): Promise<IUserInfoRes> => {
  const res = await getFetcher<IUserInfoRes>(`/account/v1/user/profile`)
    .then((res) => {
      XLog.info('get profile success.')
      return res
    })
    .catch((err) => {
      XLog.error('get profile failed.')
      return null
    })

  return res?.uuid ? { ...res } : {}
}

const getWallet = async (): Promise<IWalletItem[]> => {
  const res = await getFetcher<{ wallet: IWalletItem[] }>(`/account/v1/wallet`)
    .then((res) => {
      XLog.info('get wallet success.')
      return res
    })
    .catch((err) => {
      XLog.error('get wallet failed.')
      return null
    })
  return res?.wallet || []
}

