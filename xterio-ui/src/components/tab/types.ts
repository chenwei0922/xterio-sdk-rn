import type { JSX } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ITabOption {
  key: number | string;
  title: string;
}

export interface TabProps<T extends ITabOption> {
  theme?: 'normal' | 'rounded';
  data: T[];
  index: number;
  onTabChange?(p: T, index: number): void;
  indicatorWidth?: number;
  showIndicator?: boolean;
  hideBgIndicator?: boolean;
  renderItem?(p: { item: T; index?: number; selected?: boolean }): JSX.Element;
  style?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  activeIndicatorStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  activeItemStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  activeLabelStyle?: StyleProp<TextStyle>;
}
