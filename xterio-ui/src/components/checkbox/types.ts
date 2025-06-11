import type { StyleProp, ViewStyle } from 'react-native';

export interface CheckboxProps {
  value?: boolean;
  onChange?(p: boolean): void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  color?: string;
  activeColor?: string;
  iconColor?: string;
  size?: number;
}
