import { Pressable } from 'react-native';
import type { CheckboxProps } from './types';
import { useCallback, useEffect, useState } from 'react';
import { IconCheckRight } from 'xterio-icons';
import styles from './styles';

const Checkbox = (props: CheckboxProps) => {
  const {
    value,
    onChange,
    style,
    disabled,
    color,
    activeColor,
    iconColor,
    size,
  } = props;
  const [isActive, setIsActive] = useState(value);

  const toggle = useCallback(() => {
    onChange?.(!isActive);
    setIsActive((p) => !p);
  }, [isActive, onChange]);

  useEffect(() => {
    setIsActive(!!value);
  }, [value]);

  return (
    <Pressable
      onPress={toggle}
      disabled={disabled}
      style={[
        styles.container,
        !isActive && { borderColor: color || '#9598B9' },
        isActive && {
          borderColor: 'transparent',
          backgroundColor: activeColor || '#0a1161',
        },
        size ? { width: size } : {},
        style,
      ]}
    >
      {isActive && (
        <IconCheckRight size={'75%'} color={iconColor || '#fefefe'} />
      )}
    </Pressable>
  );
};

export default Checkbox;
