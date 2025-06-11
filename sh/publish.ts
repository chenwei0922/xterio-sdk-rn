import chalk from 'chalk'
import consola from 'consola'
import { readFileSync, readJSONSync, writeFileSync, writeJSONSync } from 'fs-extra'

import { pathAuth, pathWallet, pathAuthJson, pathWalletJson, pathSh, pathAuthVersion, pathWalletVersion, pathUi, pathUiJson } from './paths'
import { run } from './run'

enum PackageEnum {
  auth = 'auth',
  wallet = 'wallet',
  ui = 'ui'
}

const DataConfig: Record<PackageEnum, { pkgPath: string; pkgJsonPath: string; pkgVersionPath: string }> = {
  [PackageEnum.auth]: {
    pkgPath: pathAuth,
    pkgJsonPath: pathAuthJson,
    pkgVersionPath: pathAuthVersion
  },
  [PackageEnum.wallet]: {
    pkgPath: pathWallet,
    pkgJsonPath: pathWalletJson,
    pkgVersionPath: pathWalletVersion
  },
  [PackageEnum.ui]: {
    pkgPath: pathUi,
    pkgJsonPath: pathUiJson,
    pkgVersionPath: ''
  }
}

class PkgPublish {
  private name: PackageEnum
  private version: string
  private pkgPath: string
  private pkgJsonPath: string
  private pkgVersionPath: string
  private jsonData: any

  constructor(tag: PackageEnum, version: string) {
    this.name = tag
    this.version = version
    this.pkgPath = DataConfig[tag].pkgPath
    this.pkgJsonPath = DataConfig[tag].pkgJsonPath
    this.pkgVersionPath = DataConfig[tag].pkgVersionPath
    this.jsonData = readJSONSync(this.pkgJsonPath, { encoding: 'utf-8' })
  }

  async publish() {
    const _version = this.version
    const _pkgPath = this.pkgJsonPath
    const jsonData = this.jsonData

    let version = jsonData.version
    if (_version) {
      version = _version
      jsonData.version = _version
      writeJSONSync(_pkgPath, jsonData, { encoding: 'utf-8', spaces: 2 })
    }

    if (this.pkgVersionPath) {
      const data = readFileSync(this.pkgVersionPath, { encoding: 'utf-8' })
      const updatedData = data.replace(/(pkgVersion:\s*["'])(.*?)(["'])/, `$1${version}$3`);
      writeFileSync(this.pkgVersionPath, updatedData)
    }

    await run(`yarn build`, this.pkgPath)

    const result = await run('npm publish', this.pkgPath)
    if (result !== 0) {
      consola.error(chalk.red(`${this.name} publish failed.`))
      return
    }
    // publish success
    await this.commitVersionFile(this.name, version)
  }
  private async commitVersionFile(name: string, _v: string) {
    const msg = `chore: npm pkg(${name}) publish(${_v})`
    await run(`git add . && git commit -m "${msg}"`, this.pkgPath)
    await run(`git push origin main`)
    await sleep(3)
    await run(`git tag xterio-${name}@${_v}`)
    await run(`git push origin xterio-${name}@${_v}`)
    // await run(`git push origin --tags`)
  }
}

const sleep = (time: number) => {
  return new Promise((res) => {
    setTimeout(res, time)
  })
}


const main = async () => {
  const _name = process.argv[2]
  const _version = process.argv[3]
  consola.info('pkg_name=', chalk.blue(_name), _version)

  if (!_name || _name === PackageEnum.auth) {
    await new PkgPublish(PackageEnum.auth, _version).publish()
  }
  if (!_name || _name === PackageEnum.wallet) {
    await new PkgPublish(PackageEnum.wallet, _version).publish()
  }
  if (!_name || _name === PackageEnum.ui) {
    await new PkgPublish(PackageEnum.ui, _version).publish()
  }
}

main()