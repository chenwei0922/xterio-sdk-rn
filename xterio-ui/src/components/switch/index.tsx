import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Pressable, View } from 'react-native';
import type { SwitchProps } from './types';
import styles from './styles';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

const Switch = (props: SwitchProps) => {
  const {
    value,
    onChange,
    disabled,
    style,
    color = '#fefefe33',
    activeColor = '#7DD5F9',
    padding = 2,
  } = props;

  const [isActive, setIsActive] = useState(value);

  const toggle = useCallback(() => {
    onChange?.(!isActive);
    setIsActive((p) => !p);
  }, [isActive, onChange]);

  useEffect(() => {
    setIsActive(!!value);
  }, [value]);

  const [initWidth, setInitWidth] = useState(54);
  const [initHeight, setInitHeight] = useState(26);
  const _containerRef = useRef<View>(null);
  const updatelayout = useCallback(() => {
    _containerRef.current?.measureInWindow((_x, _y, width, height) => {
      setInitHeight(height);
      setInitWidth(width);
    });
  }, []);
  useLayoutEffect(() => {
    updatelayout();
  }, [updatelayout]);

  const left = useSharedValue(0);
  useEffect(() => {
    left.value = withTiming(isActive ? initWidth - initHeight : 0, {
      duration: 300,
    });
  }, [initHeight, initWidth, isActive, left]);

  return (
    <Pressable
      ref={_containerRef}
      onPress={toggle}
      style={[
        styles.container,
        {
          backgroundColor: isActive ? activeColor : color,
          borderRadius: initHeight / 2,
          padding: padding,
        },
        disabled && { opacity: 0.7 },
        style,
      ]}
      disabled={disabled}
      onLayout={updatelayout}
    >
      <Animated.View
        style={[
          styles.circle,
          { width: initHeight - padding * 2 },
          { marginLeft: left },
        ]}
      />
    </Pressable>
  );
};
export default Switch;
