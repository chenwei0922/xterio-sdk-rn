import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
  },
  lines: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 2,
  },
  pointBg: {
    width: 20,
    aspectRatio: 1,
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  point: {
    width: 8,
    aspectRatio: 1,
    borderRadius: '50%',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  textGap: {
    marginTop: 4,
  },
});

export default styles;

export const columnStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    width: '100%',
  },
  lines: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 60,
    // marginTop: 10,
    // backgroundColor: 'red',
  },
  line: {
    width: 2,
    flex: 1,
    // height: '100%',
  },
  textGap: {
    marginLeft: 4,
  },
});
