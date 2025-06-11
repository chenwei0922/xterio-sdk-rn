import { ScrollView, Text, View } from 'react-native';
import { Margin } from './Common';
// import { XGradientCard, XGradientText } from 'src/components';
import { XGradientCard, XGradientText } from '@xterio-sdk/rn-ui';

export default function Demo() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#141430' }}>
      <View style={{ paddingHorizontal: 16 }}>
        <Margin />
        <XGradientText>hello world</XGradientText>
        <Margin />
        <XGradientText colors={['red', 'blue', 'yellow']}>
          HELLO WORLD
        </XGradientText>
        <Margin />
        <XGradientText colors={['red', 'blue']} direction={'to bottom'}>
          HELLO WORLD
        </XGradientText>
        <Margin />
        <XGradientText>
          Woke up in the morning breeze, met the sun, there is a melting warmth
          brushing the heart, charming over the face, such as a piece of petal
          fragrance, gently kissed down last night's uncertainty. The words that
          have been written have long been drying out in the grassy riverbed,
          and there is no need to count the vivid words that are climbing on the
          wings of butterflies and flying in groups in your direction.
        </XGradientText>
        <Margin />
        <Margin />
        <XGradientText numberOfLines={3}>
          Woke up in the morning breeze, met the sun, there is a melting warmth
          brushing the heart, charming over the face, such as a piece of petal
          fragrance, gently kissed down last night's uncertainty. The words that
          have been written have long been drying out in the grassy riverbed,
          and there is no need to count the vivid words that are climbing on the
          wings of butterflies and flying in groups in your direction.
        </XGradientText>
        <Margin />
        <Margin />
        <XGradientText numberOfLines={1}>
          Woke up in the morning breeze, met the sun, there is a melting warmth
          brushing the heart, charming over the face, such as a piece of petal
          fragrance, gently kissed down last night's uncertainty. The words that
          have been written have long been drying out in the grassy riverbed,
          and there is no need to count the vivid words that are climbing on the
          wings of butterflies and flying in groups in your direction.
        </XGradientText>
        <Margin />
        <XGradientText fontSize={20} textAlign={'center'}>
          HELLO WORLD
        </XGradientText>
        <Margin gap={10} />
        <View style={{ position: 'relative' }}>
          <XGradientCard absolute />
          <Text className="text-white">hello world</Text>
          <Text className="text-white">hello world</Text>
          <Text className="text-white">hello world</Text>
        </View>
        <Margin gap={10} />
        <XGradientCard style={{ width: '100%', height: 80 }}>
          <Text className="text-white">hello world</Text>
          <Text className="text-white">hello world</Text>
        </XGradientCard>
        <Margin gap={10} />
        <XGradientCard
          style={{ width: '100%', height: 100 }}
          colors={['red', 'blue']}
          direction={'to right'}
          strokeWidth={5}
          corner={{ x: 20, y: 40 }}
          cornerDirection={'bottom-right'}
          radius={5}
          backgroundColors={['red', 'cyan']}
          backgroundDirection={'to bottom'}
        />
        <Margin gap={10} />
        <XGradientCard
          style={{ width: '100%', height: 100 }}
          colors={['red', 'blue']}
          direction={'to right'}
          strokeWidth={5}
          corner={{ x: 20, y: 40 }}
          cornerDirection={['top-left', 'bottom-right']}
          radius={5}
          fill={'yellow'}
        />
        <Margin gap={10} />
        <XGradientCard
          style={{ width: '100%', height: 100 }}
          background
          colors={['red', 'blue']}
          direction={'to right'}
          strokeWidth={5}
          corner={{ x: 20, y: 40 }}
          cornerDirection={['top-left', 'bottom-right']}
          radius={5}
          stroke={'yellow'}
        />
        <Margin gap={10} />
        <XGradientCard
          style={{ width: '100%', height: 100 }}
          corner={{ x: 20, y: 40 }}
          cornerDirection={['top-left', 'bottom-right']}
          radius={25}
          img={'https://picsum.photos/seed/696/3000/2000'}
        />
      </View>
      <Margin />
    </ScrollView>
  );
}
