import { Utils } from './util'

enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  OFF = 'OFF'
}

const LogLevelData = { debug: 1, info: 2, warn: 3, error: 4, off: 5 }
type LogType = keyof typeof LogLevelData

export class XterLog {
  private readonly name: string = 'XterioAuth'
  private readonly version: string = Utils.pkgVersion || '0.0.0'
  private logLevel: number = LogLevelData.debug

  getName() {
    return this.name
  }
  getVersion() {
    return this.version
  }
  setLogLevel(level: number) {
    this.logLevel = level
  }
  private log(level: LogLevel, ...args: any[]) {
    if (level === LogLevel.OFF || this.logLevel > LogLevelData[level.toLocaleLowerCase() as LogType]) {
      return
    }
    const _name = this.getName()
    const _version = this.getVersion()

    if (level === LogLevel.ERROR) {
      console.error(`[${_name}(v${_version})]`, ...args)
    } else if (level === LogLevel.WARN) {
      console.warn(`[${_name}(v${_version})]`, ...args)
    } else if (level === LogLevel.DEBUG) {
      console.debug(`[${_name}(v${_version})]`, ...args)
    } else {
      console.log(`[${_name}(v${_version})]`, ...args)
    }
  }
  info(...args: any[]) {
    this.log(LogLevel.INFO, ...args)
  }
  debug(...args: any[]) {
    this.log(LogLevel.DEBUG, ...args)
  }
  warn(...args: any[]) {
    this.log(LogLevel.WARN, ...args)
  }
  error(...args: any[]) {
    this.log(LogLevel.ERROR, ...args)
  }
}

export default new XterLog()
