import { View } from 'react-native';
import { stylesRange } from './styles';
import Input, { ThemeDataConfig } from '.';
import type { InputRangeProps } from './types';
import { useCallback, useEffect, useMemo, useState } from 'react';

const InputRange = (props: InputRangeProps) => {
  const {
    min = 0,
    max = Number.MAX_SAFE_INTEGER,
    values: initValues,
    leftPlaceholder,
    rightPlaceholder,
    onBlur,
    onFocus,
    onChange,
    style,
    inputTextStyle,
    theme = 'normal',
  } = props;

  const themeData = ThemeDataConfig[theme];

  const [leftInputValue, setLeftInputValue] = useState('');
  const [rightInputValue, setRightInputValue] = useState('');

  const [left, setLeft] = useState<number>();
  const [right, setRight] = useState<number>();

  const [leftFocus, setLeftFocus] = useState<boolean>();
  const [rightFocus, setRightFocus] = useState<boolean>();

  const [isChange, setIsChange] = useState(false);

  const leftPlace = useMemo(
    () => leftPlaceholder || (min ?? '').toString(),
    [leftPlaceholder, min]
  );
  const rightPlace = useMemo(
    () => rightPlaceholder || (max ?? '').toString(),
    [max, rightPlaceholder]
  );

  const isFocus = useMemo(
    () => leftFocus || rightFocus,
    [leftFocus, rightFocus]
  );

  const _onChange = useCallback(() => {
    if (!isFocus && isChange) {
      //fix left or right is empty
      // if (!left && left !== 0) {
      //   setLeft(min || 0);
      //   setLeftInputValue((min || 0).toString());
      // }
      // if (!right && right !== 0) {
      //   setRight(max || 0);
      //   setRightInputValue((max || 0).toString());
      // }
      let msg = '';
      const isLeftValid = left || left === 0;
      const isRightVaild = right || right === 0;

      if (!isLeftValid || (isLeftValid && min && left < min)) {
        msg = 'Invalid from value';
      } else if (!isRightVaild || (isRightVaild && max && right > max)) {
        msg = 'Invalid to value';
      } else if (isLeftValid && isRightVaild && left > right) {
        msg = 'From must less or equal than to';
      }
      onChange?.({ data: [left || 0, right || 0], errorMsg: msg });
    }
  }, [isChange, isFocus, left, max, min, onChange, right]);

  const _onBlur = useCallback(
    (tag: 'left' | 'right', text?: string) => {
      let val = text?.replace(/[^0-9.]/g, '') || '';
      const parts = val.split('.');
      if (parts.length > 2) {
        val = parts[0] + '.' + parts.slice(1).join('').replace(/\./g, '');
      }

      const isleft = tag === 'left';
      const isright = tag === 'right';
      const defaultV = isleft ? min || 0 : max || 0;

      let n: number;
      if (!val) {
        n = defaultV;
      } else {
        n = Number(val);
        n = max ? Math.min(n, max) : n;
        n = min ? Math.max(n, min) : n;
      }

      if (isleft) {
        setLeftFocus(false);
        setLeft(n);
        setLeftInputValue(n.toString());
      } else if (isright) {
        setRightFocus(false);
        setRight(n);
        setRightInputValue(n.toString());
      }
      setIsChange(true);
    },
    [max, min]
  );

  useEffect(() => {
    if (isFocus === true) {
      onFocus?.();
    } else {
      onBlur?.();
      _onChange();
    }
  }, [_onChange, isFocus, onBlur, onFocus]);

  useEffect(() => {
    const [x, y] = initValues || [];
    if (x) {
      setLeft(x);
      setLeftInputValue(x.toString());
    }
    if (y) {
      setRight(y);
      setRightInputValue(y.toString());
    }
  }, [initValues]);

  return (
    <View
      style={[
        stylesRange.container,
        {
          borderColor: isFocus
            ? themeData.focusBorderColor
            : themeData.borderColor,
        },
        style,
      ]}
    >
      <Input
        style={stylesRange.input}
        containerStyle={[stylesRange.inputContainer]}
        inputTextStyle={[stylesRange.inputText, inputTextStyle]}
        keyboardType={'numeric'}
        value={leftInputValue}
        placeholder={leftPlace}
        onBlur={(val: string) => _onBlur('left', val)}
        onFocus={() => setLeftFocus(true)}
        onChange={(val) => setLeftInputValue(val || '')}
        theme={theme}
      />
      <View
        style={[stylesRange.gap, { backgroundColor: themeData.labelColor }]}
      />
      <Input
        style={stylesRange.input}
        containerStyle={[stylesRange.inputContainer]}
        inputTextStyle={[stylesRange.inputText]}
        keyboardType={'numeric'}
        value={rightInputValue}
        placeholder={rightPlace}
        onBlur={(val: string) => _onBlur('right', val)}
        onFocus={() => setRightFocus(true)}
        onChange={(val) => setRightInputValue(val || '')}
        theme={theme}
      />
    </View>
  );
};

export default InputRange;
