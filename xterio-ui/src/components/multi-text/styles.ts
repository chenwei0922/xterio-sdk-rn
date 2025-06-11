import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {},
  moreHover: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  moreBottom: {
    backgroundColor: '#FEFEFE1A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
    paddingHorizontal: 16,
    borderRadius: 28,
    marginTop: 16,
  },
  arrow: {
    marginLeft: 7,
  },
  rotate: {
    transform: [{ rotate: '180deg' }],
  },
});

export default styles;
