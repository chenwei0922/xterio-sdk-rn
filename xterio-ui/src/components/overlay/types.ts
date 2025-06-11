import type { Component, PropsWithChildren } from 'react';
import type {
  ColorValue,
  ModalProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface OverlayProps
  extends PropsWithChildren<Omit<ModalProps, 'visible' | 'backdropColor'>> {
  ModalComponent?: typeof Component;
  onBackdropPress?(): void;
  fullScreen?: boolean;
  isVisible?: boolean;
  closeOnTouchBackdrop?: boolean;
  backdropColor?: ColorValue;
  backdropStyle?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}
