import { Button, colors, Image, ProgressBar, Text } from '@/components/ui';
import { ArrowRightSharp } from '@/components/ui/icons/arrow-right-sharp';
import { translate } from '@/lib';
import React from 'react';
import { ScrollView, View } from 'react-native';

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
        contentContainerClassName="bg-white dark:bg-transparent mt-10"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center justify-center px-6 dark:bg-blackEerie">
          {/* <Branding isLogoVisible invertedColors /> */}
          <ProgressBar
            initialProgress={progress}
            className="bg-transparent mb-10 border-[1px] rounded-full border-primary-900 w-full"
          />

          <Image
            source={require('../../../assets/images/random/privacy.png')}
            className="size-[330px]"
          />

          <View className="mt-14">
            <Text className="font-bold-work-sans text-4xl">
              Your Privacy Matters
            </Text>
            <Text className="text-lg font-primary-work-sans mt-4 text-charcoal-800 dark:text-white">
              We are committed to protect your privacy. We do not collect
              personal data. Any files you upload remain private and are never
              shared.
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

export default ThirdOnboardingScreen;
