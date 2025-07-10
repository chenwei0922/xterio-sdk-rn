import {
  Platform,
  ScrollView,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import type { SwiperProps } from './types';
import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './styles';

const colors = ['red', 'green', 'orange'];

type NativeEventType = {
  contentOffset: { x: number; y: number };
  layoutMeasurement: { width: number; height: number };
};
const Swiper = <T,>(props: SwiperProps<T>) => {
  const {
    index: initIndex = 0,
    data: initData,
    autoPlay = false,
    horizontal = true,
    loop = false,
    duration = 2000,
    renderItem,
    style,
    onIndexChange,
    pagingEnabled = true,
    scrollWidth,
    column = 1,
    ...rest
  } = props;
  const _viewRef = useRef<View>(null);
  const _scrollRef = useRef<ScrollView>(null);

  const [selectIndex, setSelectIndex] = useState(initIndex);
  const currentIndexRef = useRef(selectIndex);
  currentIndexRef.current = selectIndex;

  const timerRef = useRef<NodeJS.Timeout>(null);
  const [layout, setLayout] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const count = useMemo(() => initData.length, [initData.length]);
  const data = useMemo(() => {
    if (loop && count > column) {
      return [...initData, ...initData.slice(0, column)];
    }
    return [...initData];
  }, [column, count, initData, loop]);
  const isWeb = useMemo(() => Platform.OS === 'web', []);

  const update = useCallback(
    (idx: number, animated: boolean) => {
      const { width, height } = layout;
      if (!width || !height) return;

      let moveWidth = horizontal ? width : height;
      if (scrollWidth) {
        moveWidth = scrollWidth;
      }
      // console.log('////2222=', idx, moveWidth);

      if (horizontal) {
        _scrollRef.current?.scrollTo({
          x: idx * moveWidth,
          animated: animated,
        });
      } else {
        _scrollRef.current?.scrollTo({
          y: idx * moveWidth,
          animated: animated,
        });
      }
    },
    [horizontal, layout, scrollWidth]
  );

  const scrollToNextSlide = useCallback(() => {
    const index = currentIndexRef.current;
    let idx = (index + 1) % data.length;
    if (pagingEnabled) {
      idx = idx + column - 1;
    }

    if (
      (pagingEnabled && idx > data.length) ||
      (!pagingEnabled && idx + column > data.length)
    ) {
      //到最后了
      idx = 0;
    }

    // console.log('////1111=', idx, index, data.length);
    //(index + column) % data.length === 0
    if (idx === 0) {
      //最后一个元素处理，此处逻辑非必须，onMomentumScrollEnd中有做处理，二选一即可
      update(0, false);
      idx = 0;
      if (loop && isWeb) {
        //fix:为了首尾动画衔接合适，重置完直接播放第二屏动画，移动端重置工作在尾部onMomentumScrollEnd
        idx = pagingEnabled ? column : 1;
        update(idx, true);
      }
    } else {
      update(idx, true);
    }
    if (isWeb) {
      //tip：web onMomentumScrollEnd 不回调
      setSelectIndex(idx);
      onIndexChange?.(idx);
    }
  }, [column, data.length, isWeb, loop, onIndexChange, pagingEnabled, update]);

  const stop = useCallback(() => {
    timerRef.current && clearInterval(timerRef.current);
  }, []);
  const start = useCallback(() => {
    const { width, height } = layout;
    if (!width || !height) return;
    timerRef.current = setInterval(scrollToNextSlide, duration);
  }, [duration, layout, scrollToNextSlide]);

  const getScrollIdx = useCallback(
    ({ nativeEvent }: { nativeEvent: NativeEventType }) => {
      const { contentOffset, layoutMeasurement } = nativeEvent;
      const offset = horizontal ? contentOffset.x : contentOffset.y;
      let moveWidth = horizontal
        ? layoutMeasurement.width
        : layoutMeasurement.height;
      if (scrollWidth) {
        moveWidth = scrollWidth;
      }
      const idx = scrollWidth
        ? Math.round(offset / moveWidth)
        : offset / moveWidth;
      // console.log('///v', idx, contentOffset, layoutMeasurement);
      return idx;
    },
    [horizontal, scrollWidth]
  );

  const onMomentumScrollEnd = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      let idx = getScrollIdx({ nativeEvent });
      if (idx >= count) {
        idx = idx % count;
        update(idx, false);
      }
      setSelectIndex(idx);
      onIndexChange?.(idx);
    },
    [count, getScrollIdx, onIndexChange, update]
  );

  const onScrollBeginDrag = useCallback(() => {
    stop();
  }, [stop]);

  const onScrollEndDrag = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (autoPlay && count > 1) {
        start();
      }
      //移动端
      //pagingEnabled: true, 首尾衔接(onMomentumScrollEnd)
      //pagingEnabled: false, 处理偏移量，整数个元素位移
      //false, 为什么不放在onMomentumScrollEnd处理，因为手动拖拽时有可能不会执行，主动触发update，让其执行
      if (scrollWidth && !pagingEnabled) {
        let idx = getScrollIdx({ nativeEvent });
        update(idx, true);
      }
    },
    [autoPlay, count, getScrollIdx, pagingEnabled, scrollWidth, start, update]
  );

  useEffect(() => {
    if (!autoPlay || count <= 1) {
      stop();
      return;
    }
    start();
    return () => {
      stop();
    };
  }, [autoPlay, count, start, stop]);

  useEffect(() => {
    setSelectIndex(initIndex);
    update(initIndex, false);
  }, [initIndex, update]);

  const updateLayout = useCallback(() => {
    _viewRef.current?.measureInWindow((_x, _y, width, height) => {
      setLayout({ width, height });
    });
  }, []);
  useLayoutEffect(() => {
    updateLayout();
  }, [updateLayout]);

  const cellItem = ({
    item,
    index,
    rIndex,
  }: {
    item?: T;
    index: number;
    rIndex: number;
  }) => {
    if (renderItem) {
      return renderItem({ item, index, rIndex });
    }
    return (
      <View
        style={{
          width: layout.width,
          height: 200,
          backgroundColor: colors[index % colors.length],
        }}
      >
        <Text key={index} style={[styles.text]}>
          {index}
        </Text>
      </View>
    );
  };
  return (
    <View
      ref={_viewRef}
      style={[style]}
      onLayout={(e) => setLayout(e.nativeEvent.layout)}
    >
      <ScrollView
        ref={_scrollRef}
        horizontal={horizontal}
        pagingEnabled={pagingEnabled}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        {...rest}
      >
        {data?.map((item, index) => {
          const idx = index % count;
          return (
            <Fragment key={index}>
              {cellItem({ item, index: idx, rIndex: index })}
            </Fragment>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Swiper;
