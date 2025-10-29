import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '../ui';
import { DoubleArrowRight } from '../ui/icons/double-arrow-right';

interface IMedicalCardProps {
  item: IMedicalCardItem;
}

export interface IMedicalCardItem {
  id: string;
  title: string;
  icon: React.ReactElement;
  bgColor: string;
  onPress?: () => void;
}

const MedicalCard: React.FC<IMedicalCardProps> = ({ item }) => {
  return (
    <TouchableOpacity
      onPress={item.onPress}
      className={`${item.bgColor} m-1 w-[50%] min-w-[160px] flex-1 flex-row items-center justify-between rounded-3xl p-4 shadow-lg`}
      activeOpacity={0.8}
    >
      <View>
        <View className="mb-2 flex-row items-center justify-between">
          {/* <View className="rounded-2xl bg-white/20 p-3">{item.icon}</View> */}
          {item.icon}
        </View>

        <Text className="font-semibold-work-sans text-xl  text-white">
          {item.title}
        </Text>
      </View>
      <DoubleArrowRight width={24} height={24} right={-10} />
    </TouchableOpacity>
  );
};

export default MedicalCard;
