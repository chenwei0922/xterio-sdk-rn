import { Text, View, type ViewStyle } from 'react-native';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import styles from './styles';
import type { CutCornerTipProps } from './types';

const CutCornerTip = (props: CutCornerTipProps) => {
  const {
    title,
    theme,
    bgColor,
    textColor,
    corner = 10,
    cornerDirection = 'bottom-right',
    cornerAxis = 'x',
    children,
    style,
    textStyle,
  } = props;
  const [h, setH] = useState(0);
  const [w, setW] = useState(0);

  const sty = useMemo(() => {
    let cSty: ViewStyle = {};
    const stylesByCornerDirection = {
      'bottom-right': {
        y: {
          borderLeftWidth: w,
          borderBottomWidth: corner,
          borderBottomColor: 'transparent',
        },
        x: {
          borderTopWidth: h,
          borderRightWidth: corner,
          borderRightColor: 'transparent',
        },
      },
      'top-right': {
        y: {
          borderLeftWidth: w,
          borderTopWidth: corner,
          borderTopColor: 'transparent',
        },
        x: {
          borderBottomWidth: h,
          borderRightWidth: corner,
          borderRightColor: 'transparent',
        },
      },
      'bottom-left': {
        y: {
          borderRightWidth: w,
          borderBottomWidth: corner,
          borderBottomColor: 'transparent',
        },
        x: {
          borderTopWidth: h,
          borderLeftWidth: corner,
          borderLeftColor: 'transparent',
        },
      },
      'top-left': {
        y: {
          borderRightWidth: w,
          borderTopWidth: corner,
          borderTopColor: 'transparent',
        },
        x: {
          borderBottomWidth: h,
          borderLeftWidth: corner,
          borderLeftColor: 'transparent',
        },
      },
    };
    if (cornerDirection && cornerAxis) {
      cSty = stylesByCornerDirection[cornerDirection][cornerAxis];
    }
    return cSty;
  }, [corner, cornerAxis, cornerDirection, h, w]);

  const [borderColor, fontColor] = useMemo(() => {
    const themeColor = theme === 'xpink' ? '#E6B1F733' : '#7DD5F933';
    const _fontColor = theme === 'xpink' ? '#E6B1F7' : '#7DD5F9';
    return [bgColor || themeColor, textColor || _fontColor];
  }, [bgColor, textColor, theme]);

  const dynamicStyle = useMemo(() => {
    let tmpSty: ViewStyle = {};
    if (cornerAxis === 'y') {
      tmpSty = cornerDirection.includes('top')
        ? { paddingTop: 16, paddingBottom: 6 }
        : { paddingBottom: 16, paddingTop: 6 };
    } else {
      tmpSty = cornerDirection.includes('left')
        ? { paddingLeft: 16, paddingRight: 6 }
        : { paddingRight: 16, paddingLeft: 6 };
    }
    return tmpSty;
  }, [cornerAxis, cornerDirection]);

  const _ref = useRef<View>(null);
  useLayoutEffect(() => {
    _ref.current?.measureInWindow((_x, _y, width, height) => {
      setH(height);
      setW(width);
    });
  }, []);

  return (
    <View style={[styles.container, dynamicStyle, style]} ref={_ref}>
      <View style={[styles.corner, { borderColor }, sty]} />
      {children ? (
        children
      ) : (
        <Text style={[styles.text, { color: fontColor }, textStyle]}>
          {title}
        </Text>
      )}
    </View>
  );
};

export default CutCornerTip;
