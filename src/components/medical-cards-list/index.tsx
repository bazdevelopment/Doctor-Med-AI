import React from 'react';
import { ScrollView } from 'react-native';

import MedicalCard, { type IMedicalCardItem } from '../medical-card';
import { BotAssistant } from '../ui/icons/bot-assistent';
import { GalleyIcon } from '../ui/icons/gallery';

const cardData: IMedicalCardItem[] = [
  {
    id: '1',
    title: 'Medical Images\nAnalyzer',
    icon: <GalleyIcon />,
    bgColor: 'bg-primary-900',
    onPress: () => console.log('Medical Images Analyzer pressed'),
  },
  {
    id: '2',
    title: 'Ask Medical\nAI Assistant',
    icon: <BotAssistant />,
    bgColor: 'bg-secondary-900',
    onPress: () => console.log('Ask Medical AI Assistant pressed'),
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
