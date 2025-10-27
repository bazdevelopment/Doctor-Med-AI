import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Text } from '../ui';
import { DoubleArrowRight } from '../ui/icons/double-arrow-right';
import { WarningCircleIcon } from '../ui/icons/warning-circle';

const MedicalDisclaimerButton = ({ className }: { className: string }) => {
  return (
    <TouchableOpacity
      onPress={() => router.navigate('/medical-disclaimer')}
      className={`flex-row items-center gap-2 self-start rounded-full bg-[#FA9525] px-4 py-2.5 dark:bg-[#FA9525] ${className}`}
      activeOpacity={0.7}
    >
      <WarningCircleIcon width={20} height={20} />
      <Text className="font-primary-work-sans text-base text-white dark:text-white">
        {/* {translate('general.medicalDisclaimer')} */}
        Disclaimer
      </Text>
      <DoubleArrowRight width={20} height={20} />
    </TouchableOpacity>
  );
};

export default MedicalDisclaimerButton;
