import { ScrollView, Text, View } from 'react-native';
import { Margin } from './Common';
import { IconMessage } from 'xterio-icons';
// import { XTab } from 'src/components';
import { XTab } from '@xterio-sdk/rn-ui';

export default function Demo() {
  const data = [
    { title: 'title', key: 1, desp: '' },
    { title: 'age of dino', key: 2, desp: '' },
    { title: 'palio', key: 3, desp: '' },
  ];
  const data1 = [...data, ...data, ...data].map((i, idx) => {
    i.key = idx;
    return i;
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#141430' }}>
      <Margin gap={10} />
      <XTab data={data} index={1} onTabChange={(_item, _idnex) => {}} />
      <Margin gap={10} />
      <XTab data={data} index={1} indicatorWidth={30} />
      <Margin gap={10} />
      <XTab data={data} index={1} hideBgIndicator />
      <Margin gap={10} />
      <XTab data={data1} index={1} />
      <Margin gap={10} />
      <XTab
        data={data1}
        index={5}
        showIndicator={true}
        labelStyle={{ color: 'red' }}
        activeLabelStyle={{ color: 'blue' }}
        indicatorStyle={{ backgroundColor: 'red' }}
        activeIndicatorStyle={{ backgroundColor: 'blue' }}
      />
      <Margin gap={10} />
      <XTab theme="rounded" data={data} index={1} indicatorWidth={30} />
      <Margin gap={10} />
      <XTab
        data={data}
        index={1}
        renderItem={({ item }) => {
          return (
            <View className="flex-row items-center">
              <IconMessage size={20} color="white" />
              <Text className="text-[white]">{item.title}</Text>
            </View>
          );
        }}
        itemStyle={{
          marginRight: 0,
          paddingHorizontal: 8,
        }}
      />
      <Margin gap={10} />
    </ScrollView>
  );
}
