import { useColorScheme } from 'nativewind';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import BounceLoader from '../bounce-loader';
import Branding from '../branding';
import { LOADING_MESSAGES_INITIAL_APP_LOAD } from '@/constants/constants/loading-messages';
import { colors } from '../ui';

const InitialLoadSpinner = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="flex-1 items-center justify-center gap-3 bg-primary-900 dark:bg-transparent">
      <Branding isLogoVisible className="top-[-25]" />
      <ActivityIndicator
        size="large"
        className="items-center justify-center"
        color={isDark ? colors.charcoal[300] : colors.charcoal[100]}
      />
      <BounceLoader
        loadingMessages={LOADING_MESSAGES_INITIAL_APP_LOAD}
        textClassName="text-white"
      />
    </View>
  );
};

export default InitialLoadSpinner;
