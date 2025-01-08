// const version = __SDK_VERSION__ || '0.0.0'
const version = '0.0.0'
const TAG = 'XterioAuth'

enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  OFF = 'OFF'
}

type LogType = 'debug'|'info'|'warn'|'error'|'off'
const LogLevelData:Record<LogType, number> = {debug: 1, info: 2, warn: 3, error: 4, off: 5}
let logLevel = LogLevelData.debug

export const setLogLevel = (level: number) => {
  logLevel = level
}

const log = (level: LogLevel, ...args: any[]) => {
  if (level === LogLevel.OFF || logLevel > LogLevelData[level.toLocaleLowerCase() as LogType]) {
    return
  }
  if (level === LogLevel.ERROR) {
    console.error(`[${TAG}(v${version})]`, ...args)
  } else if (level === LogLevel.WARN) {
    console.warn(`[${TAG}(v${version})]`, ...args)
  } else if (level === LogLevel.DEBUG) {
    console.debug(`[${TAG}(v${version})]`, ...args)
  } else {
    console.log(`[${TAG}(v${version})]`, ...args)
  }
}
const info = (...args: any[]): void => {
  log(LogLevel.INFO, ...args)
}

const debug = (...args: any[]): void => {
  log(LogLevel.DEBUG, ...args)
}

const warn = (...args: any[]): void => {
  log(LogLevel.WARN, ...args)
}

const error = (...args: any[]): void => {
  log(LogLevel.ERROR, ...args)
}
export const XLog = {
  info,
  debug,
  warn,
  error
}

export const getPackageVersion = () => {
  return version
}