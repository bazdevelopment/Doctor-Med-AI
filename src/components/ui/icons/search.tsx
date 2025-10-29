import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

import { type ISvgProps } from '@/types';

export const SearchIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 40 40"
    fill="none"
    {...props}
  >
    <Circle
      cx={19.767}
      cy={19.767}
      r={8.989}
      stroke={props.color || '#001A33'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <Path
      stroke={props.color || '#001A33'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M26.018 26.485 29.542 30"
    />
  </Svg>
);
