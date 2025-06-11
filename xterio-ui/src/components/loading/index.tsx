import { View } from 'react-native';
import type { LoadingColor, LoadingProps, LoadingVariant } from './types';
import { useEffect, useMemo } from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withRepeat,
} from 'react-native-reanimated';
import styles from './styles';
import { IconLoadingBar, IconLogo } from 'xterio-icons';

const ColorsDataConfig: Record<
  Exclude<LoadingVariant, 'color'>,
  LoadingColor
> = {
  white: {
    logoColor: 'white',
    frontColor: '#fefefe',
    backColor: 'rgba(254, 254, 254, 0.2)',
  },
  blue: {
    logoColor: 'rgba(10, 17, 97, 1)',
    frontColor: 'rgba(10, 17, 97, 1)',
    backColor: 'rgba(149, 152, 185, 0.1)',
  },
  pink: {
    logoColor: '#E6B1F7',
    frontColor: '#E6B1F7',
    backColor: 'rgba(230, 177, 247, 0.2)',
  },
  lightblue: {
    logoColor: '#9598B9',
    frontColor: '#9598B9',
    backColor: '#D9D9D9',
  },
  cyan: {
    logoColor: '#7DD5F9',
    frontColor: '#7DD5F9',
    backColor: 'rgba(125, 213, 249, 0.2)',
  },
};

const Loading = (props: LoadingProps) => {
  const {
    variant = 'pink',
    size = 40,
    weight,
    withLogo,
    backColor,
    logoColor,
    frontColor,
    logo,
    style,
  } = props;
  const color =
    variant !== 'color' ? ColorsDataConfig[variant] : ({} as LoadingColor);
  const _backColor = backColor || color.backColor;
  const _logoColor = logoColor || color.logoColor;
  const _frontColor = frontColor || color.frontColor;

  const _weight = useMemo(() => {
    if (weight) {
      return weight;
    } else if (size < 32) {
      return 2;
    } else if (size < 64) {
      return 3;
    } else if (size < 80) {
      return 4;
    }
    return 5;
  }, [size, weight]);

  const rotation = useSharedValue(0);
  const animateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(rotation.value + 360, {
        duration: 1750,
        easing: Easing.linear,
      }),
      -1,
      false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.loading,
          {
            borderColor: _backColor,
            borderRightColor: _frontColor,
            borderWidth: _weight || 2,
          },
          animateStyle,
        ]}
      />
      {variant === 'color' && (
        <Animated.View style={[styles.loadingColor, animateStyle]}>
          <IconLoadingBar size={size} />
        </Animated.View>
      )}

      {withLogo &&
        (logo ? (
          logo
        ) : (
          <IconLogo
            color={_logoColor}
            size={size * 0.6}
            style={{ position: 'absolute' }}
          />
        ))}
    </View>
  );
};

export default Loading;
