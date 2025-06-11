import type { PropsWithChildren } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

type CornerDirectionType =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface CutCornerTipProps extends PropsWithChildren {
  title?: string;
  theme?: 'xpink' | 'xcyan';
  bgColor?: string;
  textColor?: string;
  corner?: number;
  cornerDirection?: CornerDirectionType;
  cornerAxis?: 'x' | 'y';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
