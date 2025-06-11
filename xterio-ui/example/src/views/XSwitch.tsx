import { ScrollView } from 'react-native';
import { Margin } from './Common';
import { useState } from 'react';
// import { XSwitch } from 'src/components';
import { XSwitch } from '@xterio-sdk/rn-ui';

export default function Demo() {
  const [isActive, setIsActive] = useState(false);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#141430' }}>
      <Margin gap={10} />
      <XSwitch />
      <Margin gap={10} />
      <XSwitch value={isActive} onChange={(p) => setIsActive(p)} />
      <Margin gap={10} />
      <XSwitch disabled />
      <Margin gap={10} />
      <XSwitch value={true} disabled />
      <Margin gap={10} />
      <XSwitch
        color="red"
        activeColor="orange"
        style={{ width: 90, height: 40 }}
        padding={5}
      />
      <Margin gap={10} />
    </ScrollView>
  );
}
