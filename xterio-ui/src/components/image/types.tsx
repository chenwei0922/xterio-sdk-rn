import type { ImageSource, ImageProps as ExpoImageProps } from 'expo-image';
import type { ImageRequireSource } from 'react-native';

export interface ImageProps
  extends Pick<
    ExpoImageProps,
    | 'style'
    | 'contentFit'
    | 'contentPosition'
    | 'placeholderContentFit'
    | 'blurRadius'
    | 'transition'
  > {
  source: ImageSource | string | ImageRequireSource;
  placeholder?: ImageSource | string | ImageRequireSource;
  height?: number;
  width?: number;
}
