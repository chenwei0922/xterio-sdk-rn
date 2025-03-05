import {
  Image,
  StyleSheet,
  Platform,
  View,
  StatusBar,
  Text,
  Button,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useCallback } from "react";
import {
  Env,
  IXterioAuthContextProps,
  LoginType,
  PageType,
  useXterioAuthContext,
  XterioAuthProvider,
} from "@xterio-sdk/rn-auth";

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
  }, []);

  const _openPage = useCallback(() => {
    openPage(PageType.nft_market);
  }, []);

  const _getPageUrl = useCallback(() => {
    console.log("the page uri=", getPageUrl(PageType.nft_market));
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "yellow" }}>
      <StatusBar />
      <Text>isLogin: {isLogin}</Text>
      <Text>userinfo: {JSON.stringify(userinfo)}</Text>
      <Text>loginMethod: {loginMethod}</Text>
      <Text>loginWalletAddress: {loginWalletAddress}</Text>
      <Button title="Login" onPress={_ssoLogin} />
      <Button title="Logout" onPress={logout} />
      <Button title="OpenPage" onPress={_openPage} />
      <Button title="GetPageUrl" onPress={_getPageUrl} />
    </View>
  );
};
export default function HomeScreen() {
  const config: IXterioAuthContextProps = {
    app_id: "apiautotest",
    client_id: "jdchu9nt5f7z8aqp4syx2kmb63",
    client_secret: "ABC23",
    redirect_uri: "xterio-sdk-rn://auth",
    env: Env.Dev,
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <XterioAuthProvider {...config}>
        <XterioAuthTestDemo />
      </XterioAuthProvider>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
