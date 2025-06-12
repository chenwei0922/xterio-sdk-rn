import type { PropsWithChildren } from 'react';
import type { OverlayProps } from '../overlay/types';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type KeyCloseFrom = 'close' | 'cancel' | 'confirm';

type OverlayPropsType = Omit<OverlayProps, 'onBackdropPress' | 'isVisible'>;

export interface ModalProps extends PropsWithChildren<OverlayPropsType> {
  isOpen?: boolean;
  hideClose?: boolean;
  title?: string;
  confirmTitle?: string;
  cancelTitle?: string;
  onConfirm?(): void;
  onClose?(key: KeyCloseFrom): void;
  cancelDisabled?: boolean;
  confirmDisabled?: boolean;
  hideButtons?: boolean;
  hideCancelButton?: boolean;
  btnLoading?: boolean;
  btnLoadingSize?: number;
  buttonsStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  closeStyle?: StyleProp<ViewStyle>;
}
