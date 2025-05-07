/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  Env,
  IXterioAuthContextProps,
  LoginType,
  PageType,
  useXterioAuthContext,
  XterioAuthProvider,
} from '@xterio-sdk/rn-auth';
import {
  SendTransactionMode,
  useXterioTransaction,
  useXterioWalletContext,
  XterioWalletProvider,
} from '@xterio-sdk/rn-wallet';
import {ERC20_ABI} from './src/common/abi';
import {getContract, NETWORK_NAME} from './src/utils';

const XterioAuthTestDemo = () => {
  const {
    login,
    logout,
    openPage,
    getPageUrl,
    loginMethod,
    loginWalletAddress,
    isLogin,
    userinfo,
  } = useXterioAuthContext();

  const _ssoLogin = useCallback(() => {
    login(LoginType.Default);
  }, [login]);

  const _openPage = useCallback(() => {
    openPage(PageType.nft_market);
  }, [openPage]);

  const _getPageUrl = useCallback(() => {
    console.log('the page uri=', getPageUrl(PageType.nft_market));
  }, [getPageUrl]);

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

  const [signedMsg, setSignedMsg] = useState('');

  const contractAddress = '0x12065F0d03cd1Bd280565069164F9E803c2DA988';
  const abi = ERC20_ABI;
  const erc20 = getContract(NETWORK_NAME.SEPOLIA, contractAddress, abi);

  const {sendTransaction, sendUserOperation, state} = useXterioTransaction(
    erc20,
    'transfer',
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
    <View style={{flex: 1, backgroundColor: 'yellow'}}>
      <StatusBar />
      <Text>isLogin: {isLogin ? 'true' : 'false'}</Text>
      <Text>userinfo: {JSON.stringify(userinfo)}</Text>
      <Text>loginMethod: {loginMethod}</Text>
      <Text>loginWalletAddress: {loginWalletAddress}</Text>
      <Button title="Login" onPress={_ssoLogin} />
      <Button title="Logout" onPress={logout} />
      <Button title="OpenPage" onPress={_openPage} />
      <Button title="GetPageUrl" onPress={_getPageUrl} />

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
        <Text>sign message result: {signedMsg}</Text>
        <Button
          title="SignMessage"
          onPress={() => {
            signMessage?.('hello world')
              .then(res => {
                setSignedMsg(res);
              })
              .catch(err => {
                console.log('sign message error', err);
              });
          }}
        />
        <Text>the transaction progress: {state.status}</Text>

        <Button title="Transfer Transaction" onPress={() => test1()} />
        <Button title="Transfer2 Transaction" onPress={() => test2()} />
      </View>
    </View>
  );
};

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const config: IXterioAuthContextProps = {
    app_id: 'apiautotest',
    client_id: 'jdchu9nt5f7z8aqp4syx2kmb63',
    client_secret: 'ABC23',
    redirect_uri: 'xterio-sdk-rn://auth',
    env: Env.Dev,
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the reccomendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */
  const safePadding = '5%';

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView style={backgroundStyle}>
        <View style={{paddingRight: safePadding}}>
          <Header />
        </View>
        <XterioAuthProvider {...config}>
          <XterioWalletProvider
            {...config}
            transactionMode={SendTransactionMode.Gasless}>
            <XterioAuthTestDemo />
          </XterioWalletProvider>
        </XterioAuthProvider>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            paddingHorizontal: safePadding,
            paddingBottom: safePadding,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
