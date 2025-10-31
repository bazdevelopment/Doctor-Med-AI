import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, View } from 'react-native';

import { type IFlow } from './flow-modal.interface';
import { IOnboardingCollectedData } from '@/app/onboarding';

const FlowModal = ({
  currentScreenIndex,
  onGoNext,
  onGoBack,
  onFinish,
  collectedData,
  children,
  onSkip,
  resetFlow,
}: IFlow) => {
  const totalSteps = React.Children.toArray(children).length;

  const isFirstScreenDisplayed = currentScreenIndex === 0;
  const _isLastScreenDisplayed = currentScreenIndex === totalSteps - 1;

  const goToNextScreen = (data: IOnboardingCollectedData) => onGoNext(data);
  const currentActiveScreen =
    React.Children.toArray(children)[currentScreenIndex];
  const wrappedCurrentChild = React.isValidElement(currentActiveScreen)
    ? React.cloneElement(currentActiveScreen, {
        goToNextScreen,
        collectedData,
        onGoBack: isFirstScreenDisplayed ? router.back : onGoBack,
        currentScreenIndex: currentScreenIndex,
        totalSteps,
        onFinish,
        onSkip,
        resetFlow,
      })
    : currentActiveScreen;

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-transparent">
      {wrappedCurrentChild}
    </SafeAreaView>
  );
};

export default FlowModal;
