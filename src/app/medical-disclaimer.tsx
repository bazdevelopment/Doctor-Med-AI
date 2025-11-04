import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import Branding from '@/components/branding';
import { translate } from '@/lib';
import { Text } from '@/components/ui';

const disclaimerTexts = [
  {
    text: translate('rootLayout.screens.disclaimerScreen.heading'),
    className: 'mb-6 font-bold-work-sans text-xl',
  },

  // {
  //   text: translate('rootLayout.screens.disclaimerScreen.subheading'),
  //   className: 'mb-8 text-base',
  // },
  {
    text: translate('rootLayout.screens.disclaimerScreen.firstConsent'),
    className: 'mb-8 text-base',
  },

  {
    text: translate('rootLayout.screens.disclaimerScreen.secondConsent'),
    className: 'mb-8 text-base',
  },
  {
    text: translate('rootLayout.screens.disclaimerScreen.fourthConsent'),
    className: 'mb-8 font-bold-work-sans text-base',
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

const MedicalDisclaimerScreen = () => {
  const [checked, setChecked] = useState(false);

  return (
    <>
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
    </>
  );
};

export default MedicalDisclaimerScreen;
