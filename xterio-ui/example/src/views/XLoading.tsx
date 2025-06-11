import { Text } from 'react-native';
// import { XLoading } from 'src/components';
import { XLoading } from '@xterio-sdk/rn-ui';

export default function XLoadingDemo() {
  return (
    <>
      <XLoading size={80} />
      <XLoading size={70} weight={10} />
      <XLoading size={60} weight={5} variant={'color'} withLogo />
      <XLoading withLogo />
      <XLoading logo={<Text>A</Text>} withLogo />
      <XLoading backColor="red" withLogo />
      <XLoading backColor="red" frontColor="yellow" logoColor="blue" withLogo />
    </>
  );
}
