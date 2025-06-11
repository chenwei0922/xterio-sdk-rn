import type { JSX, PropsWithChildren } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface MultiTextProps extends PropsWithChildren {
  numberOfLines?: number;
  variant?: 'hover' | 'bottom';
  textColor?: string;
  moreTitle?: string;
  lessTitle?: string;
  moreTextColor?: string;
  /** only for variant is hover */
  moreBgColors?: string[];
  style?: StyleProp<TextStyle>;
  moreStyle?: StyleProp<ViewStyle>;
  renderMore?(more: boolean): JSX.Element;
}
