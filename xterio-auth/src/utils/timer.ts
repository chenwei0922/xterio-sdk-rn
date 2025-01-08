import { XLog } from './logger'

class Singleton {
  private static instances: { [key: string]: any } = {}
  constructor() {
    //
  }
  static getInstance<T extends Singleton>(this: new () => T): T {
    const className = this.name
    if (!Singleton.instances[className]) {
      Singleton.instances[className] = new this()
    }
    return Singleton.instances[className]
  }
}

export class XTimeOut extends Singleton {
  private _timer?: NodeJS.Timeout
  addTimeout(callback: () => void, timeout: number) {
    this.removeTimeout()
    XLog.debug('the timer init')
    this._timer = setTimeout(() => {
      callback()
    }, timeout)
  }
  removeTimeout() {
    if (this._timer) {
      XLog.debug('the timer clear')
      clearTimeout(this._timer)
    }
  }
}
// XTimeOut.getInstance().addTimeout(() => { }, 2000)

export class LoadingState extends Singleton {
  private isLoading: boolean = false

  async execute(action: () => void | Promise<void>) {
    if (this.isLoading) return
    this.isLoading = true
    try {
      await action()
    } finally {
      this.isLoading = false
    }
  }
}
