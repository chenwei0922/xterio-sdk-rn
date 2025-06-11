import type { PropsWithChildren } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { GradientDirectionType } from '../base/gradient';

export interface GradientTextProp extends PropsWithChildren {
  numberOfLines?: number;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  fontStyle?: TextStyle['fontStyle'];
  fontFamily?: TextStyle['fontFamily'];
  textAlign?: TextStyle['textAlign'];
  style?: StyleProp<ViewStyle>;
  text?: string;
  colors?: string[];
  direction?: GradientDirectionType;
}
