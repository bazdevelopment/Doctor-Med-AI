import React from 'react';
import { View } from 'react-native';

import Branding from '../branding';
import HorizontalLine from '../horizontal-line';
import MedicalDisclaimerButton from '../medical-disclaimer-button';
import { Button, colors } from '../ui';
import { CrownIcon } from '../ui/icons/crown';

const CustomHomeHeader = () => {
  return (
    <View className="px-4">
      <Branding isLogoVisible />
      <View className="mt-2 flex-row items-center justify-between">
        <MedicalDisclaimerButton />
        <Button
          label="PRO" //or PREMIUM
          variant="default"
          icon={<CrownIcon />}
          textClassName="ml-3 text-white text-lg dark:text-white tracking-[1px]"
          iconPosition="left"
          className="-top-2 self-center rounded-full bg-primary-900 dark:bg-primary-900"
        />
      </View>
      <HorizontalLine
        color={colors.primary[900]}
        thickness={0.5}
        className="my-2"
      />
    </View>
  );
};

export default CustomHomeHeader;
