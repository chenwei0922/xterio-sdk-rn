import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const dir = dirname(fileURLToPath(import.meta.url))

export const pathRoot = resolve(dir, '..')
export const pathSh = resolve(pathRoot, 'sh')
export const pathAuth = resolve(pathRoot, 'xterio-auth')
export const pathAuthJson = resolve(pathAuth, 'package.json')
export const pathAuthVersion = resolve(pathAuth, 'src/utils/util.ts')
export const pathWallet = resolve(pathRoot, 'xterio-wallet')
export const pathWalletJson = resolve(pathWallet, 'package.json')
export const pathWalletVersion = resolve(pathWallet, 'src/common/utils/util.ts')

export const pathUi = resolve(pathRoot, 'xterio-ui')
export const pathUiJson = resolve(pathUi, 'package.json')