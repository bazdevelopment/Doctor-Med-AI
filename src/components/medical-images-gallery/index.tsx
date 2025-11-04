import { ScrollView, View } from 'react-native';

import ImageCard, { type IMedicalImageCard } from '../image-card';
import SeeAllButton from '../see-all-button';
import { Text } from '../ui';
import { router } from 'expo-router';
import { translate } from '@/lib';

const MedicalImagesGallery = ({ className }: { className: string }) => {
  const handleSeeAll = () => {};

  const handleImagePress = (item: IMedicalImageCard) => {
    router.navigate({
      pathname: '/chat',
      params: { topic: item.title },
    });
  };

  return (
    <View className={className}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pb-3">
        <Text className="font-bold-work-sans text-xl text-gray-800">
          {translate('components.MedicalCard.medicalImagesAnalyzer')}
        </Text>
        {/* <SeeAllButton onPress={handleSeeAll} /> */}
      </View>

      {/* Horizontal Scrollable Gallery */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 py-2"
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {medicalImagesData.map((item) => (
          <ImageCard
            key={item.id}
            item={item}
            onPress={() => handleImagePress(item)}
            compact
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MedicalImagesGallery;

// Comprehensive medical images data
const medicalImagesData: IMedicalImageCard[] = [
  {
    id: '1',
    title: translate('components.MedicalCard.imageTypes.xray'),
    image: require('../../assets/images/medical/chest-xray.jpg'),
    description: 'Radiographic imaging for bones and chest',
    category: 'Radiology',
  },
  {
    id: '2',
    title: translate('components.MedicalCard.imageTypes.ct'),
    image: require('../../assets/images/medical/cardiac-ct.jpg'),
    description: 'Computed Tomography scan',
    category: 'Radiology',
  },
  {
    id: '3',
    title: translate('components.MedicalCard.imageTypes.mri'),
    image: require('../../assets/images/medical/brain-mri.jpeg'),
    description: 'Magnetic Resonance Imaging',
    category: 'Radiology',
  },
  {
    id: '4',
    title: translate('components.MedicalCard.imageTypes.ultrasound'),
    image: require('../../assets/images/medical/abdominal-ultrasound.jpg'),
    description: 'Sonographic imaging for organs',
    category: 'Radiology',
  },
  {
    id: '5',
    title: translate('components.MedicalCard.imageTypes.ecg'),
    image: require('../../assets/images/medical/ecg.png'),
    description: 'Electrocardiogram for heart monitoring',
    category: 'Cardiology',
  },
  {
    id: '6',
    title: translate('components.MedicalCard.imageTypes.skinLesion'),
    image: require('../../assets/images/medical/skin.png'),
    description: 'Dermatological examination images',
    category: 'Dermatology',
  },
  {
    id: '7',
    title: translate('components.MedicalCard.imageTypes.mammogram'),
    image: require('../../assets/images/medical/breast-mammogram.png'),
    description: 'Breast cancer screening',
    category: 'Oncology',
  },
  {
    id: '8',
    title: translate('components.MedicalCard.imageTypes.retinalScan'),
    image: require('../../assets/images/medical/retina-scan.png'),
    description: 'Eye fundus photography',
    category: 'Ophthalmology',
  },
  {
    id: '9',
    title: translate('components.MedicalCard.imageTypes.bloodSmear'),
    image: require('../../assets/images/medical/blood-smear.png'),
    description: 'Microscopic blood analysis',
    category: 'Hematology',
  },
  {
    id: '10',
    title: translate('components.MedicalCard.imageTypes.Dental'),
    image: require('../../assets/images/medical/dental-xray.png'),
    description: 'Oral and dental imaging',
    category: 'Dentistry',
  },
  // {
  //   id: '11',
  //   title: 'Endoscopy',
  //   image: require('./assets/endoscopy.png'),
  //   description: 'Internal organ visualization',
  //   category: 'Gastroenterology',
  // },
  {
    id: '12',
    title: 'PET',
    image: require('../../assets/images/medical/brain-pet.jpeg'),
    description: 'Positron Emission Tomography',
    category: 'Nuclear Medicine',
  },
];
