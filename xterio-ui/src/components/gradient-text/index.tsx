import { useLayoutEffect, useRef, useState } from 'react';

import type { GradientTextProp } from './types';
import {
  Text as RNText,
  type NativeSyntheticEvent,
  type TextLayoutEventData,
  type TextLayoutLine,
} from 'react-native';
import Svg, { Defs, Text, TSpan } from 'react-native-svg';
import styles from './styles';
import { LinearGradientsDef, useGetDireactPoints } from '../base/gradient';

const GradientText = (props: GradientTextProp) => {
  const {
    fontSize = 14,
    fontStyle,
    fontWeight,
    fontFamily,
    textAlign,
    numberOfLines,
    text,
    colors = ['#9EE6FC', '#EBB9E7'],
    direction = 'to right',
    children,
  } = props;

  const [show, setShow] = useState(true);
  const [initHeight, setInitHeight] = useState(0);
  const [initWidth, setInitWidth] = useState(0);
  const [lineData, setLineData] = useState<TextLayoutLine[]>([]);
  const [charSize, setCharSize] = useState(10);

  const _containerRef = useRef<RNText>(null);
  // ✅ sync layout effect during commit
  useLayoutEffect(() => {
    // ✅ sync call to read layout
    _containerRef.current?.measureInWindow((_x, _y, width, height) => {
      // console.log('x', x, y, width, height);
      setInitHeight(height);
      setInitWidth(width);
    });
  }, []);

  const points = useGetDireactPoints(direction);

  return (
    <>
      {show && (
        <RNText
          ref={_containerRef}
          style={[
            styles.text,
            {
              fontSize,
              textAlign,
              fontStyle,
              fontWeight,
              fontFamily,
            },
          ]}
          onTextLayout={(e: NativeSyntheticEvent<TextLayoutEventData>) => {
            const lines = e.nativeEvent.lines;
            let size = 10;
            if (lines.length && lines[0]) {
              const line = lines[0];
              size = line.width / line.text.length;
              setCharSize(size);
            }
            const tempLines = numberOfLines
              ? lines.slice(0, numberOfLines)
              : lines;
            setLineData(tempLines);
            setInitHeight(
              tempLines.reduce((sum, item) => {
                return sum + item.height;
              }, 0)
            );
            setShow(false);
            // console.log('>>>>lines', e.nativeEvent.lines, size);
          }}
          numberOfLines={numberOfLines}
        >
          {text || children}
        </RNText>
      )}
      <Svg width={initWidth} height={initHeight}>
        <Defs>
          <LinearGradientsDef
            id="myGradient"
            colors={colors}
            directionPoints={points}
          />
        </Defs>
        <Text
          fill={'url(#myGradient)'}
          stroke={'none'}
          x={0}
          y={fontSize}
          fontSize={fontSize}
          fontStyle={fontStyle}
          fontWeight={fontWeight}
          fontFamily={fontFamily}
        >
          {lineData.map((it, index) => {
            let txt = it.text;
            if (
              numberOfLines &&
              index === lineData.length - 1 &&
              txt.length * charSize > initWidth
            ) {
              let end = it.width / charSize;
              txt = it.text.slice(0, end);
              txt += '...';
            }

            return (
              <TSpan
                x={it.x}
                y={it.y + fontSize}
                fontStyle={fontStyle}
                fontWeight={fontWeight}
                fontSize={fontSize}
                key={index}
              >
                {txt}
              </TSpan>
            );
          })}
        </Text>
      </Svg>
    </>
  );
};
export default GradientText;
