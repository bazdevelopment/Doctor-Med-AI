import { View } from 'react-native';
import React from 'react';

import FadeInView from '../fade-in-view/fade-in-view';
import { translate } from '@/lib';
import { colors, Text } from '../ui';
import { PremiumBadge } from '../ui/icons/premium-badge';
import { DoctorsIllustration } from '../ui/illustrations/doctors';
import { ScanIllustration } from '../ui/illustrations/scan';
import { NoAdsIllustration } from '../ui/illustrations/no-ads';
import getDeviceSizeCategory from '@/utilities/get-device-size-category';

// Feature Card Component
const FeatureCard = ({ icon, title }) => (
  <View className="mb-4 flex-row items-center rounded-2xl bg-white/95 p-4 shadow-sm dark:bg-transparent ">
    <View className="mr-4 h-14 w-14 items-center justify-center rounded-full bg-yellow-400 overflow-hidden">
      {icon}
    </View>
    <View className="flex-1">
      <Text className="mb-1 text-base font-semibold-work-sans text-gray-900">
        {title}
      </Text>
    </View>
  </View>
);

const PremiumFeaturesOverview = () => {
  const { isVerySmallDevice } = getDeviceSizeCategory();

  const features = [
    {
      icon: <PremiumBadge width={40} height={40} fill={colors.primary[900]} />,
      text: translate('components.PremiumFeaturesOverview.second'),
      backgroundColor: 'bg-yellow-100',
      rotation: '-rotate-2' as const,
    },
    {
      icon: (
        <DoctorsIllustration
          fill={colors.neutral[500]}
          width={42}
          height={42}
        />
      ),
      text: translate('components.PremiumFeaturesOverview.fourth'),
      backgroundColor: 'bg-blue-100',
      rotation: 'rotate-2' as const,
    },
    {
      icon: (
        <ScanIllustration
          fill={colors.charcoal[800]}
          top={10}
          width={80}
          height={80}
        />
      ),
      text: translate('components.PremiumFeaturesOverview.first', {
        trialDays: 3,
      }),
      backgroundColor: 'bg-blue-100',
      rotation: 'rotate-2' as const,
    },

    {
      icon: <NoAdsIllustration width={42} height={42} />,
      text: translate('components.PremiumFeaturesOverview.third'),
      backgroundColor: 'bg-red-100',
      rotation: 'rotate-2' as const,
    },
  ];

  return (
    <View className={`flex-1 justify-center`}>
      {features.map((feature, index) => (
        <FadeInView key={index} delay={index * 150}>
          <FeatureCard
            icon={feature.icon}
            title={feature.text}
            isVerySmallDevice={isVerySmallDevice}
          />
        </FadeInView>
      ))}
    </View>
  );
};

export default PremiumFeaturesOverview;
