import type { PropsWithChildren } from 'react';
import type { PopOverProps } from '../pop-over/types';
import type { StyleProp, TextStyle } from 'react-native';

type PickPopUpType = Partial<PopOverProps>;

export interface ToolTipProps extends PropsWithChildren<PickPopUpType> {
  text: string;
  textStyle?: StyleProp<TextStyle>;
}
