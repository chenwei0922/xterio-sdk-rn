import { ScrollView, View } from 'react-native';
import { Margin } from './Common';
import { XScrollNumber } from '@xterio-sdk/rn-ui';

export default function Demo() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#141430' }}>
      <Margin gap={10} />
      <XScrollNumber
        number={'12'}
        itemStyle={{ height: 30, borderWidth: 1, borderColor: 'red' }}
      />
      <Margin gap={10} />

      <XScrollNumber
        number={'1249'}
        itemStyle={{
          height: 30,
          width: 30,
          borderWidth: 1,
          borderColor: 'red',
        }}
      />
      <Margin gap={10} />
      <XScrollNumber
        number={'23456'}
        itemStyle={{
          height: 30,
          width: 30,
          borderWidth: 1,
          borderColor: 'red',
        }}
        isSync={false}
      />
      <Margin gap={10} />
    </ScrollView>
  );
}
