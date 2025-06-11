import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  constainer: {
    justifyContent: 'flex-end',
  },
  overlay: {
    width: '100%',
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 16,
    backgroundColor: '#fefefe',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(149,152,185,0.1)',
    height: 48,
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    color: '#0a1161',
  },
  close: {
    height: 48,
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 32,
  },
  button: {
    width: 140,
    borderRadius: 0,
  },
  buttonText: {
    fontWeight: 700,
  },
  confirm: {
    marginLeft: 16,
  },
});

export default styles;
