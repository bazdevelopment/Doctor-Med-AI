import { router } from 'expo-router';
import React, { useState } from 'react';

import FlowModal from '@/components/flow-modal';
import { useIsOnboarded } from '@/lib/hooks/use-is-onboarded';
import useRemoteConfig from '@/lib/hooks/use-remote-config';
import FirstOnboardingScreen from '@/screens/onboarding/first-onboarding-screen';
import FreeTrialPreview from '@/screens/onboarding/free-trial-preview';
import SecondOnboardingScreen from '@/screens/onboarding/second-onboarding-screen';
import ThirdOnboardingScreen from '@/screens/onboarding/third-screen-onboarding';

import MedicalDisclaimerScreen from './medical-disclaimer';

export interface IOnboardingCollectedData {
  preferredName: string;
}

export default function Onboarding() {
  const [collectedData, setCollectedData] = useState<IOnboardingCollectedData>({
    preferredName: '',
  });
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [_, setIsOnboarded] = useIsOnboarded();

  const { SHOW_MEDICAL_DISCLAIMER_ONBOARDING } = useRemoteConfig();

  const handleGoToNextScreen = () => {
    setCurrentScreenIndex((prevIndex) => prevIndex + 1);
  };

  const handleGoToPreviousScreen = () =>
    setCurrentScreenIndex((prevIndex) => prevIndex - 1);

  const handleOnFinishFlow = () => {
    setIsOnboarded(true);
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
      {SHOW_MEDICAL_DISCLAIMER_ONBOARDING && <MedicalDisclaimerScreen />}
      <FreeTrialPreview />
    </FlowModal>
  );
}
