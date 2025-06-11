import {
  Pressable,
  ScrollView,
  Text,
  View,
  type LayoutRectangle,
} from 'react-native';
import type { ITabOption, TabProps } from './types';
import styles from './styles';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Tab = <T extends ITabOption>(props: TabProps<T>) => {
  const {
    theme = 'normal',
    data,
    index: selectIndex,
    onTabChange,
    style,
    indicatorWidth: initIndictorWidth,
    indicatorStyle,
    activeIndicatorStyle,
    itemStyle,
    activeItemStyle,
    labelStyle,
    activeLabelStyle,
    showIndicator = true,
    hideBgIndicator = false,
    renderItem,
  } = props;

  const isRound = theme === 'rounded';

  const [idx, setIdx] = useState(selectIndex);

  useEffect(() => {
    setIdx(selectIndex);
  }, [selectIndex]);

  const inputRange = data.map((_, i) => i);

  const indicatorWidth = useMemo(
    () => (initIndictorWidth ? initIndictorWidth : 40),
    [initIndictorWidth]
  );

  const [layout, setLayout] = useState<LayoutRectangle>();
  const { current: layouts } = useRef<Map<number, LayoutRectangle>>(new Map());

  const _scrollRef = useRef<ScrollView>(null);
  const _containerRef = useRef<View>(null);
  const updatelayout = useCallback(() => {
    _containerRef.current?.measureInWindow((x, y, width, height) => {
      setLayout({ x, y, width, height });
    });
  }, []);
  useLayoutEffect(() => {
    updatelayout();
  }, [updatelayout]);

  const translateX = useSharedValue(0);
  const scaleX = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { scaleX: scaleX.value }],
  }));

  const updateIndicatorPlace = useCallback(() => {
    if (!layouts.size || layouts.size !== inputRange.length) {
      translateX.value = 0;
      scaleX.value = 1;
    } else {
      const _out = layouts.get(idx) ?? {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      };
      translateX.value = withTiming(
        _out.x + (_out.width - indicatorWidth) / 2,
        { duration: 300 }
      );
      scaleX.value = withTiming(
        initIndictorWidth ? 1 : _out.width / indicatorWidth,
        {
          duration: 300,
        }
      );
    }
  }, [
    idx,
    indicatorWidth,
    initIndictorWidth,
    inputRange.length,
    layouts,
    scaleX,
    translateX,
  ]);
  const updateScrollPlace = useCallback(() => {
    if (!layout || !layouts.size || layouts.size !== inputRange.length) {
      return;
    }
    const _out = layouts.get(idx) ?? {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    const x = _out.x - layout.width / 2 + _out.width / 2;
    _scrollRef.current?.scrollTo({ x: x, animated: true });
  }, [idx, inputRange.length, layout, layouts]);

  useEffect(() => {
    updateIndicatorPlace();
    updateScrollPlace();
  }, [updateIndicatorPlace, updateScrollPlace]);

  return (
    <View
      style={[styles.container, style]}
      ref={_containerRef}
      onLayout={updatelayout}
    >
      <ScrollView
        ref={_scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item, index) => {
          const { title } = item;
          const selected = index === idx;
          return (
            <Pressable
              style={[
                styles.item,
                isRound && styles.itemRound,
                index === data.length - 1 ? { marginRight: 0 } : {},
                isRound && selected && { backgroundColor: '#fefefe1A' },
                itemStyle,
                selected && activeItemStyle,
              ]}
              key={index}
              onPress={() => {
                setIdx(index);
                onTabChange?.(item, index);
              }}
              onLayout={(e) => {
                layouts.set(index, e.nativeEvent.layout);
              }}
            >
              {renderItem ? (
                renderItem({ item, index, selected })
              ) : (
                <Text
                  style={[
                    styles.text,
                    selected && { color: '#fefefe' },
                    labelStyle,
                    selected && activeLabelStyle,
                  ]}
                >
                  {title}
                </Text>
              )}
            </Pressable>
          );
        })}
        {showIndicator && !isRound && (
          <>
            {!hideBgIndicator && (
              <View style={[styles.indicator, indicatorStyle]} />
            )}
            <Animated.View
              style={[
                styles.activeIndicator,
                { width: indicatorWidth },
                animatedStyle,
                activeIndicatorStyle,
              ]}
            />
          </>
        )}
      </ScrollView>
      {/* <View style={[styles.indicator, indicatorStyle]} /> */}
    </View>
  );
};

export default Tab;
