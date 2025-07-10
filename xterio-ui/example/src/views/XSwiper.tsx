import { Button, Dimensions, Image, ImageBackground, ScrollView, Text, View } from 'react-native';
import { Margin } from './Common';
import { XSwiper } from '@xterio-sdk/rn-ui';
import { useEffect, useMemo, useRef, useState } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
const colors = ['red', 'green', 'orange'];

const { width, height } = Dimensions.get('window');

const data1 = [
  'https://www.datocms-assets.com/74531/1750835118-20250625-150038.jpeg?w=2100&q=80',
  'https://www.datocms-assets.com/74531/1745338467-20250423-001117.jpeg?w=2100&q=80',
  'https://www.datocms-assets.com/74531/1744987593-20250418-224533.jpeg?w=2100&q=80',
  'https://www.datocms-assets.com/74531/1724852827-aod.jpg?w=2100&q=80',
  'https://www.datocms-assets.com/74531/1744728764-20250415-225116.jpeg?w=2100&q=80',
];

const ItemView = ({
  item,
  index,
  rIndex,
  selectIndex,
  w,
  h,
  isCenter,
  isScale
}: {
  item?: string;
  index: number;
  rIndex: number;
  selectIndex: number;
  w: number;
  h: number;
  isCenter?: boolean;
  isScale?: boolean
}) => {
  const selected = rIndex === (isCenter ? selectIndex + 1 : selectIndex);

  const scale = isScale ? 1.6 : 1;

  const _scale = useSharedValue(1);
  const animateStyle = useAnimatedStyle(() => ({
    transform: [{ scale: _scale.value }],
  }));
  
  useEffect(() => {
    if(!isScale) return
    if (selected) {
      _scale.value = withTiming(1.6, { duration: 250, easing: Easing.linear });
    }else{
      _scale.value = withTiming(1, { duration: 250, easing: Easing.linear });
    }
  }, [selected]);


  return (
    <Animated.View
      key={rIndex}
      style={[
        {
          width: w,
          height: h,
          alignItems: 'center',
          justifyContent: 'center',
        },
        animateStyle,
        isScale && selected ? { zIndex: 2000 } : { zIndex: 1000 },
        isScale ? { marginVertical: (w * scale - w) / 2 } : {},
        { borderWidth: 1, borderColor: 'white' },
        selected && { borderColor: 'red' },
      ]}
    >
      <ImageBackground
        source={{ uri: item }}
        style={[
          {
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          },
          isScale ? { borderRadius: w, overflow: 'hidden' } : {},
        ]}
      >
        <Text className="text-[red] text-xl">
          {index}-{rIndex}
        </Text>
      </ImageBackground>
    </Animated.View>
  );
};
const Test = ({
  isCenter,
  isScale = false,
  onSelect,
  loop = true,
  pagingEnabled = false,
  autoPlay,
  column=3,
}: {
  isScale?: boolean;
  isCenter?: boolean;
  onSelect?(i: number): void;
  loop?: boolean;
  pagingEnabled?: boolean;
  autoPlay?: boolean;
  column?: number;
}) => {
  const [selectIndex, setIndex] = useState(0);

  const w = width / column;
  const h = w;
  const scale = isScale ? 1.6 : 1;

  useEffect(() => {
    onSelect?.(isCenter ? selectIndex + 1 : selectIndex);
  }, []);

  return (
    <View className="">
      <XSwiper
        data={data1}
        index={0}
        onIndexChange={(i) => setIndex(i)}
        style={[{ flex: 1, backgroundColor: 'blue' }]}
        pagingEnabled={pagingEnabled}
        loop={loop}
        column={column}
        scrollWidth={w}
        autoPlay={autoPlay}
      
        renderItem={({ item, index, rIndex }) => {
          return (
            <ItemView
              item={item}
              index={index}
              rIndex={rIndex}
              selectIndex={selectIndex}
              w={w}
              h={h}
              isCenter={isCenter}
              isScale={isScale}
            />
          );
          
        }}
      />
    </View>
  );
};
export default function Demo() {
  const [selectIndex, setIndex] = useState(1);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#141430' }}>
      <Margin gap={10} />
      <XSwiper
        data={[1, 1, 1]}
        style={{ height: 200, backgroundColor: 'cyan' }}
        index={selectIndex}
        renderItem={({ item, index = 0 }) => {
          return (
            <View
              style={[
                {
                  width: width - 40,
                  marginHorizontal: 20,
                  backgroundColor: colors[index % 3],
                },
              ]}
            >
              <Text style={{ fontSize: 18, color: '#333333' }}>
                第{index}行
              </Text>
            </View>
          );
        }}
        onIndexChange={(i) => {
          // console.log('selec', i);
          setIndex(i);
        }}
      />
      <Margin gap={10} />
      <Test autoPlay column={1} />
      <Margin gap={10} />
      <Test isCenter isScale={true} autoPlay />
      <Margin gap={10} />
      <Test autoPlay />
      <Margin gap={10} />
      <Test autoPlay pagingEnabled />
      <Margin gap={20} />
    </ScrollView>
  );
}
