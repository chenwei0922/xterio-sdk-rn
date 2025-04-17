import type { ParsedQuery } from 'query-string'

export const randomId = (): number => {
  const date = Date.now() * Math.pow(10, 3)
  const extra = Math.floor(Math.random() * Math.pow(10, 3))
  return date + extra
}

export const randomNonceStr = (c?: number): string => {
  c = c || 32
  const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const a = t.length
  let n = ''
  for (let i = 0; i < c; i++) n += t.charAt(Math.floor(Math.random() * a))
  return n
}

export const getQsParams = (key: string, obj: ParsedQuery) => {
  let value = obj?.[key]
  if (Array.isArray(value)) {
    value = value?.[0]
  }
  return value
}

export const Utils = {
  randomId,
  randomNonceStr,
  getQsParams,
  pkgVersion: '0.1.5'
}
