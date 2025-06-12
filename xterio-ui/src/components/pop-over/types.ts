import type { PropsWithChildren, ReactNode, RefObject } from 'react';
import type { StyleProp, View, ViewStyle } from 'react-native';
import type { OverlayProps } from '../overlay/types';

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

type PcikOverlayProps = Pick<OverlayProps, 'ModalComponent'>;
export interface PopOverProps extends PropsWithChildren<PcikOverlayProps> {
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
