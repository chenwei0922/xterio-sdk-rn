import { useMemo } from 'react';
import { LinearGradient, Stop } from 'react-native-svg';

export const LinearGradientsDef = ({
  directionPoints,
  colors,
  id,
}: {
  id: string;
  colors: string[];
  directionPoints: Array<Array<number | string>>;
}) => {
  const gap = 1 / (colors.length - 1);
  return (
    <LinearGradient
      id={id}
      x1={directionPoints?.[0]?.[0]}
      y1={directionPoints?.[0]?.[1]}
      x2={directionPoints?.[1]?.[0]}
      y2={directionPoints?.[1]?.[1]}
    >
      {colors.map((item, index) => {
        //#141430 50% / rgba(12, 23, 25) 50%

        let color = item;
        let offset: string | number = index * gap;
        let temp;
        if (item.includes('rgb')) {
          temp = item.split(/\)\s+/);
        } else {
          temp = item.split(' ');
        }
        if (temp?.[1]) {
          offset = temp?.[1];
          color = temp?.[0] || '';
        }
        return <Stop key={index} stopColor={color} offset={offset} />;
      })}
    </LinearGradient>
  );
};

export type GradientDirectionType =
  | 'to right'
  | 'to left'
  | 'to bottom'
  | 'to top'
  | 'to bottom right';

export const useGetDireactPoints = (direction: string) => {
  const directionPoints = useMemo(() => {
    let temP: Array<Array<number | string>> = [];
    switch (direction) {
      case 'to right':
        temP = [
          [0, 0],
          ['100%', 0],
        ];
        break;
      case 'to left':
        temP = [
          ['100%', 0],
          [0, 0],
        ];
        break;
      case 'to top':
        temP = [
          [0, '100%'],
          [0, 0],
        ];
        break;
      case 'to bottom':
        temP = [
          [0, 0],
          [0, '100%'],
        ];
        break;
      case 'to bottom right':
        temP = [
          [0, 0],
          ['100%', '100%'],
        ];
        break;
      default:
        temP = [
          [0, 0],
          [0, 0],
        ];
    }
    return temP;
  }, [direction]);
  return directionPoints;
};
