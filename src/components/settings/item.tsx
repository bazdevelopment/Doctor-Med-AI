import * as React from 'react';
import { Pressable, View } from 'react-native';

import { type TxKeyPath } from '@/lib';

import { colors, Text } from '../ui';
import { ArrowRight } from '../ui/icons';

type ItemProps = {
  text: TxKeyPath;
  value?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
};

export const Item = ({ text, value, icon, onPress }: ItemProps) => {
  const isPressable = onPress !== undefined;
  return (
    <Pressable
      onPress={onPress}
      pointerEvents={isPressable ? 'auto' : 'none'}
      className="dark:bg-primary-900/5 flex-1 flex-row items-center justify-between rounded-xl border border-primary-900/50 p-4 active:opacity-80"
    >
      <View className="ml-1 flex-row items-center">
        {icon && <View className="pr-2">{icon}</View>}
        <Text tx={text} className="font-semibold-work-sans text-lg" />
      </View>
      <View className="flex-row items-center">
        <Text className="text-base text-neutral-600 dark:text-white">
          {value}
        </Text>
        {isPressable && (
          <View className="pl-2">
            <ArrowRight fill={colors.primary[900]} />
          </View>
        )}
      </View>
    </Pressable>
  );
};
