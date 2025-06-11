import { Text, View, StyleSheet, FlatList, Button } from 'react-native';
import { useRef, useState } from 'react';
import '../global.css';
import * as Demos from './views';
const Data = Object.entries(Demos);

import { multiply } from '@xterio-sdk/rn-ui';
const result = multiply(3, 7);

export default function App() {
  const [show, setShow] = useState(false);
  const CompRef = useRef<any>(null);
  return (
    <>
      <FlatList
        ListHeaderComponent={() => <Text>multiply:{result}</Text>}
        contentContainerStyle={{ paddingVertical: 40 }}
        style={styles.container}
        data={Data}
        renderItem={({ item }) => {
          const [name, Comp] = item;
          return (
            <Text
              style={styles.row}
              onPress={() => {
                CompRef.current = Comp;
                setShow(true);
              }}
            >
              {name}
            </Text>
          );
        }}
      />
      {show && (
        <View style={styles.example}>
          <Button title="Go Back" onPress={() => setShow(false)} />
          {<CompRef.current />}
        </View>
      )}
      {/* <View style={styles.example}>
        <Button title="Go Back" onPress={() => setShow(false)} />
        <View style={{ flex: 1 }}>
          <Demos.XLoadingDemo />
        </View>
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    height: 60,
    lineHeight: 60,
    fontSize: 20,
    color: 'dark',
    marginHorizontal: 20,
    borderBottomColor: '#fefefe',
    borderBottomWidth: 1,
  },
  example: {
    flex: 1,
    backgroundColor: 'rgb(51, 51, 51)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    paddingTop: 80,
  },
  back: {
    height: 60,
  },
});
