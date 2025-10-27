import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

import { type ISvgProps } from '@/types';

export const StethoscopeIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-stethoscope-icon lucide-stethoscope"
    {...props}
  >
    <Path d="M11 2v2M5 2v2M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
    <Path d="M8 15a6 6 0 0 0 12 0v-3" />
    <Circle cx={20} cy={10} r={2} />
  </Svg>
);
