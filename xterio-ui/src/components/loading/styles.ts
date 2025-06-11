import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: '100%',
  },
  loadingColor: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default styles;
