import React from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { type IIconBadge } from './icon-badge.interface';
import { Text } from '../ui';

const IconBadge = ({
  icon,
  badgeValue,
  badgeTextClassName = '',
  badgeContainerClassName = '',
  className = '',
  showBadgeValue = false,
}: IIconBadge) => {
  const badgeContainerStyle = twMerge(
    'absolute -right-[-2px] -top-[1px] flex h-[10px] w-[10px] rounded-full bg-red-500',
    badgeContainerClassName,
    showBadgeValue && 'h-[15px] w-[15px] -right-2 -top-2'
  );

  const badgeTextStyle = twMerge(
    'text-[9px] mt-[1px] font-bold-work-sans text-white w-full h-full text-center',
    badgeTextClassName
  );

  return (
    <View className={`relative ${className}`}>
      {icon}
      {Boolean(badgeValue) && (
        <View className={badgeContainerStyle}>
          {showBadgeValue && badgeValue && (
            <Text className={badgeTextStyle}>{badgeValue}</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default IconBadge;
