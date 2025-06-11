import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  multiContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 150,
    // backgroundColor: 'yellow',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  label: {
    position: 'absolute',
  },
  input: {
    padding: 0,
    height: '100%',
    borderWidth: 0,
    fontSize: 14,
    // backgroundColor: 'blue',
  },
  icon: {
    alignSelf: 'center',
  },
  errorMsg: {
    color: '#F53F3F',
    fontSize: 12,
  },
});

export default styles;

export const stylesCounter = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 48,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderColor: '#9598B9',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
  },
  inputContainer: {
    height: '100%',
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  inputText: {
    textAlign: 'center',
  },
});

export const stylesRange = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  inputContainer: {
    height: '100%',
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  inputText: {
    textAlign: 'center',
  },
  gap: {
    backgroundColor: '#FEFEFE33',
    width: 8,
    height: 2,
    marginHorizontal: 16,
  },
});
