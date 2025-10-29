import { router } from 'expo-router';
import { View } from 'react-native';

import SeeAllButton from '../see-all-button';
import SpecializationCard, {
  type MedicalSpecialization,
} from '../specialization-card';
import { Text } from '../ui';

// Main Specializations Component (Home Screen Preview)
const MedicalSpecializationsPreview: React.FC = () => {
  // Get top 7 most searched specializations
  const topSpecializations = medicalSpecializationsData
    .filter((item) => item.searchRank && item.searchRank <= 8)
    .sort((a, b) => (a.searchRank || 0) - (b.searchRank || 0));

  const handleSeeAll = () => {
    router.navigate('/doctors');
  };

  const handleSpecializationPress = (item: MedicalSpecialization) => {
    console.log('specialization pressed');
  };

  return (
    <View className="bg-gray-50 pb-4 dark:bg-transparent">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pb-3 pt-6">
        <Text className="font-bold-work-sans text-xl text-gray-800">
          Medical Assistants
        </Text>

        <SeeAllButton onPress={handleSeeAll} />
      </View>

      {/* Top Specializations List */}
      <View className="px-4">
        {topSpecializations.map((item) => (
          <SpecializationCard
            key={item.id}
            item={item}
            onPress={() => handleSpecializationPress(item)}
          />
        ))}
      </View>
    </View>
  );
};

export default MedicalSpecializationsPreview;

