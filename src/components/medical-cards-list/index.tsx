import React from 'react';
import { ScrollView } from 'react-native';

import MedicalCard, { type IMedicalCardItem } from '../medical-card';
import { BotAssistant } from '../ui/icons/bot-assistent';
import { GalleyIcon } from '../ui/icons/gallery';
import { router } from 'expo-router';
import { translate } from '@/lib';

const cardData: IMedicalCardItem[] = [
  {
    id: '1',
    title: translate('components.MedicalCard.medicalImagesAnalyzer'),
    icon: <GalleyIcon />,
    bgColor: 'bg-primary-900',
    onPress: () =>
      router.navigate({
        pathname: '/chat',
        params: {
          topic: translate('components.MedicalCard.medicalImagesAnalyzer'),
        },
      }),
  },
  {
    id: '2',
    title: translate('components.MedicalCard.askMedicalAssistant'),
    icon: <BotAssistant />,
    bgColor: 'bg-secondary-900',
    onPress: () =>
      router.navigate({
        pathname: '/chat',
        params: { topic: translate('components.MedicalCard.medicalAssistant') },
      }),
  },
];

const MedicalCardsList = ({ className }: { className: string }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      horizontal
      contentContainerClassName={`flex-1 ${className} gap-1`}
    >
      {cardData.map((item) => (
        <MedicalCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};

export default MedicalCardsList;
