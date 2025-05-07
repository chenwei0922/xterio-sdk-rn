import chalk from 'chalk'
import consola from 'consola'
import { readFileSync, readJSONSync, writeFileSync, writeJSONSync } from 'fs-extra'

import { pathAuth, pathWallet, pathAuthJson, pathWalletJson, pathSh, pathAuthVersion, pathWalletVersion } from './paths'
import { run } from './run'

const AuthJsonData = readJSONSync(pathAuthJson, { encoding: 'utf-8' })
const WalletJsonData = readJSONSync(pathWalletJson, { encoding: 'utf-8' })

const _flag = process.argv[2]
const _version = process.argv[3]
consola.info('_flag=', chalk.blue(_flag), _version)


const init = async () => {
  const isExecuteAuth = !_flag || _flag === 'auth'
  const isExecuteWallet = !_flag || _flag === 'wallet'
  if (isExecuteAuth) {
    await publishAuth()
  }
  if (isExecuteWallet) {
    await publishWallet()
  }
}

const publishAuth = async () => {
  let authVersion = AuthJsonData.version
  if (_version) {
    authVersion = _version
    AuthJsonData.version = _version
    writeJSONSync(pathAuthJson, AuthJsonData, { encoding: 'utf-8', spaces: 2 })
  }

  const data = readFileSync(pathAuthVersion, { encoding: 'utf-8' })
  const updatedData = data.replace(/(pkgVersion:\s*["'])(.*?)(["'])/, `$1${authVersion}$3`);
  writeFileSync(pathAuthVersion, updatedData)

  await run(`yarn build`, pathAuth)

  const result = await run('npm publish', pathAuth)
  if (result !== 0) {
    consola.error(chalk.red('auth publish failed.'))
    return
  }
  // publish success
  await commitVersionFile('auth', authVersion)
}

const publishWallet = async () => {
  let walletVersion = WalletJsonData.version
  if (_version) {
    walletVersion = _version
    WalletJsonData.version = _version
    writeJSONSync(pathWalletJson, WalletJsonData, { encoding: 'utf-8', spaces: 2 })
  }

  const data = readFileSync(pathWalletVersion, { encoding: 'utf-8' })
  const updatedData = data.replace(/(pkgVersion:\s*["'])(.*?)(["'])/, `$1${walletVersion}$3`);
  writeFileSync(pathWalletVersion, updatedData)

  await run(`yarn build`, pathWallet)

  const result = await run('npm publish', pathWallet)
  if (result !== 0) {
    consola.error(chalk.red('wallet publish failed.'))
    return
  }
  await commitVersionFile('wallet', walletVersion)
}

const commitVersionFile = async (_f: string, _v: string) => {
  const path = _f === 'auth' ? pathAuth : pathWallet
  const msg = `chore: npm pkg(${_f}) publish(${_v})`
  await run(`git add . && git commit -m "${msg}"`, path)
  await run(`git push origin main`)
}

init()
