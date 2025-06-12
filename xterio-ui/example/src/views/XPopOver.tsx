import { ScrollView, Text, View } from 'react-native';
import { Margin } from './Common';
import { useMemo, useRef, useState } from 'react';
import { IconChainXterioEth } from 'xterio-icons';
// import { XButton, XModal, XPopOver, XSelect, XToolTip } from 'src/components';
import {
  XButton,
  XModal,
  XPopOver,
  XSelect,
  XToolTip,
} from '@xterio-sdk/rn-ui';

export default function Demo() {
  const _triggerRef = useRef<View>(null);
  const [isOpen0, setIsOpen0] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const Data = useMemo(() => {
    return new Array(20).fill(0).map((_i, idx) => ({
      key: idx + 1,
      title: `title ${idx + 1}`,
      icon: <IconChainXterioEth size={20} />,
    }));
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#141430' }}>
      <Margin gap={10} />
      <XPopOver
        place={'bottom-start'}
        triggerStyle={{ width: 200 }}
        contentStyle={{ width: 300, height: 300 }}
        trigger={
          <View style={{ backgroundColor: 'blue', height: 50 }}>
            <Text className="text-[#fefefe]">This is popover trigger</Text>
          </View>
        }
        showArrow={true}
        offset={10}
        arrowSize={10}
      >
        <Text className="text-[#fefefe]">This is content</Text>
      </XPopOver>
      <Margin gap={10} />
      <XButton
        title="this is outside popover trigger"
        type={'white'}
        onPress={() => setIsOpen0(true)}
        innerRef={_triggerRef}
      />
      <XPopOver
        triggerRef={_triggerRef}
        isOpen={isOpen0}
        onClose={() => setIsOpen0(false)}
        contentStyle={{ width: 300, height: 300 }}
        place={'bottom'}
        showArrow={true}
        offset={10}
        bgColor="red"
      >
        <Text className="text-[#fefefe]">This is content</Text>
      </XPopOver>
      <Margin gap={10} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <XToolTip
          text={`Woke up in the morning breeze, met the sun, there is a melting warmth
          brushing the heart, charming over the face, such as a piece of petal
          fragrance, gently kissed down last night's uncertainty. The words that
          have been written have long been drying out in the grassy riverbed,
          and there is no need to count the vivid words that are climbing on the
          wings of butterflies and flying in groups in your direction.`}
          textStyle={{ color: 'red' }}
          triggerStyle={{ backgroundColor: 'blue' }}
        />
      </View>
      <Margin gap={10} />
      <XToolTip
        text={`Woke up`}
        bgColor="red"
        trigger={
          <Text className="text-[#ffffff]">This is tooptip custom button</Text>
        }
      />
      <Margin gap={10} />
      <XButton
        title="open modal"
        type={'white'}
        onPress={() => setIsOpen(true)}
      />
      <XModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        closeOnTouchBackdrop
        backdropColor={'rgba(0,0,0,0.6)'}
        overlayStyle={{ height: 300 }}
        animationType={'slide'}
        hideButtons
      />
      <Margin gap={10} />
      <XButton
        title="open modal 1"
        type={'white'}
        onPress={() => setIsOpen1(true)}
      />
      <XModal
        isOpen={isOpen1}
        onClose={() => setIsOpen1(false)}
        backdropColor={'rgba(0,0,0,0.6)'}
        title={'Dialog Title'}
        btnLoading
        hideButtons={false}
      >
        <Text className="font-xbold text-base uppercase text-xdarkblue text-center">
          Hello world
        </Text>
        <Text className="font-poppins font-xextralight text-sm leading-xsnug text-black/60 text-center">
          Woke up in the morning breeze, met the sun, there is a melting warmth
          brushing the heart, charming over the face, such as a piece of petal
          fragrance, gently kissed down last night's uncertainty. The words that
          have been written have long been drying out in the grassy riverbed,
          and there is no need to count the vivid words that are climbing on the
          wings of butterflies and flying in groups in your direction.
        </Text>
      </XModal>
      <Margin gap={10} />
      <XButton
        title="open modal 2"
        type={'white'}
        onPress={() => setIsOpen2(true)}
      />
      <XModal
        isOpen={isOpen2}
        onClose={() => setIsOpen2(false)}
        backdropColor={'rgba(0,0,0,0.6)'}
        title={'Dialog Title'}
        hideCancelButton
      >
        <Text className="mt-4 font-poppins font-xextralight text-sm leading-xsnug text-black/60 text-center">
          Woke up in the morning breeze, met the sun, there is a melting warmth
          brushing the heart, charming over the face, such as a piece of petal
          fragrance, gently kissed down last night's uncertainty. The words that
          have been written have long been drying out in the grassy riverbed,
          and there is no need to count the vivid words that are climbing on the
          wings of butterflies and flying in groups in your direction.
        </Text>
      </XModal>
      <Margin gap={10} />
      <XSelect
        options={Data}
        type={'actionsheet'}
        theme={'dark'}
        placeholderText="this is a actionsheet modal"
        modalTitle={'Select Option'}
      />
      <Margin gap={10} />
      <XSelect
        options={Data}
        type={'select'}
        theme={'dark'}
        placeholderText="this is a select"
      />
      <Margin gap={10} />
      <XSelect
        options={Data}
        type={'menu'}
        theme={'dark'}
        placeholderText="this is a menu"
      />
      <Margin gap={10} />

      <View style={{ backgroundColor: 'white', padding: 10 }}>
        <Margin gap={10} />
        <XSelect
          options={Data}
          type={'select'}
          theme={'light'}
          placeholderText="this is a select"
          place={'top'}
        />
        <Margin gap={10} />
        <XSelect
          options={Data}
          type={'menu'}
          theme={'light'}
          placeholderText="this is a menu"
          place={'top'}
        />
        <Margin gap={10} />
        <XSelect
          options={Data}
          type={'actionsheet'}
          theme={'light'}
          placeholderText="this is a actionsheet modal"
          modalTitle={'Select Option'}
          place={'top'}
        />

        <Margin gap={150} />
      </View>
    </ScrollView>
  );
}
