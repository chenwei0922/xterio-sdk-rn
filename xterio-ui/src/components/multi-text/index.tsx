import { Pressable, Text, View } from 'react-native';
import type { MultiTextProps } from './types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './styles';
import GradientCard from '../gradient-card';
import { IconArrow } from 'xterio-icons';

const MultiText = (props: MultiTextProps) => {
  const {
    style,
    numberOfLines = 0,
    variant = 'hover',
    textColor = '#fefefe',
    moreTextColor: _moreTextColor,
    moreBgColors = ['#14143000 0%', '#141430 30%'],
    moreTitle,
    lessTitle,
    moreStyle,
    renderMore,
    children,
    ...rest
  } = props;

  const [number, setNumber] = useState<number>(numberOfLines);

  useEffect(() => {
    setNumber(numberOfLines);
  }, [numberOfLines]);

  const [ishover] = useMemo(() => [variant === 'hover'], [variant]);

  const moreText = useMemo(
    () =>
      number !== 0
        ? moreTitle || (ishover ? 'More' : 'Show More')
        : lessTitle || (ishover ? 'Less' : 'Show Less'),
    [ishover, lessTitle, moreTitle, number]
  );
  const moreTextColor = useMemo(
    () => _moreTextColor || (ishover ? '#7DD5F9' : '#FEFEFE'),
    [_moreTextColor, ishover]
  );
  const onMore = useCallback(
    () => (number !== 0 ? setNumber(0) : setNumber(numberOfLines)),
    [number, numberOfLines]
  );
  const _moreStyle = useMemo(
    () => (renderMore ? {} : ishover ? styles.moreHover : styles.moreBottom),
    [ishover, renderMore]
  );

  return (
    <View>
      <Text
        style={[styles.text, { color: textColor }, style]}
        numberOfLines={number}
        {...rest}
      >
        {children}
      </Text>
      {!numberOfLines ? null : (
        <Pressable style={[_moreStyle, moreStyle]} onPress={onMore}>
          {renderMore ? (
            renderMore(number !== 0)
          ) : ishover ? (
            <>
              <GradientCard absolute background colors={moreBgColors} />
              <Text style={{ color: moreTextColor }}>{moreText}</Text>
            </>
          ) : (
            <>
              <Text style={{ color: moreTextColor }}>{moreText}</Text>
              <View style={[styles.arrow, number === 0 ? styles.rotate : {}]}>
                <IconArrow color={moreTextColor} size={12} />
              </View>
            </>
          )}
        </Pressable>
      )}
    </View>
  );
};

export default MultiText;
