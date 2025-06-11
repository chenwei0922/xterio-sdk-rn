import { FlatList, View } from 'react-native';
import Modal from '../modal';
import type { OptionItem, SelectProps } from './types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { OptionView, TriggerView } from './view';
import PopOver from '../pop-over';
import styles from './styles';

const Select = <T extends OptionItem>(props: SelectProps<T>) => {
  const {
    type = 'select',
    theme = 'dark',
    options,
    selectKey,
    trigger,
    triggerStyle,
    placeholderText,
    disabled,
    renderItem,
    rowStyle,
    rowSelectStyle,
    onChange,
    modalTitle,
    popWidth,
    place,
    popBgColor,
    maxHeight,
    offset,
  } = props;

  const isSheet = type === 'actionsheet';
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    options?.find((it) => it.key === selectKey)
  );

  const _onChange = useCallback(
    (key: string | number, item: T) => {
      onChange?.(key, item);
      setSelected(options?.find((i) => i.key === key));
      setIsOpen(false);
    },
    [onChange, options]
  );
  useEffect(() => {
    setSelected(options?.find((it) => it.key === selectKey));
  }, [options, selectKey]);

  const ContentView = useMemo(() => {
    return (
      <FlatList
        data={options}
        renderItem={({ item, index }) => {
          if (renderItem) {
            return renderItem({
              item,
              index,
              selected: item.key === selected?.key,
            });
          }
          return (
            <OptionView
              option={item}
              selectKey={selected?.key}
              theme={theme}
              type={type}
              disabled={item?.disabled}
              rowStyle={rowStyle}
              rowSelectStyle={rowSelectStyle}
              onPress={_onChange}
            />
          );
        }}
      />
    );
  }, [
    _onChange,
    options,
    renderItem,
    rowSelectStyle,
    rowStyle,
    selected?.key,
    theme,
    type,
  ]);
  const triggerRef = useRef<View>(null);

  return (
    <>
      <TriggerView
        isOpen={isOpen}
        selected={selected}
        theme={theme}
        type={type}
        trigger={trigger}
        triggerStyle={triggerStyle}
        disabled={disabled}
        placeholderText={placeholderText}
        onPress={() => setIsOpen(true)}
        triggerRef={triggerRef}
      />
      {!isSheet ? (
        <PopOver
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          place={place || 'bottom-start'}
          contentStyle={[styles.popContent, { maxHeight: maxHeight || 180 }]}
          contentWidth={popWidth}
          bgColor={popBgColor || theme === 'dark' ? '#141430' : '#EEEEEE'}
          showArrow={false}
          offset={offset || 10}
          triggerRef={triggerRef}
        >
          {ContentView}
        </PopOver>
      ) : (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          backdropColor={'rgba(0,0,0,0.6)'}
          closeOnTouchBackdrop
          animationType={'fade'}
          title={modalTitle}
          overlayStyle={{ maxHeight: maxHeight || '90%' }}
        >
          {ContentView}
        </Modal>
      )}
    </>
  );
};
export default Select;
