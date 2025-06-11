import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  trigger: {
    height: 40,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  triggerText: {
    fontSize: 14,
    fontWeight: 700,
    flex: 1,
  },
  triggerIcon: {
    width: 16,
    height: 16,
    marginLeft: 4,
  },
  row: {
    height: 40,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    fontWeight: 'bold',
    fontSize: 12,
    flex: 1,
  },
  rowSheet: {
    height: 64,
    padding: 0,
    paddingHorizontal: 16,
  },
  rowSheetText: {
    fontSize: 14,
  },
  popContent: {
    borderWidth: 2,
    borderColor: '#9598B933',
    padding: 12,
  },
});

export default styles;
