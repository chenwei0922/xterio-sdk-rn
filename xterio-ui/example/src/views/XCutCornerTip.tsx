import { View } from 'react-native';
import { Margin } from './Common';
// import { XCutCornerTip } from 'src/components';
import { XCutCornerTip } from '@xterio-sdk/rn-ui';

export default function Demo() {
  return (
    <>
      <XCutCornerTip title="hello world" />
      <Margin />
      <XCutCornerTip
        title="hello world"
        theme={'xpink'}
        cornerDirection={'top-left'}
      />
      <Margin />
      <XCutCornerTip title="hello world" bgColor="red" textColor="white" />
      <Margin />
      <XCutCornerTip
        title="hello"
        textStyle={{ fontSize: 25 }}
        style={{ width: 100 }}
      />
      <Margin />
      <View className="flex-row items-center">
        <XCutCornerTip title="hello" textStyle={{ fontSize: 25 }} />
      </View>
      <Margin />
      <XCutCornerTip
        title="Woke up in the morning breeze, met the sun, there is a melting warmth brushing the heart, charming over the face, such as a piece of petal fragrance, gently kissed down last night's uncertainty. The words that have been written have long been drying out in the grassy riverbed, and there is no need to count the vivid words that are climbing on the wings of butterflies and flying in groups in your direction."
        cornerAxis={'y'}
        cornerDirection={'top-right'}
      />
      <Margin />
      <XCutCornerTip
        title="Woke up in the morning breeze, met the sun, there is a melting warmth brushing the heart, charming over the face, such as a piece of petal fragrance, gently kissed down last night's uncertainty. The words that have been written have long been drying out in the grassy riverbed, and there is no need to count the vivid words that are climbing on the wings of butterflies and flying in groups in your direction."
        cornerAxis={'y'}
        cornerDirection={'top-left'}
        // textClassName={'text-[30px] text-[red]'}
        // className={'p-[20px]'}
      />
    </>
  );
}
