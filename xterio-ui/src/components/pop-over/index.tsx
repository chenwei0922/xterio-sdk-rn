import { Pressable, View, type ViewStyle } from 'react-native';
import type { MeasureLayout, PopOverProps } from './types';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './styles';
import Overlay from '../overlay';

const PopOver = (props: PopOverProps) => {
  const {
    trigger,
    triggerEnable = true,
    triggerStyle,
    isOpen,
    onClose,
    triggerRef: outsideTriggerRef,
  } = props;

  const [triggerLayout, setTriggerLayout] = useState<MeasureLayout>();
  const [visible, setVisible] = useState(false);

  const updateLayout = useCallback(
    (callback?: () => void) => {
      const triggerRef = outsideTriggerRef ?? _triggerRef;
      triggerRef?.current?.measureInWindow((x, y, width, height) => {
        // console.log('x', x, y, width, height);
        setTriggerLayout({ x, y, width, height });
        callback?.();
      });
    },
    [outsideTriggerRef]
  );
  const _triggerRef = useRef<View>(null);
  useLayoutEffect(() => {
    updateLayout();
  }, [updateLayout]);

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => {
    onClose?.();
    setVisible(false);
  }, [onClose]);
  const toggle = useCallback(() => {
    if (visible) {
      hide();
    } else {
      updateLayout(show);
      // show();
    }
  }, [hide, show, updateLayout, visible]);

  useEffect(() => {
    if (isOpen) {
      updateLayout(show);
    } else {
      setVisible(!!isOpen);
    }
  }, [isOpen, show, updateLayout]);

  return (
    <>
      {trigger && (
        <Pressable
          ref={_triggerRef}
          disabled={!triggerEnable}
          style={[triggerStyle]}
          onPress={toggle}
          onLayout={() => {
            updateLayout();
          }}
        >
          {trigger}
        </Pressable>
      )}

      <PopOverContainer
        {...props}
        triggerLayout={triggerLayout}
        onClose={hide}
        isVisible={visible}
      />
    </>
  );
};

export default PopOver;

const PopOverContainer = (
  props: PopOverProps & {
    triggerLayout?: MeasureLayout;
    onClose?(): void;
    isVisible?: boolean;
  }
) => {
  const {
    onClose: _onClose,
    showArrow = true,
    theme = 'dark',
    triggerLayout,
    arrowStyle,
    contentStyle,
    place = 'bottom-start',
    children,
    offset = 0,
    arrowSize: _arrowSize = 6,
    isVisible,
    contentWidth: _contentWidth = 300,
    bgColor: _bgColor,
  } = props;

  const [arrowWidth, arrowOffset, arrowSize] = useMemo(() => {
    return [
      showArrow ? _arrowSize : 0,
      _arrowSize,
      showArrow ? _arrowSize + offset : offset,
    ];
  }, [_arrowSize, offset, showArrow]);

  const [contentLayout, setContentLayout] = useState<MeasureLayout>();

  const bgColor = useMemo(
    () => _bgColor || (theme === 'dark' ? '#030305' : '#FEFEFE0D'),
    [theme, _bgColor]
  );

  const offsetStyle = useMemo(() => {
    const { x = 0, y = 0, width = 0, height = 0 } = triggerLayout || {};
    const { width: contentWidth = 0, height: contentHeight = 0 } =
      contentLayout || {};

    let sty: ViewStyle = { width: contentWidth };
    if (place.startsWith('bottom')) {
      sty.top = y + height + arrowSize;
    } else if (place.startsWith('top')) {
      sty.top = y - contentHeight - arrowSize;
    } else if (place.startsWith('right')) {
      sty.left = x + width + arrowSize;
    } else if (place.startsWith('left')) {
      sty.left = x - contentWidth - arrowSize;
    }
    if (place.startsWith('bottom') || place.startsWith('top')) {
      if (place.endsWith('start')) {
        sty.left = x;
      } else if (place.endsWith('end')) {
        sty.left = x + width - contentWidth;
      } else {
        sty.left = x + (width - contentWidth) / 2;
      }
    } else {
      if (place.endsWith('start')) {
        sty.top = y;
      } else if (place.endsWith('end')) {
        sty.top = y + height - contentHeight;
      } else {
        sty.top = y + (height - contentHeight) / 2;
      }
    }
    return sty;
  }, [arrowSize, contentLayout, place, triggerLayout]);

  const dynArrowStyle = useMemo(() => {
    const { width = 0, height = 0 } = contentLayout || {};
    let sty: ViewStyle = {
      borderWidth: arrowWidth,
      width: 0,
      height: 0,
      position: 'absolute',
    };
    if (place.startsWith('bottom') || place.startsWith('top')) {
      sty.borderLeftColor = 'transparent';
      sty.borderRightColor = 'transparent';
      if (place.startsWith('bottom')) {
        sty.borderBottomColor = bgColor;
        sty.borderTopWidth = 0;
        sty.top = -arrowWidth;
      } else {
        sty.borderTopColor = bgColor;
        sty.borderBottomWidth = 0;
        sty.top = height;
      }
      if (place.endsWith('start')) {
        sty.marginLeft = arrowOffset;
      } else if (place.endsWith('end')) {
        sty.marginLeft = width - arrowWidth * 2 - arrowOffset;
      } else {
        sty.marginLeft = (width - arrowWidth * 2) / 2;
      }
    } else {
      sty.borderTopColor = 'transparent';
      sty.borderBottomColor = 'transparent';
      if (place.startsWith('left')) {
        sty.borderLeftColor = bgColor;
        sty.borderRightWidth = 0;
        sty.left = width;
      } else {
        sty.borderRightColor = bgColor;
        sty.borderLeftWidth = 0;
        sty.left = -arrowWidth;
      }
      if (place.endsWith('start')) {
        sty.marginTop = arrowOffset;
      } else if (place.endsWith('end')) {
        sty.marginTop = height - arrowWidth * 2 - arrowOffset;
      } else {
        sty.marginTop = (height - arrowWidth * 2) / 2;
      }
    }

    return sty;
  }, [arrowOffset, arrowWidth, bgColor, contentLayout, place]);

  const updateLayout = useCallback(() => {
    _containerRef.current?.measureInWindow((x, y, width, height) => {
      // console.log('x', x, y, width, height);
      setContentLayout({ x, y, width, height });
    });
  }, []);
  const _containerRef = useRef<View>(null);
  // ✅ sync layout effect during commit
  useLayoutEffect(() => {
    updateLayout();
  }, [updateLayout]);

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={_onClose}
      overlayStyle={[styles.container, offsetStyle]}
      closeOnTouchBackdrop
      animationType={'fade'}
    >
      <View
        style={[
          styles.arrow,
          { borderWidth: arrowWidth },
          dynArrowStyle,
          arrowStyle,
        ]}
      />
      <View
        ref={_containerRef}
        style={[
          styles.content,
          {
            backgroundColor: bgColor,
            width: _contentWidth,
          },
          contentStyle,
        ]}
        onLayout={updateLayout}
      >
        {children}
      </View>
    </Overlay>
  );
};
