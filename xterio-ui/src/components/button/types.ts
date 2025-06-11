import type { PropsWithChildren, ReactElement, RefObject } from 'react';
import type {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import type { LoadingProps } from '../loading/types';

export type ButtonSize = 'default' | 'small' | 'xsmall' | 'large';
export type ButtonType =
  | 'text'
  | 'gradient'
  | 'gradient-bg'
  | 'cancel'
  | 'confirm'
  | 'pink'
  | 'white';
export interface ButtonProps extends PropsWithChildren {
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  onPress?(event: GestureResponderEvent): void;
  title?: string;
  titleAlign?: 'left' | 'up' | 'right' | 'down';
  style?: StyleProp<ViewStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  disabledTitleStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  loadingSize?: number;
  loadingWeight?: number;
  loadingVariant?: LoadingProps['variant'];
  icon?: ReactElement;
  iconAlign?: 'left' | 'up' | 'right' | 'down';
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  fontStyle?: TextStyle['fontStyle'];
  fontFamily?: TextStyle['fontFamily'];
  innerRef?: RefObject<View | null>;
}
