import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import {
  multiply,
  SendTransactionMode,
  useXterioTransaction,
  useXterioWalletContext,
  XterioWalletProvider,
} from '@xterio-sdk/rn-wallet';
import {
  Env,
  LoginType,
  useXterioAuthContext,
  XterioAuthProvider,
  type IXterioAuthContextProps,
} from '@xterio-sdk/rn-auth';
import { useCallback, useEffect, useState } from 'react';
import { ERC20_ABI } from './common/abi';
import { getContract, NETWORK_NAME } from './utils';

const result = multiply(3, 7);

const WalletView = () => {
  const { isLogin, userinfo, login, logout } = useXterioAuthContext();

  const {
    connectWallet,
    disconnectWallet,
    obtainWallet,
    switchChain,
    openWallet,
    signMessage,
    isConnect,
    aaAddress,
  } = useXterioWalletContext();

  const _ssoLogin = useCallback(() => {
    login(LoginType.Default);
  }, [login]);

  const [signedMsg, setSignedMsg] = useState('');

  const contractAddress = '0x12065F0d03cd1Bd280565069164F9E803c2DA988';
  const abi = ERC20_ABI;
  const erc20 = getContract(NETWORK_NAME.SEPOLIA, contractAddress, abi);

  const { sendTransaction, sendUserOperation, state } = useXterioTransaction(
    erc20,
    'transfer'
  );

  const test1 = async () => {
    //方式1: sendTransaction，useXterioTransaction 必须传contract跟functionName
    const toAddr = '0xF4Ae736B14a7B5FDb803172B242074D6DFe655bb';
    const amount = '0x0de0b6b3a7640000';
    try {
      await sendTransaction?.(toAddr, amount);
    } catch (err: any) {
      console.log('ddd', err, err?.message);
    }
  };

  const test2 = async () => {
    //方式2: sendUserOperation
    const contractAddress = '0x12065F0d03cd1Bd280565069164F9E803c2DA988';
    const abi = ERC20_ABI;
    const erc20 = getContract(NETWORK_NAME.SEPOLIA, contractAddress, abi);
    const toAddr = '0xF4Ae736B14a7B5FDb803172B242074D6DFe655bb';
    const amount = '0x0de0b6b3a7640000';

    const tx = {
      to: contractAddress,
      data: erc20.interface.encodeFunctionData('transfer', [toAddr, amount]),
    };
    try {
      await sendUserOperation?.(tx);
    } catch (err) {
      console.log('ddd', err);
    }
  };

  useEffect(() => {
    const status = state.status;
    console.log('status=', status);
    if (status === 'Mining' || status === 'PendingSignature') {
      console.log('trade ing');
    } else if (status === 'Success') {
      console.log('trade success');
    } else if (status === 'Exception' || status === 'Fail') {
      console.log('trade failed');
    }
  }, [state.status]);

  return (
    <ScrollView>
      <Text>xterio auth sdk</Text>
      <View>
        <Text>isLogin: {isLogin ? 'true' : 'false'}</Text>
        <Text>UserInfo: {userinfo ? JSON.stringify(userinfo) : ''}</Text>
        <Button title="Login" onPress={_ssoLogin} />
        <Button title="Logout" onPress={() => logout()} />
      </View>
      <Text>xterio wallet sdk</Text>
      <View>
        <Text>pn aa wallet address: {aaAddress}</Text>
        <Text>
          pn aa wallet connected status:{isConnect ? 'true' : 'false'}
        </Text>
        <Button title="ConnectWallet" onPress={() => connectWallet()} />
        <Button title="DisConnectWallet" onPress={() => disconnectWallet()} />
        <Button title="ObtainWallet" onPress={() => obtainWallet()} />
        <Button title="SwitchChain" onPress={() => switchChain(11155111)} />
        <Button title="OpenWallet" onPress={() => openWallet()} />
      </View>
      <Text>xterio wallet transaction</Text>
      <View>
        <Text>pn aa wallet address: {aaAddress}</Text>
        <Text>sign message result: {signedMsg}</Text>
        <Button
          title="SignMessage"
          onPress={() => {
            signMessage?.('hello world')
              .then((res) => {
                setSignedMsg(res);
              })
              .catch((err) => {
                console.log('sign message error', err);
              });
          }}
        />
        <Text>the transaction progress: {state.status}</Text>

        <Button title="Transfer Transaction" onPress={() => test1()} />
        <Button title="Transfer2 Transaction" onPress={() => test2()} />
      </View>
    </ScrollView>
  );
};
export default function App() {
  const config: IXterioAuthContextProps = {
    app_id: 'apiautotest',
    client_id: 'jdchu9nt5f7z8aqp4syx2kmb63',
    client_secret: 'ABC23',
    redirect_uri: 'xterio-sdk-rn://auth',
    env: Env.Dev,
    logout: '0',
  };
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <XterioAuthProvider {...config}>
        <XterioWalletProvider
          {...config}
          transactionMode={SendTransactionMode.Gasless}
        >
          <WalletView />
        </XterioWalletProvider>
      </XterioAuthProvider>
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
