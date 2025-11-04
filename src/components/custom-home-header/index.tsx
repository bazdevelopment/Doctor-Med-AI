import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import Branding from '../branding';
import HorizontalLine from '../horizontal-line';
import MedicalDisclaimerButton from '../medical-disclaimer-button';
import { Button, colors } from '../ui';
import { CrownIcon } from '../ui/icons/crown';
import { BellIcon } from '../ui/icons/bell';
import IconBadge from '../icon-badge';

const CustomHomeHeader = ({ unReadMessages }: { unReadMessages: number }) => {
  return (
    <View className="bg-white px-4 dark:bg-transparent">
      <View className="flex-row justify-between">
        <Branding isLogoVisible />
        <TouchableOpacity
          onPress={() => router.navigate('/notifications')}
          className="mt-1"
        >
          <IconBadge
            icon={<BellIcon width={30} height={30} />}
            badgeValue={unReadMessages}
            className="items-center justify-center rounded-xl"
          />
        </TouchableOpacity>
      </View>
      <View className=" flex-row items-center justify-between">
        <MedicalDisclaimerButton className="mt-2" />
        <Button
          label="PRO" //or PREMIUM
          variant="default"
          icon={<CrownIcon />}
          textClassName="ml-3 text-white text-lg dark:text-white tracking-[1px]"
          iconPosition="left"
          className="-top-2 self-center rounded-full bg-primary-900 dark:bg-primary-900"
          onPress={() => router.navigate('/paywall-new')}
        />
      </View>
      <HorizontalLine
        color={colors.primary[900]}
        thickness={0.3}
        className="my-2"
        className="-ml-10 -mr-5"
      />
    </View>
  );
};

export default CustomHomeHeader;
