import type { ThemeType } from './types';

type ThemeObject = {
  triggerBorder: string;
  triggerBorderOpen: string;
  triggerBorderMenu: string;
  triggerTextColor: string;
  arrow: string;
  rowSelect: string;
  rowText: string;
};
export const ThemeStyleMapData: Record<ThemeType, ThemeObject> = {
  light: {
    triggerBorder: '#9598B966',
    triggerBorderOpen: '#0a1161',
    triggerBorderMenu: '#0a1161',
    triggerTextColor: '#0a1161',
    arrow: '#c4c4c4',
    rowSelect: '#9598B933',
    rowText: '#0a1161',
  },
  dark: {
    triggerBorder: '#fefefe1a',
    triggerBorderOpen: '#fefefe66',
    triggerBorderMenu: '#fefefe',
    triggerTextColor: '#fefefe',
    arrow: '#fefefe99',
    rowSelect: '#fefefe1A',
    rowText: '#fefefe',
  },
};
