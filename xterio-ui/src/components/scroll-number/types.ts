import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ScrollNumberProps {
  number: string;
  isSync?: boolean;
  style?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
