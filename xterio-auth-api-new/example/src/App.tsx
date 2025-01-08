import { Text, View, StyleSheet } from 'react-native';
import { multiply, test } from '@xterio-sdk/rn-auth';

console.log('test=', test, test?.(10, 10));
const result = multiply(3, 7);

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
