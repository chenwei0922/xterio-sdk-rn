import { postFetcher, XterioAuthService } from "@xterio-sdk/rn-auth"
import { Utils, XLog } from "../common/utils"

interface IBindPNWalletBody {
  address: string
  pn_uuid: string
  pn_token: string
  owner_address: string
  wallet_name: string
  wallet_version: string
}

export class XterioWalletService extends XterioAuthService {
  static async bindAAWallet({
    address,
    pn_uuid,
    pn_token,
    owner_address,
    wallet_name,
    wallet_version
  }: IBindPNWalletBody): Promise<{ error: boolean }> {
    XLog.debug('bind aa wallet')
    const res = await postFetcher(
      `/account/v1/wallet/aa`,
      {
        address,
        pn_uuid,
        pn_token,
        owner_address,
        wallet_version,
        wallet_name
      },
      '',
      {
        'X-SDK-Version': 'wallet-' + Utils.pkgVersion
      }
    )
      .then(() => {
        XLog.info('bind aa wallet success.')
        return { error: false }
      })
      .catch(() => {
        XLog.error('bind aa wallet failed.')
        return { error: true }
      })

    return res
  }
}