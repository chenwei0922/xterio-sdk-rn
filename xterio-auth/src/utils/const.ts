import { Env, type PageUriMapType } from '../interfaces/loginInfo'

type EnvVariableType = {
  HCAPTCHA_SITE_KEY: string
  API_BASE: string
  PAGE_BASE: string
  PAGES_URI_API: string
}
export const EnvVariableConfig: Record<Env, EnvVariableType> = {
  [Env.Dev]: {
    HCAPTCHA_SITE_KEY: '24e8a314-60ce-4d6e-bf78-c01c598a29f6',
    API_BASE: 'https://api.playvrs.net',
    PAGE_BASE: 'https://d39wr9n5mj2b6n.cloudfront.net',
    PAGES_URI_API: 'https://resources.xter.io/configs/sdk/pages-dev.json'
  },
  [Env.Staging]: {
    HCAPTCHA_SITE_KEY: 'f274d312-aade-4b86-a8c0-05cc85a83d32',
    API_BASE: 'https://api.xterio.net',
    PAGE_BASE: 'https://d3vi0apu54mmeo.cloudfront.net',
    PAGES_URI_API: 'https://resources.xter.io/configs/sdk/pages-staging.json'
  },
  [Env.Production]: {
    HCAPTCHA_SITE_KEY: '22e2664c-fb06-482c-992c-8b74946e763a',
    API_BASE: 'https://api.xter.io',
    PAGE_BASE: 'https://app.xter.io',
    PAGES_URI_API: 'https://resources.xter.io/configs/sdk/pages-production.json'
  }
}

export const DefaultPageUriMap: PageUriMapType = {
  asset: '/asset',
  settings: '/settings',
  marketplace: '/marketplace',
  collection: '/collection/{app_id}/{collection_id}',
  get_xter: '/get-xter'
}

export const XTERIO_EVENTS = {
  LOGIN: 'xter_auth_login_success',
  ACCOUNT: 'xter_auth_response_userinfo',
  REQ_ACCOUNT: 'xter_auth_request_userinfo',
  Expired: 'xter_auth_req_expired',
  LOGOUT: 'xter_auth_logout'
}
export const XTERIO_CONST = {
  LOGIN_TYPE: 'xter_auth_login_type',
  LOGIN_METHOD: 'xter_auth_login_method',
  LOGIN_WALLET_ADDRESS: 'xter_auth_login_wallet_address',
  TOKENS: 'xter_auth_login_tokens',
  ID_TOKEN: 'xter_auth_id_token',
  REFRESH_TOKEN: 'xter_auth_refresh_token',
  ACCESS_TOKEN: 'xter_auth_access_token',
  USERINFO: 'xter_auth_userinfo'
}
