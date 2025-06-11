import { ScrollView, View } from 'react-native';
import { Margin } from './Common';
// import { XCheckbox } from 'src/components';
import { XCheckbox } from '@xterio-sdk/rn-ui';

export default function Demo() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#141430' }}>
      <View className="p-4 h-full flex-row items-center bg-[#fefefe]">
        <XCheckbox
          activeColor={'#7DD5F9'}
          color="#9598B9"
          iconColor="#0a1161"
          size={40}
        />
        <Margin gap={10} />
        <XCheckbox />
        <Margin gap={10} />
        <XCheckbox size={40} value={true} />
        <Margin gap={10} />
        <XCheckbox
          color="red"
          activeColor="yellow"
          iconColor="blue"
          size={40}
        />
        <Margin gap={10} />
      </View>
      <Margin gap={10} />
    </ScrollView>
  );
}
