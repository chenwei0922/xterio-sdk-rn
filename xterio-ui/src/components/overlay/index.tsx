import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  View,
} from 'react-native';

import styles from './styles';
import type { OverlayProps } from './types';

const Overlay = (props: OverlayProps) => {
  const {
    ModalComponent = Modal,
    fullScreen = false,
    onBackdropPress = () => null,
    closeOnTouchBackdrop = false,
    isVisible,
    backdropStyle,
    overlayStyle,
    containerStyle,
    backdropColor,
    children,
    ...rest
  } = props;

  return (
    <ModalComponent
      transparent={true}
      visible={isVisible}
      onRequestClose={onBackdropPress}
      pointerEvents={Platform.OS === 'web' ? 'auto' : 'none'}
      {...rest}
    >
      <Pressable
        style={[
          styles.backdrop,
          backdropColor && { backgroundColor: backdropColor },
          backdropStyle,
        ]}
        onPress={!closeOnTouchBackdrop ? undefined : onBackdropPress}
      />
      <KeyboardAvoidingView
        style={[styles.container, containerStyle]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View
          style={[
            styles.overlay,
            fullScreen && styles.fullscreen,
            overlayStyle,
          ]}
        >
          {children}
        </View>
      </KeyboardAvoidingView>
    </ModalComponent>
  );
};

export default Overlay;
