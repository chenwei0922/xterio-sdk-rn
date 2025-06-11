import { ScrollView, Text, View } from 'react-native';
import { Margin } from './Common';
// import { XInput, XInputCounter, XInputRange } from 'src/components';
import { XInput, XInputCounter, XInputRange } from '@xterio-sdk/rn-ui';

export default function XLoadingDemo() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#141430' }}>
      <View style={{ paddingHorizontal: 16 }}>
        <Margin />
        <XInput placeholder={'placeholder'} />
        <Margin />
        <XInput value="hello world" showPassword showClear />
        <Margin />
        <XInput label="Email" />
        <Margin />
        <XInput label="Email" containerStyle={{ height: 48 }} />
        <Margin />
        <XInput label="Email" value="hello world" errorMsg="this is error" />
        <Margin />
        <XInput value="hello world" />
        <Margin />
        <XInput readOnly value="hello world" />
        <Margin />
        <XInput
          value="hello world"
          prefixComp={
            <Text style={{ alignSelf: 'center', color: 'white' }}>http://</Text>
          }
          suffixComp={
            <Text style={{ alignSelf: 'center', color: 'white' }}>COM</Text>
          }
        />
        <Margin />
        <XInput multiline />
        <Margin />
        <XInputCounter value={20} inputTextStyle={{ fontSize: 20 }} />
        <Margin />
        <XInputCounter min={1} max={10} inputTextStyle={{ fontSize: 20 }} />
        <Margin />
        <XInputRange
          values={[1.5, 2.5]}
          onChange={(p) => {
            console.log('input range:', p);
          }}
        />
        <Margin />
        <XInputRange
          min={1}
          max={100}
          onChange={(p) => {
            console.log('input range:', p);
          }}
        />
      </View>
      <Margin />
      <View style={{ backgroundColor: 'white', paddingHorizontal: 16 }}>
        <Margin />
        <XInput theme={'dark'} placeholder={'placeholder'} />
        <Margin />
        <XInput theme={'dark'} value="hello world" showPassword showClear />
        <Margin />
        <XInput theme={'dark'} label="Email" />
        <Margin />
        <XInput theme={'dark'} label="Email" containerStyle={{ height: 48 }} />
        <Margin />
        <XInput
          theme={'dark'}
          label="Email"
          value="hello world"
          errorMsg="this is error"
        />
        <Margin />
        <XInput theme={'dark'} value="hello world" />
        <Margin />
        <XInput theme={'dark'} readOnly value="hello world" />
        <Margin />
        <XInput
          theme={'dark'}
          value="hello world"
          prefixComp={<Text style={{ alignSelf: 'center' }}>http://</Text>}
          suffixComp={<Text style={{ alignSelf: 'center' }}>COM</Text>}
        />
        <Margin />
        <XInput theme={'dark'} multiline />
        <Margin />
        <XInputCounter
          theme={'dark'}
          min={1}
          max={10}
          inputTextStyle={{ fontSize: 20 }}
        />
        <Margin />
        <XInputRange
          theme={'dark'}
          values={[1.5, 2.5]}
          onChange={(p) => {
            console.log('input range:', p);
          }}
        />
        <Margin />
        <XInputRange
          theme={'dark'}
          min={1}
          max={100}
          onChange={(p) => {
            console.log('input range:', p);
          }}
        />
      </View>
      <Margin />
    </ScrollView>
  );
}
