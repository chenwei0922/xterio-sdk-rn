import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import type { ScrollNumberProps } from './types';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const NumberItem = (
  props: Partial<ScrollNumberProps> & { delay?: number; num: number }
) => {
  const { num, delay = 1000, itemStyle, textStyle } = props;

  const _viewRef = useRef<View>(null);
  const [charHeight, setCharHeight] = useState(30);

  const offsetY = useSharedValue(0);
  const animateStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -offsetY.value }],
  }));

  const start = useCallback(() => {
    offsetY.value = withRepeat(
      withTiming(offsetY.value + 10 * charHeight, {
        duration: 1750,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [charHeight, offsetY]);

  const stop = useCallback(() => {
    cancelAnimation(offsetY);
    offsetY.value = 0;
  }, [offsetY]);

  useEffect(() => {
    stop();
    start();
    setTimeout(() => {
      stop();
      offsetY.value = num * charHeight;
    }, delay);
  }, [charHeight, delay, num, offsetY, start, stop]);

  const [count] = useState(10);

  const updateLayout = useCallback(() => {
    _viewRef.current?.measureInWindow((_x, _y, _width, height) => {
      setCharHeight(height);
    });
  }, []);

  useLayoutEffect(() => {
    updateLayout();
  }, [updateLayout]);

  return (
    <View
      ref={_viewRef}
      style={[styles.item, { height: charHeight }, itemStyle]}
      onLayout={updateLayout}
    >
      {new Array(10).fill(0).map((it, index) => {
        return (
          <Animated.View
            key={index}
            style={[styles.itemNumber, { height: charHeight }, animateStyle]}
          >
            <Text key={index} style={[styles.text, textStyle]}>
              {index === count ? 0 : index}
            </Text>
          </Animated.View>
        );
      })}
    </View>
  );
};

const ScrollNumber = (props: ScrollNumberProps) => {
  const { number, style, isSync = true, ...rest } = props;
  const [value, setValue] = useState('');
  const numList = useMemo(() => value.split('').map((it) => +it), [value]);

  useEffect(() => {
    setValue(number);
  }, [number]);

  return (
    <View style={[styles.container, style]}>
      {numList.map((num, index) => {
        const delay = isSync ? 1000 : (index + 1) * 1000;
        return <NumberItem key={index} num={num} delay={delay} {...rest} />;
      })}
    </View>
  );
};

export default ScrollNumber;
