import type { ITokenRes, IUserInfo } from '../interfaces/loginInfo'
import { Storage, XTERIO_CONST } from '../utils'
export class XterioCache {
  static setTokens(value: Partial<ITokenRes>) {
    const { access_token = '', id_token = '', refresh_token = '' } = value
    Storage.setItem(XTERIO_CONST.ACCESS_TOKEN, access_token)
    Storage.setItem(XTERIO_CONST.ID_TOKEN, id_token)
    Storage.setItem(XTERIO_CONST.REFRESH_TOKEN, refresh_token)
  }
  static getTokens(): ITokenRes {
    const _t: ITokenRes = {
      access_token: Storage.getItem(XTERIO_CONST.ACCESS_TOKEN) || '',
      id_token: Storage.getItem(XTERIO_CONST.ID_TOKEN) || '',
      refresh_token: Storage.getItem(XTERIO_CONST.REFRESH_TOKEN) || ''
    }
    return _t
  }
  static deleteTokens(key?: string) {
    if (key) {
      Storage.removeItem(key)
    } else {
      Storage.removeItem(XTERIO_CONST.ACCESS_TOKEN)
      Storage.removeItem(XTERIO_CONST.REFRESH_TOKEN)
      Storage.removeItem(XTERIO_CONST.ID_TOKEN)
    }
  }

  static setUserInfo(value: IUserInfo) {
    Storage.setItem(XTERIO_CONST.USERINFO, JSON.stringify(value))
  }
  static getUserInfo() {
    const value = Storage.getItem<IUserInfo>(XTERIO_CONST.USERINFO)
    return value
  }
  static deleteUserInfo() {
    Storage.removeItem(XTERIO_CONST.USERINFO)
  }
  static delete(key: string) {
    Storage.removeItem(key)
  }
  static set<T = string>(key: string, value: T) {
    Storage.setItem(key, value || '')
  }
  static get(key: string) {
    return Storage.getItem(key) || ''
  }
}
