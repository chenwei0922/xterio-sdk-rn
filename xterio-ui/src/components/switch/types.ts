import type { StyleProp, ViewStyle } from 'react-native';

export interface SwitchProps {
  value?: boolean;
  onChange?(p: boolean): void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  color?: string;
  activeColor?: string;
  padding?: number;
}
