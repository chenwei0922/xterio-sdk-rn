import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
  trigger: {},
  screen: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: 'transparent',
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
  },
  container: {
    position: 'absolute',
    zIndex: 1000,
    padding: 0,
    // backgroundColor: 'blue',
  },
  arrow: {},
  content: {
    zIndex: 9990,
    // height: 100,
    // width: 100,
  },
});

export default styles;
