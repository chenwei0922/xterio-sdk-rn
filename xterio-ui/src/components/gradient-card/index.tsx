import Svg, {
  Defs,
  Path,
  Pattern,
  Polygon,
  Rect,
  Image as SImg,
} from 'react-native-svg';
import type { GradientCardProps } from './types';
import { StyleSheet, View } from 'react-native';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { LinearGradientsDef, useGetDireactPoints } from '../base/gradient';

let seed = 1;
const GradientCard = (props: GradientCardProps) => {
  const {
    style,
    fill = 'none',
    stroke = 'none',
    strokeWidth = 2,
    radius = 0,
    corner = 0,
    cornerDirection = 'bottom-right',
    colors = ['#9EE6FC', '#EBB9E7'],
    direction = 'to right',
    background,
    backgroundColors = [],
    backgroundDirection = 'to left',
    img,
    absolute,
    children,
  } = props;

  const [initWidth, setInitWidth] = useState(0);
  const [initHeight, setInitHeight] = useState(0);

  const xCorner = useMemo(() => {
    return typeof corner === 'number' ? corner : corner.x;
  }, [corner]);
  const yCorner = useMemo(() => {
    return typeof corner === 'number' ? corner : corner.y;
  }, [corner]);

  const rectPoints = useMemo(() => {
    //SVG的stroke是根据坐标点作为线宽的中间点来进行绘制的
    const gap = strokeWidth / 2;
    const p1 = [0 + gap, 0 + gap];
    const p2 = [initWidth - gap, 0 + gap];
    const p3 = [initWidth - gap, initHeight - gap];
    const p4 = [0 + gap, initHeight - gap];
    return [p1, p2, p3, p4];
  }, [initHeight, initWidth, strokeWidth]);

  const isCornerTopLeft = useMemo(() => {
    return Array.isArray(cornerDirection)
      ? cornerDirection.includes('top-left')
      : cornerDirection === 'top-left';
  }, [cornerDirection]);
  const isCornerTopRight = useMemo(() => {
    return Array.isArray(cornerDirection)
      ? cornerDirection.includes('top-right')
      : cornerDirection === 'top-right';
  }, [cornerDirection]);
  const isCornerBottomLeft = useMemo(() => {
    return Array.isArray(cornerDirection)
      ? cornerDirection.includes('bottom-left')
      : cornerDirection === 'bottom-left';
  }, [cornerDirection]);
  const isCornerBottomRight = useMemo(() => {
    return Array.isArray(cornerDirection)
      ? cornerDirection.includes('bottom-right')
      : cornerDirection === 'bottom-right';
  }, [cornerDirection]);

  const points = useMemo(() => {
    const result: number[] = [];
    rectPoints.map((point: number[], index: number) => {
      const [x = 0, y = 0] = point;
      if (index === 0 && isCornerTopLeft) {
        result.push(x, y + yCorner, x + xCorner, y);
      } else if (index === 1 && isCornerTopRight) {
        result.push(x - xCorner, y, x, y + yCorner);
      } else if (index === 2 && isCornerBottomRight) {
        result.push(x, y - yCorner, x - xCorner, y);
      } else if (index === 3 && isCornerBottomLeft) {
        result.push(x + xCorner, y, x, y - yCorner);
      } else {
        result.push(x, y);
      }
    });
    return result.join(' ');
  }, [
    rectPoints,
    isCornerTopLeft,
    isCornerTopRight,
    isCornerBottomRight,
    isCornerBottomLeft,
    yCorner,
    xCorner,
  ]);

  const d = useMemo(() => {
    let result: string = '';
    rectPoints.forEach((point: number[], index: number) => {
      const [x = 0, y = 0] = point;
      if (index === 0) {
        result += 'M';
        if (isCornerTopLeft) {
          result += `${x} ${y + yCorner} L ${x + xCorner} ${y}`;
        } else {
          result += `${x} ${y + radius} A ${radius} ${radius} 0 0 1 ${x + radius} ${y}`;
        }
      } else if (index === 1) {
        if (isCornerTopRight) {
          result += `L ${x - xCorner} ${y} L ${x} ${y + yCorner}`;
        } else {
          result += `L ${x - radius} ${y} A ${radius} ${radius} 0 0 1 ${x} ${y + radius}`;
        }
      } else if (index === 2) {
        if (isCornerBottomRight) {
          result += `L ${x} ${y - yCorner} L ${x - xCorner} ${y}`;
        } else {
          result += `L ${x} ${y - radius} A ${radius} ${radius} 0 0 1 ${x - radius} ${y}`;
        }
      } else if (index === 3) {
        if (isCornerBottomLeft) {
          result += `L ${x + xCorner} ${y} L ${x} ${y - yCorner}`;
        } else {
          result += `L ${x + radius} ${y} A ${radius} ${radius} 0 0 1 ${x} ${y - radius}`;
        }
        result += 'Z';
      }
    });
    return result;
  }, [
    rectPoints,
    isCornerTopLeft,
    yCorner,
    xCorner,
    radius,
    isCornerTopRight,
    isCornerBottomRight,
    isCornerBottomLeft,
  ]);

  const directionPoints = useGetDireactPoints(direction);
  const backgroundDirectionPoints = useGetDireactPoints(backgroundDirection);

  const [uid, bgUid, imgUid] = useMemo(() => {
    seed++;
    return ['borderGradient' + seed, 'bgGradient' + seed, 'imgPattern' + seed];
  }, []);

  const fillDef = useMemo(() => {
    return img
      ? `url(#${imgUid})`
      : background
        ? `url(#${uid})`
        : backgroundColors.length
          ? `url(#${bgUid})`
          : fill;
  }, [background, backgroundColors.length, bgUid, fill, img, imgUid, uid]);

  const strokeDef = useMemo(() => {
    return img || background ? stroke : `url(#${uid})`;
  }, [background, img, stroke, uid]);

  const _ref = useRef<View>(null);
  // ✅ sync layout effect during commit
  useLayoutEffect(() => {
    // ✅ sync call to read layout
    _ref.current?.measureInWindow((_x, _y, width, height) => {
      // console.log('////', width, height);
      setInitWidth(width);
      setInitHeight(height);
    });
  }, []);

  return (
    <View
      ref={_ref}
      style={[
        absolute
          ? StyleSheet.absoluteFill
          : {
              width: initWidth,
              height: initHeight,
            },
        style,
      ]}
    >
      <Svg
        style={StyleSheet.absoluteFill}
        width={initWidth}
        height={initHeight}
      >
        <Defs>
          <LinearGradientsDef
            id={uid}
            directionPoints={directionPoints}
            colors={colors}
          />
          <LinearGradientsDef
            id={bgUid}
            directionPoints={backgroundDirectionPoints}
            colors={backgroundColors}
          />
          <Pattern
            id={imgUid}
            x="0"
            y="0"
            width={initWidth}
            height={initHeight}
            patternUnits="userSpaceOnUse"
          >
            <SImg
              href={img}
              x="0"
              y="0"
              preserveAspectRatio="xMidYMid slice"
              width={initWidth}
              height={initHeight}
            />
          </Pattern>
        </Defs>
        {!corner ? (
          <Rect
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            width={(initWidth - strokeWidth) as number}
            height={(initHeight - strokeWidth) as number}
            rx={radius}
            ry={radius}
            fill={fillDef}
            stroke={strokeDef}
            strokeWidth={strokeWidth}
          />
        ) : !radius ? (
          <Polygon
            points={points}
            fill={fillDef}
            stroke={strokeDef}
            strokeWidth={strokeWidth}
          />
        ) : (
          <Path
            d={d}
            fill={fillDef}
            stroke={strokeDef}
            strokeWidth={strokeWidth}
          />
        )}
      </Svg>
      {children}
    </View>
  );
};
export default GradientCard;
