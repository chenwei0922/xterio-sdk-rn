import { PageType, type PageOptionParam } from '../interfaces/loginInfo'
import { XLog } from '../utils'
import { XterioAuthService } from './AuthService'
import { XterioAuth } from './XterAuth'
import { XterioAuthInfo } from './XterAuthInfo'
import qs from 'query-string'

export const getOtac = async () => {
  //tip: otac invalid when used once
  if (XterioAuth.isLogin) {
    const otac = await XterioAuthService.getOtacByTokens()
    return otac || ''
  }
  return ''

  /*
  if (XterioAuth.isLogin) {
    // User is logged in or the login token is expiring soon
    if (!XterioAuthInfo?.otac) {
      const otac = await XterioAuthService.getOtacByTokens()
      if (otac) {
        XterioAuthInfo.otac = otac
        // Set a timer to clear the otac after 2 minutes
        setTimeout(
          () => {
            XterioAuthInfo.otac = ''
          },
          2 * 60 * 1000
        )
      }
    }
  }
  return XterioAuthInfo?.otac || ''
  */
}

export const getPageUri = async (page: PageType, options?: PageOptionParam) => {
  const {
    active = 'ingame',
    tab = 'account',
    keyword,
    collection,
    features,
    XterViewCustomOptions,
    ...rest
  } = options || {}
  const app_id = XterioAuthInfo.config?.app_id || ''
  if (!app_id) {
    throw new Error('You must set xterio-auth app_id')
  }
  const {
    asset: assetPath,
    settings: settingPath,
    marketplace: marketPath,
    collection: collectionPath
  } = XterioAuthInfo.pageUriMap || {}
  const basePage = XterioAuthInfo.pageURL
  let uri = ''
  let query: Record<string, unknown> = {}

  if (page === PageType.asset && assetPath) {
    query = { app_id, active }
    uri = `${basePage}${assetPath}`
  } else if (page === PageType.setting && settingPath) {
    query = { tab }
    uri = `${basePage}${settingPath}`
  } else if (page === PageType.nft_market && marketPath) {
    query = { app_id }
    if (collection) {
      query = { ...query, collection }
    }
    if (keyword) {
      query = { ...query, keyword: encodeURIComponent(keyword) }
    }
    if (features) {
      query = { ...query, features: encodeURIComponent(JSON.stringify(features)) }
    }
    uri = `${basePage}${marketPath}`
  } else if (page === PageType.nft_collection && collection && collectionPath) {
    if (features) {
      query = { features: encodeURIComponent(JSON.stringify(features)) }
    }
    uri = `${basePage}${collectionPath}`.replace('{app_id}', app_id).replace('{collection_id}', collection)
  }

  if (uri) {
    query = { ...query, ...XterViewCustomOptions, ...rest }
    const otac = await getOtac()
    if (otac) {
      query = { ...query, _otac: otac }
    }
    if (Object.keys(query)?.length) {
      uri += (uri.includes('?') ? '&' : '?') + qs.stringify(query)
    }
  }

  // tip: debug iframe, 需xterio启动地址为http://localhost:3001，且配置允许localhost:3000才行
  // uri = uri.replace(XterioAuthInfo.pageURL, 'http://localhost:3001')
  XLog.debug('open xerio page uri:', uri)
  return uri
}
