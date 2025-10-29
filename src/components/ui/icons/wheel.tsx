import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

import { type ISvgProps } from '@/types';

import colors from '../colors';

export const WheelIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill={
          props.isFocused
            ? '#00ACB8'
            : props.isDark
              ? colors.white
              : colors.charcoal[800]
        }
        fillOpacity={0.6}
        d="M19.487 11.548 21.06 9.58a9.295 9.295 0 0 0-.944-2.278l-2.503-.28a7.583 7.583 0 0 0-.639-.64l-.28-2.503a9.32 9.32 0 0 0-2.279-.938l-1.969 1.572a7.65 7.65 0 0 0-.903 0L9.572 2.94a9.294 9.294 0 0 0-2.269.944l-.281 2.503c-.225.2-.439.414-.639.639l-2.504.281a9.322 9.322 0 0 0-.937 2.278l1.572 1.969a7.65 7.65 0 0 0 0 .904l-1.573 1.968c.212.798.53 1.564.944 2.278l2.503.28c.2.226.413.44.639.64l.28 2.503c.715.412 1.481.728 2.279.938l1.969-1.572c.3.018.602.018.903 0l1.97 1.573a9.293 9.293 0 0 0 2.276-.944l.282-2.503c.225-.2.438-.413.638-.639l2.504-.281c.412-.715.727-1.48.938-2.278l-1.573-1.969a7.655 7.655 0 0 0-.007-.904ZM12 15.75a3.75 3.75 0 1 1 0-7.499 3.75 3.75 0 0 1 0 7.5Z"
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
        strokeOpacity={0.6}
        strokeWidth={1.5}
        d="M12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
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
        strokeOpacity={0.6}
        strokeWidth={1.5}
        d="M3.884 16.696a9.295 9.295 0 0 1-.944-2.277l1.573-1.969a7.647 7.647 0 0 1 0-.904L2.941 9.578A9.321 9.321 0 0 1 3.883 7.3l2.504-.282c.2-.225.413-.438.639-.638l.28-2.503a9.294 9.294 0 0 1 2.275-.937l1.969 1.573a7.65 7.65 0 0 1 .904 0l1.968-1.572a9.32 9.32 0 0 1 2.279.942l.28 2.504c.226.2.44.414.64.639l2.502.281c.415.714.732 1.48.944 2.277l-1.573 1.969c.018.301.018.603 0 .904l1.573 1.968a9.32 9.32 0 0 1-.938 2.279l-2.504.28c-.2.226-.413.44-.639.64l-.28 2.502a9.296 9.296 0 0 1-2.278.944l-1.969-1.573a7.653 7.653 0 0 1-.903 0l-1.97 1.573a9.324 9.324 0 0 1-2.277-.938l-.282-2.504a7.613 7.613 0 0 1-.638-.638l-2.505-.294Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
