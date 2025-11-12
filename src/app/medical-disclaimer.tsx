import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import Branding from '@/components/branding';
import { translate } from '@/lib';
import { Button, colors, SafeAreaView, Text } from '@/components/ui';
import { ArrowRightSharp } from '@/components/ui/icons/arrow-right-sharp';

const disclaimerTexts = [
  {
    text: translate('rootLayout.screens.disclaimerScreen.heading'),
    className: 'mb-6 font-bold-poppins text-xl',
  },

  // {
  //   text: translate('rootLayout.screens.disclaimerScreen.subheading'),
  //   className: 'mb-8 text-base',
  // },
  {
    text: translate('rootLayout.screens.disclaimerScreen.firstConsent'),
    className: 'mb-8 text-lg',
  },

  {
    text: translate('rootLayout.screens.disclaimerScreen.secondConsent'),
    className: 'mb-8 text-lg',
  },
  {
    text: translate('rootLayout.screens.disclaimerScreen.fourthConsent'),
    className: 'mb-8 font-bold-poppins text-lg',
  },
  // {
  //   text: translate('rootLayout.screens.disclaimerScreen.thirdConsent'),
  //   className: 'mb-8 text-base',
  // },

  {
    text: translate('rootLayout.screens.disclaimerScreen.fifthConsent'),
    className: 'mb-8 text-base',
  },
];

const MedicalDisclaimerScreen = ({ goToNextScreen }) => {
  const [checked, setChecked] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 200 }}
        className="bg-white dark:bg-transparent"
        showsVerticalScrollIndicator={false}
      >
        <Branding
          isLogoVisible
          invertedColors
          className="mb-10 justify-center"
        />
        {disclaimerTexts.map((item, index) => (
          <Text key={index} className={item.className}>
            {item.text}
          </Text>
        ))}
      </ScrollView>
      {goToNextScreen && ( // if goToNextScreen is provided then it seems it's part of the onboarding flow
        <View className={`px-6 bottom-24`}>
          <Button
            label={translate('general.continue')}
            variant="default"
            className="h-[55px] rounded-full bg-primary-900 pl-5 dark:bg-primary-900"
            textClassName="font-semibold-poppins text-lg dark:text-white "
            iconPosition="right"
            icon={<ArrowRightSharp color={colors.white} />}
            onPress={goToNextScreen}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MedicalDisclaimerScreen;
