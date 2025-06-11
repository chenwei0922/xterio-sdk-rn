import { Image, useImage } from 'expo-image';
import { useMemo } from 'react';
import type { ImageProps } from './types';
import styles from './styles';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const CustomImage = (props: ImageProps) => {
  const {
    width,
    height,
    source,
    style,
    placeholder,
    contentFit,
    transition,
    ...rest
  } = props;
  const isRemoteImg = typeof source !== 'number';

  const image = useImage(isRemoteImg ? source : '', {
    onError(_error, _retry) {},
  });
  const aspectRatio = image ? image?.width / image?.height : 0;

  const dynamicImageStyle = useMemo(() => {
    let imgWidth;
    if (width) {
      imgWidth = width;
    } else if (height && aspectRatio) {
      imgWidth = height * aspectRatio;
    } else {
      imgWidth = 0;
    }

    let imgHeight;
    if (height) {
      imgHeight = height;
    } else if (width && aspectRatio) {
      imgHeight = width / aspectRatio;
    } else {
      imgHeight = 0;
    }

    if (imgWidth === 0 && imgHeight === 0) {
      return {};
    }
    return { width: imgWidth || imgHeight, height: imgHeight || imgWidth };
  }, [aspectRatio, height, width]);

  return (
    <Image
      style={[styles.container, dynamicImageStyle, style]}
      source={source}
      placeholder={placeholder || { blurhash }}
      transition={transition || 500}
      contentFit={contentFit || 'cover'}
      // cachePolicy={'none'}
      {...rest}
    />
  );
};

export default CustomImage;
