import { useCallback } from 'react'
import { Dimensions, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native'
import { WebView, type WebViewProps } from 'react-native-webview'
import rootSibling from '../utils/rootSibling'

interface IXWebviewProps extends WebViewProps {
  style?: StyleProp<ViewStyle>
  url: string
  uid?: number
}

const XWebView = ({ url = '', style, uid, ...rest }: IXWebviewProps) => {
  const onClose = useCallback(() => {
    setTimeout(() => {
      rootSibling.destroy(uid)
    }, 0)
  }, [uid])

  return (
    <View style={[styles.screen, style]}>
      {/* <View className="absolute w-full h-full bg-background/70" /> */}
      <WebView style={styles.contentView} source={{ uri: url }} {...rest} />
      <Pressable style={styles.close} onPress={onClose} />
    </View>
  )
}
export default XWebView

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
const styles = StyleSheet.create({
  screen: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    top: 0,
    bottom: 0,
    backgroundColor: '#141430B3'
  },
  close: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    backgroundColor: 'blue'
  },
  contentView: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
})
