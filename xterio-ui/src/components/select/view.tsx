import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { ThemeStyleMapData } from './const';
import type { OptionItem, SelectProps } from './types';
import { Pressable, Text, type View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styles from './styles';
import { IconArrow, IconCheckRight } from 'xterio-icons';
import GradientCard from '../gradient-card';

export const TriggerView = <T extends OptionItem>({
  onPress,
  theme = 'dark',
  isOpen,
  type = 'select',
  selected,
  disabled,
  triggerStyle,
  trigger,
  placeholderText,
  triggerRef,
}: {
  isOpen?: boolean;
  onPress?(): void;
  selected?: T;
  theme?: SelectProps<T>['theme'];
  type?: SelectProps<T>['type'];
  disabled?: SelectProps<T>['disabled'];
  triggerStyle?: SelectProps<T>['triggerStyle'];
  trigger?: SelectProps<T>['trigger'];
  placeholderText?: SelectProps<T>['placeholderText'];
  triggerRef?: RefObject<View | null>;
}) => {
  const themeData = ThemeStyleMapData[theme];

  const [isMenu, _] = useMemo(
    () => [type === 'menu', type === 'actionsheet'],
    [type]
  );
  const _placeText = useMemo(() => {
    if (isMenu) return placeholderText;
    return selected?.title || selected?.key || placeholderText || '';
  }, [isMenu, placeholderText, selected?.key, selected?.title]);

  const triggerBorderColor = useMemo(() => {
    const { triggerBorder, triggerBorderMenu, triggerBorderOpen } = themeData;
    if (isMenu) return triggerBorderMenu;
    if (isOpen) return triggerBorderOpen;
    return triggerBorder;
  }, [isMenu, isOpen, themeData]);

  const [initHeight, setInitHeight] = useState(48);
  const _containerRef = useRef<View>(null);
  useLayoutEffect(() => {
    _containerRef.current?.measureInWindow((_x, _y, _width, height) => {
      setInitHeight(height);
    });
  }, []);

  const rotate = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
  useEffect(() => {
    if (isOpen) {
      rotate.value = withTiming(180, { duration: 300 });
    } else {
      rotate.value = withTiming(0, { duration: 300 });
    }
  }, [isOpen, rotate]);

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.trigger,
        { height: initHeight, borderRadius: initHeight / 2 },
        { borderColor: triggerBorderColor },
        disabled && { opacity: 0.4 },
        triggerStyle,
      ]}
      disabled={disabled}
      ref={triggerRef}
    >
      {trigger ? (
        trigger
      ) : (
        <>
          {!isMenu && selected?.icon}
          <Text
            style={[
              styles.triggerText,
              { color: themeData.triggerTextColor },
              !isMenu && selected?.icon ? { marginLeft: 8 } : {},
            ]}
          >
            {_placeText}
          </Text>
          {!isMenu && (
            <Animated.View style={[styles.triggerIcon, animatedStyle]}>
              <IconArrow size={16} color={themeData.arrow} />
            </Animated.View>
          )}
        </>
      )}
    </Pressable>
  );
};

export const OptionView = <T extends OptionItem>(props: {
  onPress?: SelectProps<T>['onChange'];
  option: T;
  selectKey?: T['key'];
  type?: SelectProps<T>['type'];
  theme?: SelectProps<T>['theme'];
  disabled?: boolean;
  rowStyle?: SelectProps<T>['rowStyle'];
  rowSelectStyle?: SelectProps<T>['rowSelectStyle'];
}) => {
  const {
    option,
    selectKey,
    type = 'select',
    theme: initTheme = 'dark',
    onPress,
    disabled,
    rowStyle,
    rowSelectStyle,
  } = props;

  const { key, icon, title } = option;
  const [isMenu, isSheet] = useMemo(
    () => [type === 'menu', type === 'actionsheet'],
    [type]
  );
  const _theme = initTheme === 'dark' ? (isSheet ? 'light' : 'dark') : 'light';
  const themeData = ThemeStyleMapData[_theme];
  const active = useMemo(() => key === selectKey, [key, selectKey]);

  return (
    <Pressable
      style={[
        styles.row,
        isSheet && styles.rowSheet,
        active && !isMenu && !isSheet
          ? { backgroundColor: themeData.rowSelect }
          : {},
        active && isSheet ? { height: 48, marginVertical: 8 } : {},
        disabled && { opacity: 0.4 },
        rowStyle,
        active && rowSelectStyle,
      ]}
      onPress={() => onPress?.(key, option)}
      disabled={disabled}
    >
      {isSheet && active && (
        <GradientCard absolute fill={'#9598B933'} strokeWidth={0} corner={10} />
      )}
      {icon}
      <Text
        style={[
          styles.rowText,
          isSheet && styles.rowSheetText,
          !isSheet && { color: themeData.rowText },
          icon ? { marginLeft: 8 } : {},
        ]}
      >
        {title}
      </Text>
      {isSheet && active && (
        <Animated.View style={[styles.triggerIcon]}>
          <IconCheckRight size={16} color={'#0a116133'} />
        </Animated.View>
      )}
    </Pressable>
  );
};
