import React from 'react';

import { Image, Text, View } from '../ui';

const Branding = ({
  isLogoVisible = false,
  className,
  invertedColors,
}: {
  isLogoVisible?: boolean;
  className?: string;
  invertedColors?: boolean;
}) => {
  const textColor = invertedColors ? 'text-black' : 'text-primary-900';
  return (
    <View className={`flex-row items-center ${className}`}>
      {isLogoVisible && (
        <View className="dark:bg-blackEerie rounded-xl bg-primary-50 dark:p-0">
          <Image
            source={require('../../../assets/icon_transparent.png')}
            className="size-[54px]"
          />
        </View>
      )}

      <View className={`${isLogoVisible ? 'ml-3' : ''} flex-row`}>
        <Text
          className={`text-center font-bold-work-sans text-[22px] tracking-[2px] text-black dark:text-white`}
        >
          Doctor Med
        </Text>
        <Text
          className={`ml-2 text-center font-bold-work-sans text-[22px] tracking-[2px] text-primary-900 dark:text-primary-900 ${textColor}`}
        >
          AI
        </Text>
      </View>
    </View>
  );
};

export default Branding;
