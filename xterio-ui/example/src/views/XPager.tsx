import { ScrollView } from 'react-native';
import { Margin } from './Common';
// import { XPager } from 'src/components';
import { XPager } from '@xterio-sdk/rn-ui';

export default function Demo() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#141430' }}>
      <Margin gap={10} />
      <XPager
        count={20}
        onPageChange={(p) => {
          console.log('the page number is:', p);
        }}
      />
      <Margin gap={10} />
      <XPager
        count={20}
        onPageChange={(p) => {
          console.log('the page number is:', p);
        }}
        textColor="red"
        selectTextColor="white"
        itemStyle={{ width: 24, height: 24 }}
        page={5}
      />
    </ScrollView>
  );
}
