import type { ITokenRes, IUserInfo } from "../interfaces/loginInfo"
import { Storage, XTERIO_CONST } from "../utils"
export class XterioCache {
  static async setTokens(value: Partial<ITokenRes>) {
    const { access_token = '', id_token = '', refresh_token = '' } = value
    await Storage.setItem(XTERIO_CONST.ACCESS_TOKEN, access_token)
    await Storage.setItem(XTERIO_CONST.ID_TOKEN, id_token)
    await Storage.setItem(XTERIO_CONST.REFRESH_TOKEN, refresh_token)
  }
  static async getTokens(): Promise<ITokenRes> {
    const _t: ITokenRes = {
      access_token: await Storage.getItem(XTERIO_CONST.ACCESS_TOKEN) || '',
      id_token: await Storage.getItem(XTERIO_CONST.ID_TOKEN) || '',
      refresh_token: await Storage.getItem(XTERIO_CONST.REFRESH_TOKEN) || ''
    }
    return _t
  }
  static async deleteTokens(key?: string) {
    if (key) {
      await Storage.removeItem(key)
    } else {
      await Storage.removeItem(XTERIO_CONST.ACCESS_TOKEN)
      await Storage.removeItem(XTERIO_CONST.REFRESH_TOKEN)
      await Storage.removeItem(XTERIO_CONST.ID_TOKEN)
    }
  }

  static async setUserInfo(value: IUserInfo) {
    await Storage.setItem(XTERIO_CONST.USERINFO, JSON.stringify(value))
  }
  static async getUserInfo() {
    const value = await Storage.getItem<IUserInfo>(XTERIO_CONST.USERINFO)
    return value
  }
  static async deleteUserInfo() {
    await Storage.removeItem(XTERIO_CONST.USERINFO)
  }
  static async delete(key: string) {
    await Storage.removeItem(key)
  }
  static async set<T=string,>(key: string, value: T) {
    await Storage.setItem(key, value)
  }
  static async get(key: string) {
    return (await Storage.getItem(key)) || ''
  }
}
