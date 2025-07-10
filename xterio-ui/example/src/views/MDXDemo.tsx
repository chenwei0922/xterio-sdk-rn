import React from 'react';
import { View } from 'react-native';

import { RenderMdx } from 'rn-mdx';
import { ColorBox, ColorText } from '../customComponents';
import content from '../content.mdx';

const MDXView = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <RenderMdx components={{ ColorBox, ColorText }}>{content}</RenderMdx>
    </View>
  );
};
export default MDXView;
