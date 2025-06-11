import {
  Pressable,
  Text,
  View,
  type GestureResponderEvent,
  type ViewStyle,
} from 'react-native';
import type { ButtonProps, ButtonSize } from './types';
import Loading from '../loading';
import GradientCard from '../gradient-card';
import GradientText from '../gradient-text';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styles from './styles';

const ButtonDataConfig: Record<
  ButtonSize,
  { height: number; fontSize: number }
> = {
  xsmall: {
    height: 28,
    fontSize: 12,
  },
  small: {
    height: 32,
    fontSize: 14,
  },
  default: {
    height: 40,
    fontSize: 16,
  },
  large: {
    height: 48,
    fontSize: 16,
  },
};

const Button = (props: ButtonProps) => {
  const {
    type = 'text',
    size = 'large',
    disabled,
    onPress,
    style,
    disabledStyle,
    loading,
    loadingSize = 16,
    loadingVariant,
    loadingWeight,
    icon,
    iconAlign = 'left',
    innerRef,
  } = props;

  const config = ButtonDataConfig[size];

  const [_borderRadius, setBorderRadius] = useState(0);

  const dyStyle = useMemo(() => {
    const sty: ViewStyle = {};
    if (disabled) {
      sty.opacity = 0.3;
    }
    if (loading || icon) {
      sty.flexDirection = 'row';
      sty.alignItems = 'center';
    }
    if (type !== 'text') {
      sty.justifyContent = 'center';
      sty.alignItems = 'center';
    }
    if (type === 'cancel') {
      sty.borderWidth = 2;
      sty.borderColor = '#9598B9';
    } else if (type === 'white') {
      sty.backgroundColor = '#fefefe';
    } else if (type === 'pink') {
      sty.backgroundColor = '#E6B1F7';
    } else if (type === 'confirm') {
      sty.backgroundColor = '#0a1161';
    } else if (type === 'gradient') {
      sty.flexDirection = 'row';
    }
    if (size && type !== 'text') {
      sty.height = config.height;
      setBorderRadius(config.height / 2);
    }
    return sty;
  }, [config.height, disabled, icon, loading, size, type]);

  const _onPress = useCallback(
    (e: GestureResponderEvent) => {
      if (disabled || loading) return;
      onPress?.(e);
    },
    [disabled, loading, onPress]
  );

  const _containerRef = useRef<View>(null);
  // ✅ sync layout effect during commit
  useLayoutEffect(() => {
    const containerRef = innerRef ?? _containerRef;
    // ✅ sync call to read layout
    containerRef.current?.measureInWindow((_x, _y, _width, height) => {
      // console.log('x', x, y, width, height);
      setBorderRadius(height / 2);
    });
  }, [innerRef]);

  return (
    <Pressable
      ref={innerRef || _containerRef}
      onPress={_onPress}
      disabled={disabled}
      style={[
        dyStyle,
        { borderRadius: _borderRadius },
        style,
        disabled && disabledStyle,
      ]}
    >
      {type === 'gradient' || type === 'gradient-bg' ? (
        <GradientCard
          background={type === 'gradient-bg'}
          strokeWidth={type === 'gradient-bg' ? 0 : undefined}
          absolute
          radius={_borderRadius}
        />
      ) : null}
      {loading ? (
        <Loading
          variant={loadingVariant || 'white'}
          size={loadingSize}
          weight={loadingWeight || (loadingSize > 12 ? 3 : 2)}
          style={styles.loading}
        />
      ) : null}
      {['left', 'up'].includes(iconAlign) && icon}
      <ButtonView {...props} />
      {['right', 'down'].includes(iconAlign) && icon}
    </Pressable>
  );
};
export default Button;

const ButtonView = (props: ButtonProps) => {
  const {
    type = 'text',
    size = 'large',
    title,
    titleAlign = 'right',
    children,
    titleStyle,
    disabledTitleStyle,
    fontStyle,
    fontSize,
    fontFamily,
    fontWeight,
  } = props;
  const config = ButtonDataConfig[size];

  const _fontSize = useMemo(() => {
    if (size && type !== 'text') {
      return fontSize || config.fontSize;
    }
    return fontSize || 16;
  }, [config.fontSize, fontSize, size, type]);

  const _fontColor = useMemo(() => {
    if (type === 'gradient' || type === 'gradient-bg' || type === 'white') {
      return '#0a1161';
    } else if (type === 'cancel') {
      return '#9598B9';
    }
    return '#fefefe';
  }, [type]);
  return (
    <>
      {title ? (
        <>
          {['right', 'down'].includes(titleAlign) ? children : null}
          {type === 'gradient' ? (
            <GradientText
              fontSize={_fontSize}
              fontWeight={fontWeight || 700}
              fontStyle={fontStyle}
              fontFamily={fontFamily}
            >
              {title}
            </GradientText>
          ) : (
            <Text
              style={[
                {
                  fontSize: _fontSize,
                  color: _fontColor,
                  fontWeight,
                  fontStyle,
                  fontFamily,
                },
                titleStyle,
                disabledTitleStyle,
              ]}
            >
              {title}
            </Text>
          )}
          {['left', 'up'].includes(titleAlign) ? children : null}
        </>
      ) : (
        children
      )}
    </>
  );
};
