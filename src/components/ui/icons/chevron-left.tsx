import { ISvgProps } from '@/types';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ChevronLeftIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.25}
      d="m15 6-6 6 6 6"
    />
  </Svg>
);
