import type { ITokenRes, IUserInfo } from "@/interfaces/loginInfo"
import { XTERIO_CONST } from "@/utils"
import AsyncStorage from '@react-native-async-storage/async-storage'

class Storage {
  static async setItem<T,>(key:string, value:T){
    try {
      const val: string = typeof value === 'string' ? value : JSON.stringify(value)
      await AsyncStorage.setItem(key, val)
    } catch (e) {}
  }
  static async getItem<T = string>(key: string): Promise<T | undefined | null> {
    try {
      let value = await AsyncStorage.getItem(key)
      if (value !== null) {
        try {
          value = JSON.parse(value)
        } catch (e) {}
        return value as T
      }
      return null
    } catch (e) {
      return null
    }
  }
  static async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {}
  }
  static async clear() {
    try {
      await AsyncStorage.clear()
    } catch (e) {}
  }

}

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
  static async set(key: string, value: string) {
    await Storage.setItem(key, value)
  }
  static async get(key: string) {
    return (await Storage.getItem(key)) || ''
  }
}
