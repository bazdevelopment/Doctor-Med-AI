import React from 'react';
import { Linking, View } from 'react-native';

import Icon from '@/components/icon';
import { DEVICE_TYPE } from '@/utilities/device-type';
import { MobileIcon } from '@/components/ui/icons/mobile-icon';
import { Button, Text } from '@/components/ui';
import { translate } from '@/lib';

const NewAppVersion = () => {
  const openAppStore = () => {
    // Determine the URL based on device type
    const storeUrl = DEVICE_TYPE.IOS
      ? 'https://apps.apple.com/us/app/medical-assistant-ai-doctor/id6754875987'
      : 'https://play.google.com/store/apps/details?id=com.doctormedai';

    // Try opening the appropriate URL
    Linking.openURL(storeUrl).catch((err) => {
      console.error('Error opening URL', err);

      // Provide feedback to the user in case of error
      alert(
        'We encountered an error while opening the store. Please try again later.'
      );
    });
  };
  return (
    <View className="flex-1 items-center justify-between bg-primary-900 dark:bg-transparent">
      <View className="top-[-10%] mt-10 flex-1 items-center justify-center">
        <Icon icon={<MobileIcon />} />
        <Text className="mt-14 px-6 text-center font-bold-work-sans text-[32px] text-white">
          {translate('rootLayout.screens.newAppVersionScreen.heading')}
        </Text>
        <Text className="mt-8 px-10 text-center text-lg text-white">
          {translate('rootLayout.screens.newAppVersionScreen.subheading')}
        </Text>
      </View>

      <Button
        label={translate('rootLayout.screens.newAppVersionScreen.action')}
        variant="default"
        className="bottom-14 mt-6 h-[56px] w-[90%] rounded-xl border-2 border-primary-900 bg-white pl-5 active:bg-primary-700 dark:bg-primary-900"
        textClassName="text-lg text-center text-primary-900 dark:text-white"
        iconPosition="left"
        onPress={openAppStore}
      />
    </View>
  );
};

export default NewAppVersion;
