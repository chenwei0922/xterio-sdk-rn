import type { JSX, PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface CollapsibleProps extends PropsWithChildren {
  title: string | JSX.Element;
  titleStyle?: StyleProp<ViewStyle>;
  activeTitleStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  onPress?(): void;
}

export interface CollapsibleGroupProps extends PropsWithChildren {
  unique?: boolean;
}
