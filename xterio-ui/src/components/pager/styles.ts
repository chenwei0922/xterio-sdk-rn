import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  item: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  num: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default styles;
