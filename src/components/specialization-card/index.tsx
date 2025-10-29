import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { colors, Image, Text } from '../ui';
import { DoubleArrowRight } from '../ui/icons/double-arrow-right';

export interface MedicalSpecialization {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  color: string;
  searchRank?: number; // For most searched specializations
  description: string;
}

// Individual Specialization Card Component
interface SpecializationCardProps {
  item: MedicalSpecialization;
  onPress: () => void;
}

const SpecializationCard: React.FC<SpecializationCardProps> = ({
  item,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg- mb-2 flex-row items-center justify-between rounded-2xl border border-primary-900/60 p-3 shadow-sm dark:bg-[#001A33]"
      activeOpacity={0.7}
    >
      <View className="flex-1 flex-row items-center">
        {/* Icon Container */}
        <View className="mr-4  size-[60px] items-center justify-center rounded-xl">
          <Image source={item.icon} className="size-[70px]" />
        </View>

        {/* Title and Subtitle */}
        <View className="flex-1">
          <Text className="font-semibold-work-sans text-lg text-gray-800 dark:text-white">
            {item.title}
          </Text>
          {item.subtitle && (
            <Text className="mt-0.5 text-gray-500">{item.subtitle}</Text>
          )}
        </View>
      </View>

      {/* Info Button */}
      <DoubleArrowRight width={24} height={24} color={colors.primary[900]} />
    </TouchableOpacity>
  );
};

export default SpecializationCard;
