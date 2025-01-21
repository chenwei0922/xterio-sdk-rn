import { createContext, useCallback, useContext, useEffect, useState, type FC, type PropsWithChildren } from 'react'
import type {
  Env,
  ISSoTokensParams,
  IUserInfo,
  LoginMethodType,
  LoginType,
  PageOptionParam,
  PageType
} from '../interfaces/loginInfo'
import { XterioAuth } from '../modules/XterAuth'
import { XterEventEmiter } from '../modules/XterEventEmitter'
import { XTERIO_EVENTS } from '../utils'
import { XterioAuthTokensManager } from '../modules/XterAuthInfo'
import { getPageUri } from '../modules/XterPage'
import { RootSiblingParent } from 'react-native-root-siblings'
import { XterUI } from '../views/XterUI'

export interface IXterioAuthContextProps extends Partial<ISSoTokensParams> {
  env?: Env
}
interface IAuthContextState {
  userinfo?: IUserInfo
  isLogin: boolean
  idToken: string
  loginMethod: LoginMethodType
  loginWalletAddress: string
  login(mode?: LoginType): void
  logout(): void
  openPage(page: PageType, options?: PageOptionParam): Promise<void>
  getPageUrl(page: PageType, options?: PageOptionParam): Promise<string>
  getIdToken(): Promise<string>
  getOtac(): Promise<string>
}
const initState = {}

const AuthContext = createContext<IAuthContextState>(initState as IAuthContextState)

export const XterioAuthProvider: FC<PropsWithChildren<IXterioAuthContextProps>> = (props) => {
  const { children, env, ...rest } = props

  const [userinfo, setUserinfo] = useState<IUserInfo>()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    //initial
    if (mounted) return
    setMounted(true)
    XterioAuth.init(rest, env)
  }, [env, mounted, rest])

  useEffect(() => {
    //the userinfo emiter
    const unsubscribe = XterEventEmiter.subscribe((res: IUserInfo) => {
      setUserinfo(res)
    }, XTERIO_EVENTS.ACCOUNT)

    //the logout emiter
    const logout_unsub = XterEventEmiter.subscribe(() => {
      console.log('logout auth, and deal page state data')
      setUserinfo(undefined)
    }, XTERIO_EVENTS.LOGOUT)

    return () => {
      unsubscribe?.()
      logout_unsub?.()
    }
  }, [])

  const openPage = useCallback(async (page: PageType, options?: PageOptionParam) => {
    const uri = await getPageUri(page, options)
    if (uri) {
      XterUI.openWeb(uri)
    }
    return
  }, [])
  const getPageUrl = useCallback(async (page: PageType, options?: PageOptionParam) => {
    const uri = await getPageUri(page, options)
    return uri
  }, [])

  return (
    <AuthContext.Provider
      value={{
        userinfo,
        isLogin: XterioAuth.isLogin,
        idToken: XterioAuthTokensManager.idToken,
        loginMethod: XterioAuth.loginMethod,
        loginWalletAddress: XterioAuth.loginWalletAddress,
        login: XterioAuth.login,
        logout: XterioAuth.logout,
        openPage,
        getPageUrl,
        getIdToken: XterioAuth.getIdToken,
        getOtac: XterioAuth.getOtac
      }}
    >
      <RootSiblingParent>{children}</RootSiblingParent>
    </AuthContext.Provider>
  )
}

export const useXterioAuthContext = () => {
  return useContext(AuthContext)
}
