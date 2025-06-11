import { Text, View } from 'react-native';
import type { DefaultItemType, StepProgressProps } from './types';
import styles, { columnStyles } from './styles';
import { useCallback } from 'react';

const Point = ({
  size,
  selected,
  color,
  selectColor,
}: {
  size: number;
  selected?: boolean;
  color?: string;
  selectColor?: string;
}) => {
  const outsidePointSize = size;
  const innerPointSize = size * 0.4;
  return (
    <View
      style={[
        styles.pointBg,
        {
          width: selected ? outsidePointSize : innerPointSize,
        },
        selected && { borderWidth: 1, borderColor: selectColor },
      ]}
    >
      <View
        style={[
          styles.point,
          {
            width: innerPointSize,
            backgroundColor: selected ? selectColor : color,
          },
        ]}
      />
    </View>
  );
};
const StepProgress = <T extends DefaultItemType>(
  props: StepProgressProps<T>
) => {
  const {
    data,
    current = 0,
    textAlign = 'center',
    color = '#fefefe1A',
    selectColor = '#7DD5F9',
    style,
    itemStyle,
    pointSize = 20,
    lineSize = 60,
    renderPoint,
    type = 'stage',
    direction = 'row',
  } = props;

  const isRow = direction === 'row';

  const getOffset = useCallback(
    (select: boolean, textHeight: number) => {
      const _pointSize = select ? pointSize : 0.4 * pointSize;
      const _offset = (_pointSize - textHeight) / 2;
      if (textAlign === 'right') {
        return lineSize - _pointSize + _offset;
      } else if (textAlign === 'center') {
        return (lineSize - _pointSize) / 2 + _offset;
      }
      return _offset;
    },
    [lineSize, pointSize, textAlign]
  );

  return (
    <View style={[{ flexDirection: direction }, style]}>
      {data.map((item, index, arr) => {
        const { name } = item;
        const isFirst = index === 0;
        const isLast = index === arr.length - 1;
        const selected =
          type === 'progress' ? index <= current : index === current;
        const leftBgColor = isFirst
          ? 'transparent'
          : selected
            ? selectColor
            : color;
        const rightBgColor = isLast
          ? 'transparent'
          : selected
            ? selectColor
            : color;
        const textColor = selected ? selectColor : color;
        return (
          <View
            key={index}
            style={[isRow ? styles.item : columnStyles.item, itemStyle]}
          >
            <View
              style={[
                isRow ? styles.lines : columnStyles.lines,
                isRow
                  ? { height: pointSize }
                  : { width: pointSize, height: lineSize },
              ]}
            >
              {textAlign !== 'left' && (
                <View
                  style={[
                    isRow ? styles.line : columnStyles.line,
                    { backgroundColor: leftBgColor },
                  ]}
                />
              )}
              {renderPoint ? (
                renderPoint({ item, index, selected })
              ) : (
                <Point
                  size={pointSize}
                  color={color}
                  selectColor={selectColor}
                  selected={selected}
                />
              )}

              {textAlign !== 'right' && (
                <View
                  style={[
                    isRow ? styles.line : columnStyles.line,
                    {
                      backgroundColor: rightBgColor,
                    },
                  ]}
                />
              )}
            </View>
            <Text
              style={[
                styles.text,
                isRow ? styles.textGap : columnStyles.textGap,
                {
                  color: textColor,
                  textAlign: textAlign,
                },
                !isRow && {
                  top: getOffset(selected, pointSize),
                  lineHeight: pointSize,
                },
              ]}
            >
              {name}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default StepProgress;
