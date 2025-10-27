import React from 'react';

import CustomHomeHeader from '@/components/custom-home-header';
import { ScrollView, Text } from '@/components/ui';

export default function Home() {
  return (
    <ScrollView className="flex-1">
      <CustomHomeHeader />
      <Text> Home screen</Text>
    </ScrollView>
  );
}
