import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import Icon from '@/components/icon';
import Toast from '@/components/toast';
import { useClipboard } from '@/lib/hooks/use-clipboard';
import { translate } from '@/lib';
import { colors, Text } from '@/components/ui';
import CopyIcon from '@/components/ui/icons/copy';
import { MailIcon } from '@/components/ui/icons/mail';

const ContactUs = () => {
  const emailAddress = 'doctormedaiapp@gmail.com';
  const { copyToClipboard } = useClipboard();
  const handleCopyEmail = () => {
    copyToClipboard(emailAddress);
    Toast.success(translate('general.copyText.copied'), {
      style: { marginTop: 50 },
      closeButton: true,
    });
  };

  return (
    <View className="flex-1 bg-white p-6 dark:bg-transparent">
      <Text className="mb-6 text-charcoal-600">
        {translate('rootLayout.screens.contactUs.heading')}
      </Text>

      <View className="rounded-2xl bg-gray-100 px-4 py-6 shadow-xl shadow-gray-100 dark:bg-black dark:shadow-none">
        <Text className="mb-6 font-semibold-work-sans text-lg text-charcoal-600">
          {translate('rootLayout.screens.contactUs.customerSupport')}
        </Text>

        <View className="flex-row items-center gap-3">
          <Icon
            icon={<MailIcon />}
            size={24}
            color={colors.primary[900]}
            containerStyle="bg-primary-200 dark:bg-blackEerie p-3 rounded-full"
          />
          <View className="flex-col">
            <Text className="text-sm text-charcoal-600  dark:text-charcoal-200">
              {translate('rootLayout.screens.contactUs.emailAddress')}
            </Text>
            <Text>{emailAddress}</Text>
          </View>
          <TouchableOpacity
            onPress={handleCopyEmail}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <CopyIcon
              top={8}
              left={4}
              color={colors.primary[900]}
              width={20}
              height={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ContactUs;
