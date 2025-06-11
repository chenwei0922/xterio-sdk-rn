import type { JSX } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type DefaultItemType = { name: string };
export interface StepProgressProps<T = DefaultItemType> {
  data: T[];
  current?: number;
  textAlign?: 'left' | 'right' | 'center';
  color?: string;
  selectColor?: string;
  style?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  pointSize?: number;
  lineSize?: number;
  renderPoint?(p: { item: T; index: number; selected?: boolean }): JSX.Element;
  type?: 'stage' | 'progress';
  direction?: 'row' | 'column';
}
