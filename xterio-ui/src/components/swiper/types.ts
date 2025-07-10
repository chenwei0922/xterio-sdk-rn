import type { JSX } from 'react';
import type { ScrollViewProps, StyleProp, ViewStyle } from 'react-native';

export interface SwiperProps<T = any> extends ScrollViewProps {
  index?: number;
  data: T[];
  horizontal?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  pagingEnabled?: boolean;
  duration?: number;
  //index: 数组中索引，idx:原数据中索引
  renderItem?(p: { item?: T; index: number; rIndex: number }): JSX.Element;
  onIndexChange?(index: number): void;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollWidth?: number;
  column?: number; //自定义一排放几个， 与loop结合使用
}
