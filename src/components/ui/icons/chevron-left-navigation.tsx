import { ISvgProps } from '@/types';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ChevronLeftNavigation = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-chevron-left-icon lucide-chevron-left"
    {...props}
  >
    <Path fill={props.innerColor} d="m15 18-6-6 6-6" />
  </Svg>
);
