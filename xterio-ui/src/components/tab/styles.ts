import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
  },
  item: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    // backgroundColor: 'red',
  },
  itemRound: {
    height: 40,
    marginRight: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fefefe66',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#fefefe1A',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: '#fefefe',
    width: 40,
  },
});

export default styles;
