import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { TextInput, View, Pressable, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { IconClose, IconHide, IconShow } from 'xterio-icons';
import type { InputProps } from './types';
import styles from './styles';

export const ThemeDataConfig = {
  normal: {
    textColor: '#FEFEFE',
    labelColor: '#FEFEFE66',
    cursorColor: '#0A1161',
    borderColor: '#FEFEFE33',
    focusBorderColor: '#7DD5F9',
    disabledBorderColor: '#FEFEFE0D',
    errorBorderColor: '#F53F3F',
  },
  dark: {
    textColor: '#0a1161',
    labelColor: '#0a116133',
    cursorColor: '#7DD5F9',
    borderColor: '#9598B966',
    focusBorderColor: '#0a1161',
    disabledBorderColor: '#0a11610D',
    errorBorderColor: '#F53F3F',
  },
};
const Input = (props: InputProps) => {
  const {
    theme = 'normal',
    label,
    showPassword,
    showClear,
    errorMsg,
    value,
    multiline,
    disabled,
    placeholderTextColor,
    style,
    containerStyle,
    inputTextStyle,
    children,
    onFocus,
    onBlur,
    onChange,
    onClear,
    prefixComp,
    suffixComp,
    ...rest
  } = props;
  const themeData = ThemeDataConfig[theme];

  const [title, setTitle] = useState(value);
  const [isFocus, setIsFocus] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const labelFont = useSharedValue(14);
  const labelTranslateY = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    fontSize: withSpring(labelFont.value),
    transform: [{ translateY: labelTranslateY.value }],
  }));

  const hasInputOffset = useMemo(
    () => label && (isFocus || title),
    [isFocus, label, title]
  );
  const showErrorVisible = useMemo(
    () => errorMsg && !isFocus && title,
    [errorMsg, isFocus, title]
  );

  const borderColor = useMemo(() => {
    const {
      disabledBorderColor,
      errorBorderColor,
      borderColor: _defaultBorderColor,
      focusBorderColor,
    } = themeData;
    if (disabled) return disabledBorderColor;
    else if (showErrorVisible) return errorBorderColor;
    else if (isFocus) return focusBorderColor;
    return _defaultBorderColor;
  }, [isFocus, disabled, showErrorVisible, themeData]);

  const [initHeight, setInitHeight] = useState(60);
  const _containerRef = useRef<View>(null);
  // ✅ sync layout effect during commit
  useLayoutEffect(() => {
    // ✅ sync call to read layout
    _containerRef.current?.measureInWindow((_x, _y, _width, height) => {
      setInitHeight(height);
    });
  }, []);

  useEffect(() => {
    if (hasInputOffset) {
      labelTranslateY.value = withTiming(-initHeight / 4, { duration: 300 });
      labelFont.value = withTiming(12, { duration: 300 });
    } else {
      labelTranslateY.value = withTiming(0, { duration: 300 });
      labelFont.value = withTiming(14, { duration: 300 });
    }
  }, [hasInputOffset, initHeight, labelFont, labelTranslateY]);

  useEffect(() => {
    setTitle(value);
  }, [value]);
  return (
    <View style={style}>
      <View
        ref={_containerRef}
        style={[
          styles.container,
          { borderColor },
          !multiline
            ? { height: initHeight, borderRadius: initHeight }
            : styles.multiContainer,
          containerStyle,
        ]}
      >
        {prefixComp}
        <View style={styles.inputContainer}>
          {label ? (
            <Animated.Text
              style={[
                animatedStyles,
                styles.label,
                {
                  color: themeData.labelColor,
                },
              ]}
            >
              {label}
            </Animated.Text>
          ) : null}
          <TextInput
            style={[
              styles.input,
              { color: themeData.textColor },
              disabled && { opacity: 0.7 },
              inputTextStyle,
            ]}
            value={title}
            cursorColor={themeData.cursorColor}
            selectionColor={themeData.cursorColor}
            secureTextEntry={showPassword && !passwordVisible ? true : false}
            onChangeText={(val) => {
              setTitle(val);
              onChange?.(val);
            }}
            onFocus={() => {
              setIsFocus(true);
              onFocus?.(title);
            }}
            onBlur={() => {
              setIsFocus(false);
              onBlur?.(title);
            }}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={placeholderTextColor || themeData.labelColor}
            readOnly={disabled}
            multiline={multiline}
            {...rest}
          />
        </View>
        {showClear && !multiline && isFocus && title ? (
          <Pressable
            style={styles.icon}
            onPress={() => {
              setTitle('');
              onChange?.('');
              onClear?.();
            }}
          >
            <IconClose color={themeData.labelColor} size={24} />
          </Pressable>
        ) : null}
        {showPassword ? (
          <Pressable
            style={styles.icon}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            {!passwordVisible ? (
              <IconHide color={themeData.labelColor} size={24} />
            ) : (
              <IconShow color={themeData.labelColor} size={24} />
            )}
          </Pressable>
        ) : null}
        {children}
        {suffixComp}
      </View>
      {showErrorVisible ? (
        <Text style={styles.errorMsg}>{errorMsg}</Text>
      ) : null}
    </View>
  );
};
export default Input;
