import type { StyleProp, ViewStyle } from 'react-native';

export interface PagerProps {
  count: number;
  page?: number;
  onPageChange(pagenum: number): void;
  style?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  textColor?: string;
  selectTextColor?: string;
}
