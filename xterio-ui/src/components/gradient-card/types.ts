import type { ImageProps, StyleProp, ViewStyle } from 'react-native';
import type { GradientDirectionType } from '../base/gradient';
import type { PropsWithChildren } from 'react';

export type CornerDirectionType =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface GradientCardProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
  strokeWidth?: number;
  fill?: string;
  stroke?: string;
  radius?: number;
  background?: boolean;
  corner?: number | { x: number; y: number };
  cornerDirection?: CornerDirectionType | CornerDirectionType[];
  colors?: string[];
  direction?: GradientDirectionType;
  backgroundColors?: string[];
  backgroundDirection?: GradientDirectionType;
  img?: string | ImageProps['source'];
  absolute?: boolean;
}
