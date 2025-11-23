import React from 'react';
import { ScrollView, View } from 'react-native';

import { Button, colors, Image, ProgressBar, Text } from '@/components/ui';
import { ArrowRightSharp } from '@/components/ui/icons/arrow-right-sharp';
import { translate } from '@/lib';
import { DEVICE_TYPE } from '@/utilities/device-type';

const ThirdOnboardingScreen = ({
  goToNextScreen,
  totalSteps,
  currentScreenIndex,
}: {
  goToNextScreen: () => void;
}) => {
  const progress = ((currentScreenIndex + 1) / totalSteps) * 100;
  return (
    <>
      <ScrollView
        contentContainerClassName={`bg-white dark:bg-transparent ${DEVICE_TYPE.ANDROID ? 'mt-16' : 'mt-10'}`}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center justify-center px-6 dark:bg-transparent">
          {/* <Branding isLogoVisible invertedColors /> */}
          <ProgressBar
            initialProgress={progress}
            className="mb-10 w-full rounded-full border border-primary-900 bg-transparent"
          />

          <Image
            source={require('../../../assets/images/random/privacy.png')}
            className="size-[330px]"
          />

          <View className="mt-14">
            <Text className="font-bold-poppins text-4xl">
              {translate('rootLayout.screens.onboarding.thirdOnboarding.title')}
            </Text>
            <Text className="mt-4 font-medium-poppins text-lg text-charcoal-800 dark:text-white">
              {translate(
                'rootLayout.screens.onboarding.thirdOnboarding.subtitle'
              )}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View className={`bottom-8 px-6 `}>
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
    </>
  );
};

export default ThirdOnboardingScreen;