export const medicalSpecializationsData: MedicalSpecialization[] = [
  {
    id: '1',
    title: 'Family Medicine',
    subtitle: 'General Practice',
    icon: require('../../assets/images/specializations/family-medicine.png'),
    color: '#4DD0E1',
    searchRank: 1,
    description: 'Primary care for all ages and general health concerns',
  },
  {
    id: '2',
    title: 'Internal Medicine',
    icon: require('../../assets/images/specializations/internal-medicine.png'),
    color: '#4FC3F7',
    searchRank: 2,
    description: 'Adult medicine and complex disease management',
  },
  {
    id: '3',
    title: 'Pediatrics',
    icon: require('../../assets/images/specializations/pediatrics.png'),
    color: '#29B6F6',
    searchRank: 8,
    description: 'Medical care for infants, children, and adolescents',
  },
  {
    id: '4',
    title: 'Dermatology',
    icon: require('../../assets/images/specializations/dermatology.png'),
    color: '#26C6DA',
    searchRank: 4,
    description: 'Skin, hair, and nail conditions',
  },
  {
    id: '5',
    title: 'Cardiology',
    icon: require('../../assets/images/specializations/cardiology.png'),
    color: '#00BCD4',
    searchRank: 5,
    description: 'Heart and cardiovascular system',
  },
  {
    id: '6',
    title: 'Orthopedics',
    icon: require('../../assets/images/specializations/orthopedics.png'),
    color: '#0097A7',
    searchRank: 6,
    description: 'Bones, joints, ligaments, and musculoskeletal system',
  },
  {
    id: '7',
    title: 'Psychiatry',
    subtitle: 'Mental Health',
    icon: require('../../assets/images/specializations/psychiatry.png'),
    color: '#00ACC1',
    searchRank: 7,
    description: 'Mental health and behavioral disorders',
  },
  {
    id: '8',
    title: 'Obstetrics & Gynecology',
    subtitle: 'OB/GYN',
    icon: require('../../assets/images/specializations/obstetrics-ginecology.png'),
    color: '#26A69A',
    description: "Women's reproductive health and pregnancy",
  },
  {
    id: '9',
    title: 'Neurology',
    icon: require('../../assets/images/specializations/neurology.png'),
    color: '#009688',
    description: 'Brain, spinal cord, and nervous system disorders',
  },
  {
    id: '10',
    title: 'Ophthalmology',
    icon: require('../../assets/images/specializations/ophthalmology.png'),
    color: '#00897B',
    description: 'Eye care and vision problems',
  },
  {
    id: '11',
    title: 'Otolaryngology',
    subtitle: 'ENT',
    icon: require('../../assets/images/specializations/otolaryngology.png'),
    color: '#00796B',
    description: 'Ear, nose, and throat conditions',
  },
  {
    id: '12',
    title: 'Dentistry',
    icon: require('../../assets/images/specializations/dentstry.png'),
    color: '#4DB6AC',
    description: 'Oral health and dental care',
  },
  {
    id: '13',
    title: 'Radiology',
    subtitle: 'Imaging',
    icon: require('../../assets/images/specializations/radiology.png'),
    searchRank: 3,
    color: '#80CBC4',
    description: 'Medical imaging and diagnostic procedures',
  },
  {
    id: '14',
    title: 'Oncology',
    icon: require('../../assets/images/specializations/oncology.png'),
    color: '#4DD0E1',
    description: 'Cancer diagnosis and treatment',
  },
  {
    id: '15',
    title: 'Endocrinology',
    icon: require('../../assets/images/specializations/endocrinology.png'),
    color: '#26C6DA',
    description: 'Hormones and metabolic disorders',
  },
  {
    id: '16',
    title: 'Nephrology',
    icon: require('../../assets/images/specializations/nephrology.png'),
    color: '#00BCD4',
    description: 'Kidney diseases and disorders',
  },
  {
    id: '17',
    title: 'Pulmonology',
    icon: require('../../assets/images/specializations/pulmonology.png'),
    color: '#0097A7',
    description: 'Respiratory system and lung diseases',
  },
  {
    id: '18',
    title: 'Gastroenterology',
    icon: require('../../assets/images/specializations/gastroenterology.png'),
    color: '#00ACC1',
    description: 'Digestive system and GI tract disorders',
  },
  {
    id: '19',
    title: 'Allergy & Immunology',
    icon: require('../../assets/images/specializations/allergy-immunology.png'),
    color: '#26A69A',
    description: 'Allergies and immune system disorders',
  },
  {
    id: '20',
    title: 'Hematology',
    icon: require('../../assets/images/specializations/hematology.png'),
    color: '#009688',
    description: 'Blood disorders and diseases',
  },
  {
    id: '21',
    title: 'Rheumatology',
    icon: require('../../assets/images/specializations/rheumatology.png'),
    color: '#00897B',
    description: 'Autoimmune and joint diseases',
  },
  {
    id: '22',
    title: 'Urology',
    icon: require('../../assets/images/specializations/urology.png'),
    color: '#00796B',
    description: 'Urinary tract and male reproductive system',
  },
  {
    id: '23',
    title: 'Emergency Medicine',
    icon: require('../../assets/images/specializations/emergency-medicine.png'),
    color: '#EF5350',
    description: 'Acute and emergency medical care',
  },
  {
    id: '24',
    title: 'Surgery',
    icon: require('../../assets/images/specializations/surgery.png'),
    color: '#42A5F5',
    description: 'Surgical procedures and operations',
  },
  {
    id: '25',
    title: 'Anesthesiology',
    icon: require('../../assets/images/specializations/anesthesiology.png'),
    color: '#AB47BC',
    description: 'Anesthesia and pain management',
  },
  {
    id: '26',
    title: 'Rehabilitation Medicine',
    subtitle: 'PT',
    icon: require('../../assets/images/specializations/rehabilitation-medicine.png'),
    color: '#66BB6A',
    description: 'Physical therapy and rehabilitation',
  },
  {
    id: '27',
    title: 'Geriatrics',
    icon: require('../../assets/images/specializations/geriatrics.png'),
    color: '#FFA726',
    description: 'Healthcare for elderly patients',
  },
  {
    id: '28',
    title: 'Public Health',
    subtitle: 'Preventive Medicine',
    icon: require('../../assets/images/specializations/public-health.png'),
    color: '#26A69A',
    description: 'Population health and disease prevention',
  },
];
