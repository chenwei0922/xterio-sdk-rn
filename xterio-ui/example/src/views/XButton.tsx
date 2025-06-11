import { ScrollView, Text, View } from 'react-native';
import { Margin } from './Common';
import { IconLogo } from 'xterio-icons';
import { useCallback } from 'react';
import { XButton } from '@xterio-sdk/rn-ui';
// import { XButton } from '../components';

export default function Demo() {
  const _onPress = useCallback(() => {
    console.log('111');
  }, []);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#141430' }}>
      <View style={{ paddingHorizontal: 16 }}>
        <Margin />
        <XButton
          title="submit"
          titleStyle={{ color: 'red' }}
          onPress={_onPress}
        />
        <Margin gap={10} />
        <XButton title="confirm" type={'confirm'} onPress={_onPress} />
        <Margin gap={10} />
        <XButton title="cancel" type={'cancel'} />
        <Margin gap={10} />
        <XButton title="white" type={'white'} />
        <Margin gap={10} />
        <XButton title="Click" type={'gradient'} />
        <Margin />
        <XButton title="Click" type={'gradient-bg'} />
        <Margin />
        <XButton title="Click" type={'pink'} />
        <Margin />
        <XButton
          title="Click"
          type={'pink'}
          size={'large'}
          disabled
          loading
          loadingSize={25}
          loadingWeight={6}
          loadingVariant={'cyan'}
        />
        <Margin />
        <XButton
          title="Click"
          type={'pink'}
          size={'large'}
          disabled
          icon={<IconLogo />}
          iconAlign={'right'}
        />
        <Margin />
        <XButton
          title="Click"
          type={'pink'}
          style={{ flexDirection: 'row', borderRadius: 0 }}
        >
          <Text>hhh</Text>
        </XButton>
      </View>
    </ScrollView>
  );
}
