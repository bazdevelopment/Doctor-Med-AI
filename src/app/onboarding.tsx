import { router } from 'expo-router';
import React, { useState } from 'react';

import FlowModal from '@/components/flow-modal';
import SecondOnboardingScreen from '@/screens/onboarding/second-onboarding-screen';
import { useIsOnboarded } from '@/lib/hooks/use-is-onboarded';
import FirstOnboardingScreen from '@/screens/onboarding/first-onboarding-screen';
import ThirdOnboardingScreen from '@/screens/onboarding/third-screen-onboarding';
import FreeTrialPreview from '@/screens/onboarding/free-trial-preview';

export interface IOnboardingCollectedData {
  preferredName: string;
}

export default function Onboarding() {
  const [collectedData, setCollectedData] = useState<IOnboardingCollectedData>({
    preferredName: '',
  });
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [_, setIsOnboardingRunning] = useIsOnboarded();

  const handleGoToNextScreen = () => {
    setCurrentScreenIndex((prevIndex) => prevIndex + 1);
  };

  const handleGoToPreviousScreen = () =>
    setCurrentScreenIndex((prevIndex) => prevIndex - 1);

  const handleOnFinishFlow = () => {
    setIsOnboardingRunning(false);
    router.navigate({
      pathname: '/paywall-new',
      params: { allowAppAccess: true },
    });
  };

  return (
    <FlowModal
      currentScreenIndex={currentScreenIndex}
      onGoNext={handleGoToNextScreen}
      onFinish={handleOnFinishFlow}
      onGoBack={handleGoToPreviousScreen}
      collectedData={collectedData}
    >
      <FirstOnboardingScreen />
      <SecondOnboardingScreen />
      <ThirdOnboardingScreen />
      <FreeTrialPreview />
    </FlowModal>
  );
}
