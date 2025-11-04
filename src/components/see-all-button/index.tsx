import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Text } from '../ui';
import { translate } from '@/lib';

const SeeAllButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-full border  border-primary-600 bg-primary-50 px-5 py-1 dark:bg-transparent"
      activeOpacity={0.7}
    >
      <Text className="font-semibold-work-sans text-primary-900 dark:text-primary-900">
        {translate('general.seeAll')}
      </Text>
    </TouchableOpacity>
  );
};

export default SeeAllButton;
