import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { colors, Text } from '../ui';
import { DoubleArrowRight } from '../ui/icons/double-arrow-right';
import { WarningCircleIcon } from '../ui/icons/warning-circle';

const MedicalDisclaimerButton = ({ className }: { className: string }) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <TouchableOpacity
      onPress={() => router.navigate('/medical-disclaimer')}
      className={`flex-row items-center gap-2 self-start rounded-lg border-yellow-400 ${className}`}
      activeOpacity={0.7}
    >
      <WarningCircleIcon
        width={24}
        height={24}
        color={isDark ? colors.warning[400] : colors.warning[600]}
      />
      <Text className="font-semibold-work-sans text-base text-warning-600 dark:text-warning-400">
        {/* {translate('general.medicalDisclaimer')} */}
        Medical Disclaimer
      </Text>
      <DoubleArrowRight
        width={22}
        height={22}
        color={isDark ? colors.warning[400] : colors.warning[600]}
      />
    </TouchableOpacity>
  );
};

export default MedicalDisclaimerButton;
