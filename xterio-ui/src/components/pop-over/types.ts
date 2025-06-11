import type { PropsWithChildren, ReactNode, RefObject } from 'react';
import type { StyleProp, View, ViewStyle } from 'react-native';

export type PlacementEnum =
  | 'bottom'
  | 'top'
  | 'left'
  | 'right'
  | 'bottom-start'
  | 'bottom-end'
  | 'top-start'
  | 'top-end';

export type MeasureLayout = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export interface PopOverProps extends PropsWithChildren {
  isOpen?: boolean;
  onClose?(): void;
  place?: PlacementEnum;
  trigger?: ReactNode;
  triggerEnable?: boolean;
  triggerRef?: RefObject<View | null>;
  theme?: 'light' | 'dark';
  bgColor?: string;
  offset?: number;
  showArrow?: boolean;
  arrowSize?: number;
  contentStyle?: StyleProp<ViewStyle>;
  triggerStyle?: StyleProp<ViewStyle>;
  arrowStyle?: StyleProp<ViewStyle>;
  contentWidth?: number;
}
