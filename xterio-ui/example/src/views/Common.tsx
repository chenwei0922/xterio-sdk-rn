import { View } from 'react-native';

export const Margin = ({ gap = 4 }: { gap?: number }) => {
  return <View style={{ width: gap, height: gap }} />;
};
