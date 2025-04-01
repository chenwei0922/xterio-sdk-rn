import NativeRnAuth from '../NativeRnAuth'

export class Storage {
  static setItem<T>(key: string, value: T) {
    try {
      const val: string = typeof value === 'string' ? value : JSON.stringify(value)
      NativeRnAuth?.setItem(key, val)
    } catch (e) {}
  }
  static async getItem<T = string>(key: string): Promise<T | null> {
    try {
      let value = await NativeRnAuth?.getItem(key)
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
  static removeItem(key: string) {
    NativeRnAuth?.removeItem(key)
  }
  static clear() {
    NativeRnAuth?.clear()
  }
}
