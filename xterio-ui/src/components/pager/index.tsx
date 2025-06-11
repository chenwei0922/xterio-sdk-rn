import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PagerProps } from './types';
import { Pressable, Text, View } from 'react-native';
import { IconArrow, IconMore } from 'xterio-icons';
import styles from './styles';

const PageItem = (props: {
  idx?: number;
  icon?: boolean;
  active?: boolean;
  onPress?: () => void;
  textColor?: string;
  selectTextColor?: string;
  itemStyle?: PagerProps['itemStyle'];
}) => {
  const {
    idx,
    icon,
    active,
    onPress,
    textColor = '#fefefe',
    selectTextColor,
    itemStyle,
  } = props;
  const bgColor = active ? textColor : 'transparent';
  const color = active ? selectTextColor : textColor;
  return (
    <Pressable onPress={onPress} style={[styles.item, itemStyle]}>
      {idx !== undefined ? (
        <View style={[styles.num, { backgroundColor: bgColor }]}>
          <Text style={[styles.text, { color: color }]}>{idx + 1}</Text>
        </View>
      ) : icon ? (
        <IconMore color={textColor} size={'75%'} />
      ) : null}
    </Pressable>
  );
};
const Pager = (props: PagerProps) => {
  const {
    page,
    count,
    onPageChange,
    style,
    itemStyle,
    textColor = '#fefefe',
    selectTextColor = '#141430',
  } = props;

  const [pageIdx, setPageIdx] = useState(page || 0);
  const lastPage = useRef(page || 0);

  const nextPage = useCallback(() => {
    setPageIdx((p) => Math.min(p + 1, count - 1));
  }, [count]);

  const prevPage = useCallback(() => {
    setPageIdx((p) => Math.max(p - 1, 0));
  }, []);

  const data = useMemo(() => {
    const items: number[] = [];
    if (pageIdx > 2) {
      items.push(0);
    }
    if (pageIdx > 3) {
      items.push(-1); // ...
    }
    const start = Math.max(0, pageIdx - 2);
    const end = Math.min(count - 1, Math.max(start + 4, pageIdx + 2));
    for (let i = start; i <= end; i++) {
      items.push(i);
    }
    if (end < count - 2) {
      items.push(-1); // ...
    }
    if (end < count - 1) {
      items.push(count - 1);
    }
    return items;
  }, [count, pageIdx]);

  useEffect(() => {
    if (lastPage.current !== pageIdx) {
      onPageChange(pageIdx);
      lastPage.current = pageIdx;
    }
  }, [onPageChange, pageIdx]);

  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPress={prevPage}
        style={[styles.item, itemStyle]}
        disabled={pageIdx === 0}
      >
        <IconArrow
          color={textColor}
          style={[
            { transform: [{ rotate: '90deg' }] },
            pageIdx === 0 && { opacity: 0.5 },
          ]}
          size={16}
        />
      </Pressable>
      {data.map((idx, i) =>
        idx >= 0 ? (
          <PageItem
            key={i}
            onPress={() => setPageIdx(idx)}
            idx={idx}
            active={pageIdx === idx}
            textColor={textColor}
            selectTextColor={selectTextColor}
            itemStyle={itemStyle}
          />
        ) : (
          <PageItem
            key={i}
            icon
            textColor={textColor}
            selectTextColor={selectTextColor}
            itemStyle={itemStyle}
          />
        )
      )}
      <Pressable
        onPress={nextPage}
        style={[styles.item, itemStyle]}
        disabled={pageIdx === count - 1}
      >
        <IconArrow
          color={textColor}
          style={[
            { transform: [{ rotate: '-90deg' }] },
            pageIdx === count - 1 && { opacity: 0.5 },
          ]}
          size={16}
        />
      </Pressable>
    </View>
  );
};

export default Pager;
