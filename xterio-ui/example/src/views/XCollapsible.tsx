import { ScrollView, Text, View } from 'react-native';
import { Margin } from './Common';
// import { XCollapsible, XCollapsibleGroup } from 'src/components';
import { XCollapsible, XCollapsibleGroup } from '@xterio-sdk/rn-ui';

export default function Demo() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#141430' }}>
      <Margin gap={10} />
      <XCollapsible
        title="Title 1"
        contentStyle={{ paddingVertical: 30, backgroundColor: '#fefefe' }}
      />
      <XCollapsible
        title="Title 2"
        contentStyle={{ paddingVertical: 30, backgroundColor: '#fefefe' }}
      >
        <Text>hello world</Text>
      </XCollapsible>
      <XCollapsible
        title="Title 2"
        contentStyle={{ paddingVertical: 30, backgroundColor: '#fefefe' }}
      >
        <Text>hello world</Text>
      </XCollapsible>
      <Margin gap={20} />
      <View>
        <XCollapsibleGroup unique>
          <XCollapsible
            title="Title 1"
            contentStyle={{ paddingVertical: 30, backgroundColor: '#fefefe' }}
          >
            <Text>hello world</Text>
          </XCollapsible>
          <XCollapsible
            title="Title 2"
            contentStyle={{ paddingVertical: 30, backgroundColor: '#fefefe' }}
          >
            <Text>hello world</Text>
          </XCollapsible>
          <XCollapsible
            title="Title 2"
            contentStyle={{ paddingVertical: 30, backgroundColor: '#fefefe' }}
          >
            <Text>hello world</Text>
          </XCollapsible>
        </XCollapsibleGroup>
      </View>
    </ScrollView>
  );
}
