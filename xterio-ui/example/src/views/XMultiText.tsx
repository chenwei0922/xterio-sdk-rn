import { ScrollView, Text, View } from 'react-native';
import { Margin } from './Common';
// import { XMultiText } from 'src/components';
import { XMultiText } from '@xterio-sdk/rn-ui';

export default function Demo() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#141430' }}>
      <View style={{ paddingHorizontal: 16 }}>
        <Margin gap={8} />
        <XMultiText numberOfLines={3}>
          Woke up in the morning breeze, met the sun, there is a melting warmth
          brushing the heart, charming over the face, such as a piece of petal
          fragrance, gently kissed down last night's uncertainty. The words that
          have been written have long been drying out in the grassy riverbed,
          and there is no need to count the vivid words that are climbing on the
          wings of butterflies and flying in groups in your direction.
        </XMultiText>
        <Margin gap={8} />
        <XMultiText numberOfLines={3} variant={'bottom'}>
          Woke up in the morning breeze, met the sun, there is a melting warmth
          brushing the heart, charming over the face, such as a piece of petal
          fragrance, gently kissed down last night's uncertainty. The words that
          have been written have long been drying out in the grassy riverbed,
          and there is no need to count the vivid words that are climbing on the
          wings of butterflies and flying in groups in your direction.
        </XMultiText>
        <Margin gap={8} />
        <XMultiText
          numberOfLines={3}
          textColor={'red'}
          moreTextColor={'red'}
          moreBgColors={['yellow', 'orange']}
          moreTitle={'展开'}
          lessTitle={'收起'}
        >
          Woke up in the morning breeze, met the sun, there is a melting warmth
          brushing the heart, charming over the face, such as a piece of petal
          fragrance, gently kissed down last night's uncertainty. The words that
          have been written have long been drying out in the grassy riverbed,
          and there is no need to count the vivid words that are climbing on the
          wings of butterflies and flying in groups in your direction.
        </XMultiText>
        <Margin gap={8} />
        <XMultiText
          numberOfLines={3}
          renderMore={(p) => (
            <Text className="text-[yellow]">{p ? '查看更多' : '收起'}</Text>
          )}
        >
          Woke up in the morning breeze, met the sun, there is a melting warmth
          brushing the heart, charming over the face, such as a piece of petal
          fragrance, gently kissed down last night's uncertainty. The words that
          have been written have long been drying out in the grassy riverbed,
          and there is no need to count the vivid words that are climbing on the
          wings of butterflies and flying in groups in your direction.
        </XMultiText>
      </View>
    </ScrollView>
  );
}
