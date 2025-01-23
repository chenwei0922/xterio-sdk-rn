import { Text, View, StyleSheet, Button } from 'react-native'
import {
  Env,
  LoginType,
  PageType,
  useXterioAuthContext,
  XterioAuthProvider,
  type IXterioAuthContextProps
} from '@xterio-sdk/rn-auth'
import { useCallback } from 'react'

const AppView = () => {
  const { login, logout, openPage, getPageUrl, loginMethod, loginWalletAddress, isLogin, userinfo } =
    useXterioAuthContext()

  const _ssoLogin = useCallback(() => {
    login(LoginType.Default)
  }, [login])

  const _openPage = useCallback(() => {
    openPage(PageType.nft_market)
  }, [openPage])

  const _getPageUrl = useCallback(() => {
    console.log('the page uri=', getPageUrl(PageType.nft_market))
  }, [getPageUrl])

  return (
    <View style={styles.container}>
      <Text>isLogin: {isLogin}</Text>
      <Text>userinfo: {JSON.stringify(userinfo)}</Text>
      <Text>loginMethod: {loginMethod}</Text>
      <Text>loginWalletAddress: {loginWalletAddress}</Text>
      <Button title="Login" onPress={_ssoLogin} />
      <Button title="Logout" onPress={logout} />
      <Button title="OpenPage" onPress={_openPage} />
      <Button title="GetPageUrl" onPress={_getPageUrl} />
    </View>
  )
}

export default function App() {
  const config: IXterioAuthContextProps = {
    app_id: 'apiautotest',
    client_id: 'jdchu9nt5f7z8aqp4syx2kmb63',
    client_secret: 'ABC23',
    redirect_uri: 'xterio-sdk-rn://auth',
    env: Env.Dev
  }
  return (
    <View style={{ flex: 1, position: 'relative', backgroundColor: 'blue' }}>
      <XterioAuthProvider {...config}>
        <AppView />
      </XterioAuthProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
