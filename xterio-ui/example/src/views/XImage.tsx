import { ScrollView, View } from 'react-native';
import { Margin } from './Common';
// import { XImage } from 'src/components';
import { XImage } from '@xterio-sdk/rn-ui';

export default function Demo() {
  return (
    <ScrollView>
      <XImage
        source={'https://picsum.photos/seed/696/3000/2000'}
        style={{ width: '100%', aspectRatio: 1.5 }}
      />
      <Margin />
      <View className="flex-row items-center">
        <XImage
          source={require('../assets/example.jpg')}
          style={{ width: 80, height: 80 }}
        />
        <Margin />
        <XImage
          source={{ uri: 'https://picsum.photos/seed/696/3000/2000' }}
          style={{ width: 80, height: 80 }}
          contentPosition={'bottom center'}
        />
        <Margin />
        <XImage
          source={'https://picsum.photos/seed/696/3000/2000'}
          style={{ width: 80, height: 80 }}
          blurRadius={20}
        />
        <Margin />
        <XImage
          source={'https://picsum.photos/seed/696/3000/2000'}
          style={{ width: 80, height: 80 }}
          placeholder={require('../assets/logo.svg')}
        />
      </View>
      <Margin />
      <XImage
        source={'https://picsum.photos/seed/696/3000/2000'}
        width={150}
        height={150}
      />
      <Margin />
      <View className="flex-row items-center">
        <XImage
          source={'https://picsum.photos/seed/696/3000/2000'}
          height={100}
        />
        <Margin />
        <XImage
          source={'https://picsum.photos/seed/696/3000/2000'}
          width={100}
        />
      </View>
    </ScrollView>
  );
}
