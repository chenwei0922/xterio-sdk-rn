import { Text, View, StyleSheet, Button } from 'react-native';
import {
  multiply,
  useXterioWalletContext,
  XterioWalletProvider,
} from '@xterio-sdk/rn-wallet';
import { Env, LoginType, useXterioAuthContext } from '@xterio-sdk/rn-auth';

const result = multiply(3, 7);

const WalletView = () => {
  const { isLogin, userinfo, login, logout } = useXterioAuthContext();
  const { connectWallet, isConnect, aaAddress } = useXterioWalletContext();
  return (
    <View>
      <Text>xterio auth sdk</Text>
      <View>
        <Text>isLogin: {isLogin ? 'true' : 'false'}</Text>
        <Text>UserInfo: {userinfo ? JSON.stringify(userinfo) : ''}</Text>
        <Button title="Login" onPress={() => login(LoginType.Default)} />
        <Button title="Logout" onPress={() => logout()} />
      </View>
      <Text>xterio wallet sdk</Text>
      <View>
        <Text>pn aa wallet address: {aaAddress}</Text>
        <Text>
          pn aa wallet connected status:{isConnect ? 'true' : 'false'}
        </Text>
        <Button title="ConnectWallet" onPress={() => connectWallet()} />
        <Button title="DisConnectWallet" onPress={() => {}} />
        <Button title="ObtainWallet" onPress={() => {}} />
        <Button title="OpenWallet" onPress={() => {}} />
      </View>
    </View>
  );
};
export default function App() {
  const config = {
    app_id: 'apiautotest',
    client_id: 'jdchu9nt5f7z8aqp4syx2kmb63',
    client_secret: 'ABC23',
    redirect_uri: 'xterio-sdk-rn://auth',
    env: Env.Dev,
  };
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <XterioWalletProvider {...config}>
        <WalletView />
      </XterioWalletProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
