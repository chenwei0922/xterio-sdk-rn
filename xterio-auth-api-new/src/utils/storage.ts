import AsyncStorage from "@react-native-async-storage/async-storage"

export class Storage {
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