import { Pressable, Text, View } from 'react-native';
import type { CollapsibleGroupProps, CollapsibleProps } from './types';
import { useCallback, useEffect, useState } from 'react';
import { IconArrow } from 'xterio-icons';
import styles from './styles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { CollapsibleProvider, useCollapsibleContext } from './context';

const Collapsible = (props: CollapsibleProps) => {
  const { unique, getId, setOpenKey, openKey } = useCollapsibleContext();
  const [uid] = useState<number>(unique ? getId() : -1);

  const {
    title,
    children,
    titleStyle,
    contentStyle,
    style,
    activeTitleStyle,
    onPress,
  } = props;

  const [isOpen, setIsOpen] = useState(unique ? openKey === uid : false);

  const isTextTitle = typeof title === 'string';
  const hasChild = !!children;

  const rotate = useSharedValue(-90);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
  useEffect(() => {
    rotate.value = withTiming(isOpen ? 0 : -90, { duration: 300 });
  }, [isOpen, rotate]);

  const _onPress = useCallback(() => {
    unique && setOpenKey(isOpen ? -1 : uid);
    if (hasChild) {
      setIsOpen((p) => !p);
    } else {
      onPress?.();
    }
  }, [hasChild, isOpen, onPress, setOpenKey, uid, unique]);

  useEffect(() => {
    setIsOpen(unique ? openKey === uid : false);
  }, [openKey, uid, unique]);

  return (
    <View style={[styles.container, style]}>
      <Pressable
        style={[
          styles.heading,
          isOpen && hasChild && { backgroundColor: '#fefefe0D' },
          titleStyle,
          isOpen && hasChild && activeTitleStyle,
        ]}
        onPress={_onPress}
      >
        {!isTextTitle ? (
          title
        ) : (
          <>
            <Text style={styles.text}>{title}</Text>
            {hasChild && (
              <Animated.View style={[animatedStyle]}>
                <IconArrow size={16} color={'#fefefe'} />
              </Animated.View>
            )}
          </>
        )}
      </Pressable>
      {isOpen && hasChild && (
        <View style={[styles.content, contentStyle]}>{children}</View>
      )}
    </View>
  );
};

export default Collapsible;

export const CollapsibleGroup = (props: CollapsibleGroupProps) => {
  const { children, unique } = props;
  return (
    <CollapsibleProvider unique={!!unique}>{children}</CollapsibleProvider>
  );
};
