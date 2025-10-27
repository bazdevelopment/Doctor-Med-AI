import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

import { type ISvgProps } from '@/types';

import colors from '../colors';

export const BotIcon = (props: ISvgProps) => (
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
        fillOpacity={0.6}
        d="M18.75 5.25H5.25A2.25 2.25 0 0 0 3 7.5V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V7.5a2.25 2.25 0 0 0-2.25-2.25Zm-3.375 12h-6.75a1.875 1.875 0 0 1 0-3.75h6.75a1.875 1.875 0 1 1 0 3.75Z"
        opacity={0.2}
      />
      <Path
        stroke={
          props.isFocused
            ? '#00ACB8'
            : props.isDark
              ? colors.charcoal[300]
              : colors.charcoal[800]
        }
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.6}
        strokeWidth={1.5}
        d="M18.75 5.25H5.25A2.25 2.25 0 0 0 3 7.5V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V7.5a2.25 2.25 0 0 0-2.25-2.25ZM12 5.25V1.5"
      />
      <Path
        fill={
          props.isFocused
            ? '#00ACB8'
            : props.isDark
              ? colors.charcoal[300]
              : colors.charcoal[800]
        }
        fillOpacity={0.6}
        d="M7.875 11.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25ZM16.125 11.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
      />
      <Path
        stroke={
          props.isFocused
            ? '#00ACB8'
            : props.isDark
              ? colors.charcoal[300]
              : colors.charcoal[800]
        }
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.6}
        strokeWidth={1.5}
        d="M15.375 13.5h-6.75a1.875 1.875 0 0 0 0 3.75h6.75a1.875 1.875 0 0 0 0-3.75ZM13.875 13.5v3.75M10.125 13.5v3.75"
      />
      <Path
        fill={
          props.isFocused
            ? '#00ACB8'
            : props.isDark
              ? colors.charcoal[300]
              : colors.charcoal[800]
        }
        fillOpacity={0.6}
        d="M12 2.625a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
