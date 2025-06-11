import type { JSX, ReactNode } from 'react';
import type { ModalProps } from '../modal/types';
import type { StyleProp, ViewStyle } from 'react-native';
import type { PopOverProps } from '../pop-over/types';

export type ThemeType = 'light' | 'dark';
export type SelectType = 'menu' | 'select' | 'actionsheet';
export interface OptionItem {
  key: string | number;
  title: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SelectProps<T extends OptionItem> extends ModalProps {
  type?: SelectType;
  theme?: ThemeType;
  trigger?: ReactNode;
  options?: T[];
  selectKey?: string | number;
  disabled?: boolean;
  onChange?(key: string | number, p: T): void;
  renderItem?(p: { item: T; index?: number; selected?: boolean }): JSX.Element;
  placeholderText?: string;
  modalTitle?: string;
  triggerStyle?: StyleProp<ViewStyle>;
  rowStyle?: StyleProp<ViewStyle>;
  rowSelectStyle?: StyleProp<ViewStyle>;
  place?: PopOverProps['place'];
  popWidth?: PopOverProps['contentWidth'];
  popBgColor?: PopOverProps['bgColor'];
  offset?: PopOverProps['offset'];
  maxHeight?: number;
}
