import { XLog, XTERIO_EVENTS } from "@/utils"

type Func = (...args: any) => void | unknown

export class XterEventEmiter {
  private static _listeners: { [key: string]: Func[] } = {}
  static set listeners(p: { [key: string]: Func[] }) {
    this._listeners = p
  }
  static get listeners() {
    return this._listeners
  }
  static on(event: string, listener: Func) {
    if (!this._listeners[event]) {
      this._listeners[event] = []
    }
    this._listeners[event].push(listener)
  }
  static off(event: string, listener: Func) {
    if (this._listeners[event]) {
      this._listeners[event] = this._listeners[event].filter((l) => l !== listener)
    }
  }
  static emit(event: string, ...args: any) {
    if (this._listeners[event]) {
      this._listeners[event].forEach((l) => {
        l(...args)
      })
    }
  }
  private static remove(event: string) {
    if (this._listeners[event]) {
      delete this._listeners[event]
    }
  }

  static subscribe<T>(callback: (p: T) => void, _event?: string) {
    const _key = _event || XTERIO_EVENTS.ACCOUNT
    XLog.debug('subscribe event', _key)
    this.on(_key, callback)
    //return unsubscribe func
    return () => {
      XLog.debug('unsubscribe this event', _key)
      this.off(_key, callback)
    }
  }
  static unsubscribe(_event?: string) {
    const _key = _event || XTERIO_EVENTS.ACCOUNT
    XLog.debug('unsubscribe all event', _key)
    this.remove(_key)
  }
  static clear() {
    this.listeners = {}
  }
}
