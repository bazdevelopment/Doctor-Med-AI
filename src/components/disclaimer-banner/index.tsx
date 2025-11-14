import React from 'react';
import { View } from 'react-native';

import { Text } from '../ui';

interface IDisclaimerBanner {
  className?: string;
}

const DisclaimerBanner = ({ className }: IDisclaimerBanner) => {
  return (
    <View className={` bg-amber-50 p-4 dark:bg-amber-400 ${className}`}>
      <View className="gap-2">
        <Text className="font-medium-poppins text-sm text-amber-800 dark:text-black">
          This app does not provide medical advice, diagnosis, or treatment. For
          real health concerns, please consult a licensed healthcare
          professional.
        </Text>
      </View>
    </View>
  );
};

export default DisclaimerBanner;
