import { type StyleProp, type ViewStyle } from 'react-native'
import { WebView, type WebViewProps } from 'react-native-webview'

interface IXWebviewProps extends WebViewProps {
  style?: StyleProp<ViewStyle>
  url: string
  showLoading?: boolean
  innerRef?: React.RefObject<any>
}

const XWebView = ({ url = '', style, ...attributes }: IXWebviewProps) => {
  // const [loading, setLoading] = useState(showLoading)

  return <WebView style={[{ backgroundColor: 'red', flex: 1 }, style]} source={{ uri: url }} {...attributes} />
}
export default XWebView
