import React from 'react';

import CustomHomeHeader from '@/components/custom-home-header';
import MedicalCardsList from '@/components/medical-cards-list';
import MedicalImagesGallery from '@/components/medical-images-gallery';
import MedicalSpecializationsPreview from '@/components/medical-specialization-preview';
import { ScrollView } from '@/components/ui';

export default function Home() {
  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <CustomHomeHeader />
      <MedicalCardsList className="p-3" />
      <MedicalImagesGallery className="mt-2" />
      <MedicalSpecializationsPreview />
    </ScrollView>
  );
}
