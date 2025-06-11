import PopOver from '../pop-over';
import { IconInfo2 } from 'xterio-icons';
import type { ToolTipProps } from './types';
import { Text } from 'react-native';
import styles from './styles';

const ToolTip = (props: ToolTipProps) => {
  const {
    text = 'this is a tip',
    textStyle,
    children,
    trigger,
    contentStyle,
    ...rest
  } = props;

  return (
    <PopOver
      trigger={trigger ? trigger : <IconInfo2 color={'#fefefe66'} size={20} />}
      contentStyle={[styles.content, contentStyle]}
      {...rest}
    >
      {children ? (
        children
      ) : (
        <Text style={[styles.text, textStyle]}>{text}</Text>
      )}
    </PopOver>
  );
};

export default ToolTip;
