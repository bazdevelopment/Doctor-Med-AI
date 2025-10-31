import { Button, colors, ProgressBar, Text } from '@/components/ui';
import { ArrowRightSharp } from '@/components/ui/icons/arrow-right-sharp';
import { WelcomeDoctorIllustration } from '@/components/ui/illustrations/welcome-doctor';
import { translate } from '@/lib';
import getDeviceSizeCategory from '@/utilities/get-device-size-category';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { router } from 'react-query-kit';

const FirstOnboardingScreen = ({
  goToNextScreen,
  totalSteps,
  currentScreenIndex,
}: {
  onGoNgoToNextScreenext: () => void;
  totalSteps: number;
  currentScreenIndex: number;
}) => {
  const { isVerySmallDevice, isLargeDevice } = getDeviceSizeCategory();

  const progress = ((currentScreenIndex + 1) / totalSteps) * 100;
  return (
    <>
      <ScrollView
        contentContainerClassName="bg-white dark:bg-transparent mt-10"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center justify-center px-6 dark:bg-blackEerie">
          {/* <Branding isLogoVisible invertedColors /> */}
          <ProgressBar
            initialProgress={progress}
            className="bg-transparent mb-10 border-[1px] rounded-full border-primary-900 w-full"
          />
          <WelcomeDoctorIllustration
            width={isVerySmallDevice ? 250 : 350}
            height={isVerySmallDevice ? 250 : 350}
          />

          <View className="mt-14">
            <Text className="font-bold-work-sans text-3xl">
              Your AI-Powered Healthcare Companion
            </Text>
            <Text className="text-lg mt-4 text-charcoal-800 dark:text-white">
              Get instant medical insights and guidance from specialized AI
              chatbots, anytime, anywhere.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View className={`px-6 bottom-8 `}>
        <Button
          label={translate('general.continue')}
          variant="default"
          className="h-[55px] rounded-full bg-primary-900 pl-5 dark:bg-primary-900"
          textClassName="font-semibold-work-sans text-lg dark:text-white "
          iconPosition="right"
          icon={<ArrowRightSharp color={colors.white} />}
          onPress={goToNextScreen}
        />
      </View>
    </>
  );
};

export default FirstOnboardingScreen;
