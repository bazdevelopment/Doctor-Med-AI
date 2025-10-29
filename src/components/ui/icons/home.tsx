import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

import { type ISvgProps } from '@/types';

import colors from '../colors';

export const HomeIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill={props.isFocused ? '#00ACB8' : 'transparent'}
        d="M9.75 20.25v-6h4.5v6h6v-9a.75.75 0 0 0-.22-.53l-7.5-7.5a.749.749 0 0 0-1.06 0l-7.5 7.5a.75.75 0 0 0-.22.53v9h6Z"
        opacity={0.2}
      />
      <Path
        stroke={
          props.isFocused
            ? '#00ACB8'
            : props.isDark
              ? colors.white
              : colors.charcoal[800]
        }
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.75 20.25v-6h4.5v6h6v-9a.75.75 0 0 0-.22-.53l-7.5-7.5a.749.749 0 0 0-1.06 0l-7.5 7.5a.75.75 0 0 0-.22.53v9h6Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
