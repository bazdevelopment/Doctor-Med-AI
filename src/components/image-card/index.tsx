import { TouchableOpacity, View } from 'react-native';

import { Image, Text } from '../ui';

export interface IMedicalImageCard {
  id: string;
  title: string;
  image: any; // Use require() for local images or URI string
  description: string;
  category: string;
}

interface ImageCardProps {
  item: IMedicalImageCard;
  onPress: () => void;
  compact?: boolean;
}
const ImageCard: React.FC<ImageCardProps> = ({
  item,
  onPress,
  compact = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-black ${
        compact ? 'mr-3' : 'mb-4 w-[48%]'
      }`}
      activeOpacity={0.7}
    >
      <View
        className={`${compact ? 'h-[64px] w-[96px]' : 'h-32'} items-center justify-center`}
      >
        <Image source={item.image} className="size-full" contentFit="cover" />
      </View>
      <View
        className={`bg-white p-3 dark:bg-[#001A33] ${compact ? 'py-2' : ''}`}
      >
        <Text
          className={`text-center font-semibold-work-sans text-gray-800 ${compact ? 'text-base' : 'text-base'}`}
        >
          {item.title}
        </Text>
        {!compact && (
          <Text className="mt-1 text-xs text-gray-500" numberOfLines={2}>
            {item.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default ImageCard;
