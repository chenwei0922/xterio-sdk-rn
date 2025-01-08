import { useEffect, useMemo, useState } from 'react'
import { View, type StyleProp, type ViewStyle } from 'react-native'
import { WebView, type WebViewProps } from 'react-native-webview'

interface IXWebviewProps extends WebViewProps {
  style?: StyleProp<ViewStyle>
  url: string
  showLoading?: boolean
  innerRef?: React.RefObject<any>
}

const XWebView = ({ url = '', showLoading = true, style, innerRef, ...attributes }: IXWebviewProps) => {
  const [loading, setLoading] = useState(showLoading)

  return (
    <WebView
      style={[{backgroundColor: 'red', flex:1}, style]}
      source={{ uri: url }}
      {...attributes}
    />
  )
}
export default XWebView
