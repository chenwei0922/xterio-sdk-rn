import type { ModalProps } from './types';

import Overlay from '../overlay';
import { Pressable, Text, View } from 'react-native';
import styles from './styles';
import { IconClose } from 'xterio-icons';
import Button from '../button';

const Modal = (props: ModalProps) => {
  const {
    isOpen,
    onClose,
    hideClose,
    children,
    containerStyle,
    overlayStyle,
    title,
    cancelTitle,
    confirmTitle,
    onConfirm,
    cancelDisabled,
    confirmDisabled,
    hideButtons = true,
    hideCancelButton,
    btnLoading,
    btnLoadingSize,
    buttonsStyle,
    buttonStyle,
    titleStyle,
    closeStyle,
    ...rest
  } = props;
  return (
    <Overlay
      isVisible={isOpen}
      onBackdropPress={() => onClose?.('close')}
      containerStyle={[styles.constainer, containerStyle]}
      overlayStyle={[styles.overlay, overlayStyle]}
      animationType={'slide'}
      {...rest}
    >
      {title && (
        <View style={[styles.header]}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </View>
      )}
      {!hideClose && (
        <Pressable
          style={[styles.close, closeStyle]}
          onPress={() => onClose?.('close')}
        >
          <IconClose color={'#0a116166'} />
        </Pressable>
      )}
      {children}
      {hideButtons ? null : (
        <View
          style={[
            styles.buttons,
            hideCancelButton && { marginVertical: 16 },
            buttonsStyle,
          ]}
        >
          {hideCancelButton ? null : (
            <Button
              type={'cancel'}
              title={cancelTitle || 'Cancel'}
              onPress={() => {
                onClose?.('cancel');
              }}
              size={'large'}
              style={[styles.button, buttonStyle]}
              disabled={cancelDisabled}
              titleStyle={styles.buttonText}
            />
          )}
          <Button
            type={'confirm'}
            title={confirmTitle || 'Confirm'}
            onPress={onConfirm}
            size={'large'}
            style={[
              styles.button,
              !hideCancelButton && styles.confirm,
              hideCancelButton && { width: '100%' },
              buttonStyle,
            ]}
            disabled={confirmDisabled}
            titleStyle={styles.buttonText}
            loading={btnLoading}
            loadingSize={btnLoadingSize}
          />
        </View>
      )}
    </Overlay>
  );
};

export default Modal;
