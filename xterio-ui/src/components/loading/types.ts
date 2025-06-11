import type { ReactElement } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type LoadingVariant =
  | 'white'
  | 'blue'
  | 'pink'
  | 'lightblue'
  | 'cyan'
  | 'color';

export interface LoadingProps {
  size?: number;
  withLogo?: boolean;
  variant?: LoadingVariant;
  weight?: number;
  backColor?: string;
  logoColor?: string;
  frontColor?: string;
  logo?: ReactElement;
  style?: StyleProp<ViewStyle>;
}

export type LoadingColor = {
  logoColor: string;
  frontColor: string;
  backColor: string;
};
