import { ScrollView, View } from 'react-native';
import { Margin } from './Common';
// import { XStepProgress } from 'src/components';
import { XStepProgress } from '@xterio-sdk/rn-ui';

export default function Demo() {
  const data = [{ name: 'Title 1' }, { name: 'Title 2' }, { name: 'Title 3' }];
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#141430' }}>
      <Margin gap={10} />
      <XStepProgress data={data} current={1} textAlign={'left'} />
      <Margin gap={10} />
      <XStepProgress data={data} current={1} textAlign={'right'} />
      <Margin gap={10} />
      <XStepProgress data={data} current={1} textAlign={'center'} />
      <Margin gap={10} />
      <XStepProgress data={data} current={0} textAlign={'center'} />
      <Margin gap={10} />
      <XStepProgress data={data} current={2} textAlign={'center'} />
      <Margin gap={10} />
      <XStepProgress
        data={data}
        current={2}
        textAlign={'center'}
        color="red"
        selectColor="yellow"
      />
      <Margin gap={10} />
      <XStepProgress
        data={data}
        current={1}
        textAlign={'center'}
        type="progress"
        color="red"
        selectColor="yellow"
      />
      <Margin gap={40} />
      <View className="flex-row w-full">
        <Margin gap={10} />
        <XStepProgress
          direction={'column'}
          data={data}
          current={1}
          textAlign={'left'}
        />
        <Margin gap={10} />
        <XStepProgress
          direction={'column'}
          data={data}
          current={1}
          textAlign={'right'}
        />
        <Margin gap={10} />
        <XStepProgress
          direction={'column'}
          data={data}
          current={1}
          textAlign={'center'}
        />
        <Margin gap={10} />
      </View>
      <View className="flex-row w-full">
        <XStepProgress
          direction={'column'}
          data={data}
          current={0}
          textAlign={'center'}
        />
        <Margin gap={10} />
        <XStepProgress
          direction={'column'}
          data={data}
          current={2}
          textAlign={'center'}
        />
        <Margin gap={10} />
        <XStepProgress
          direction={'column'}
          data={data}
          current={2}
          textAlign={'center'}
          color="red"
          selectColor="yellow"
        />
        <Margin gap={10} />
        <XStepProgress
          direction={'column'}
          data={data}
          current={1}
          textAlign={'center'}
          type="progress"
          color="red"
          selectColor="yellow"
        />
      </View>
      <Margin gap={10} />
      <XStepProgress
        direction={'column'}
        data={data}
        current={1}
        textAlign={'center'}
        lineSize={100}
        pointSize={40}
      />
    </ScrollView>
  );
}
