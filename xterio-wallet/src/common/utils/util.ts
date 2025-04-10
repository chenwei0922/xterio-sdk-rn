import pkg from '../../../package.json'

function sleep(time: number): Promise<number> {
  return new Promise((res) => {
    setTimeout(res, time, time)
  })
}

export const Utils = {
  pkgVersion: pkg.version,
  sleep
}
