import { Text, View, StyleSheet, Button } from 'react-native'
import {
  Env,
  LoginType,
  multiply,
  PageType,
  Storage,
  useXterioAuthContext,
  XterioAuthProvider,
  type IXterioAuthContextProps
} from '@xterio-sdk/rn-auth'
import { useCallback, useEffect, useState } from 'react'

const result = multiply(3, 7)
const AppView = () => {
  const { login, logout, openPage, loginMethod, loginWalletAddress, isLogin, userinfo } = useXterioAuthContext()

  const _ssoLogin = useCallback(() => {
    // const url = `https://api.playvrs.net/account/v1/oauth2/authorize?client_id=4gsmgur6gkp8u9ps8dlco3k7eo&logout=1&mode=default&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2F&response_type=code&scope=all`
    login(LoginType.Email)
  }, [login])

  const _openPage = async () => {
    openPage(PageType.nft_market)
  }
  const [value, setValue] = useState('')

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <Text>Storage: {value}</Text>
      <Button title="SetValue" onPress={() => Storage.setItem('test', '111')} />
      <Button title="GetValue" onPress={() => setValue(Storage.getItem('test') || '')} />
      <Text>isLogin: {isLogin}</Text>
      <Text>userinfo: {JSON.stringify(userinfo)}</Text>
      <Text>loginMethod: {loginMethod}</Text>
      <Text>loginWalletAddress: {loginWalletAddress}</Text>
      <Button title="Login" onPress={_ssoLogin} />
      <Button title="Logout" onPress={logout} />
      <Button title="OpenPage" onPress={_openPage} />
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
