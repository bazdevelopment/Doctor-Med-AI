import React from 'react';
import { View, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, Text } from '@/components/ui';
import { useColorScheme } from 'nativewind';

// MediaPreview Component
interface MediaPreviewProps {
  media: MediaFile;
  onRemove: () => void;
}

export const MediaPreview: React.FC<MediaPreviewProps> = ({
  media,
  onRemove,
}) => {
  return (
    <View className="relative mr-2 h-20 w-20">
      {media.type === 'image' || media.type === 'video' ? (
        <Image
          source={{ uri: media.uri }}
          className="h-full w-full rounded-xl"
          resizeMode="cover"
        />
      ) : (
        <View className="h-full w-full items-center justify-center rounded-xl bg-gray-200 dark:bg-gray-700">
          <Ionicons
            name="document-text"
            size={32}
            color={colors.primary[900]}
          />
          <Text
            className="mt-1 text-xs text-gray-600 dark:text-gray-400"
            numberOfLines={1}
          >
            {media.name?.slice(0, 8)}
          </Text>
        </View>
      )}

      {media.type === 'video' && (
        <View className="absolute inset-0 items-center justify-center">
          <View className="h-8 w-8 items-center justify-center rounded-full bg-black/50">
            <Ionicons name="play" size={20} color={colors.white} />
          </View>
        </View>
      )}

      <TouchableOpacity
        onPress={onRemove}
        className="absolute -right-2 -top-2 h-6 w-6 items-center justify-center rounded-full bg-red-500"
      >
        <Ionicons name="close" size={16} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

// MediaPickerModal Component
interface MediaPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectCamera: () => void;
  onSelectImages: () => void;
  onSelectVideo: () => void;
  onSelectDocument: () => void;
  canAddImages: boolean;
  canAddVideo: boolean;
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  visible,
  onClose,
  onSelectCamera,
  onSelectImages,
  onSelectVideo,
  onSelectDocument,
  canAddImages,
  canAddVideo,
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const options = [
    {
      icon: 'camera',
      label: 'Camera',
      color: '#00BFA6',
      onPress: onSelectCamera,
      disabled: !canAddImages,
    },
    {
      icon: 'images',
      label: 'Photos',
      color: '#FF6B6B',
      onPress: onSelectImages,
      disabled: !canAddImages,
    },
    {
      icon: 'videocam',
      label: 'Video',
      color: '#4ECDC4',
      onPress: onSelectVideo,
      disabled: !canAddVideo,
    },
    {
      icon: 'document-text',
      label: 'Document',
      color: '#FFD93D',
      onPress: onSelectDocument,
      disabled: false,
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 items-center justify-end bg-black/50"
        onPress={onClose}
      >
        <Pressable
          className="w-full rounded-t-3xl bg-white px-6 pb-8 pt-6 dark:bg-[#161B22]"
          onPress={(e) => e.stopPropagation()}
        >
          {/* Handle bar */}
          <View className="mb-6 h-1 w-12 self-center rounded-full bg-gray-300 dark:bg-gray-600" />

          <Text className="mb-6 font-bold-work-sans text-xl text-gray-900 dark:text-white">
            Add Media
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={option.onPress}
                disabled={option.disabled}
                className="mb-4 w-[48%] items-center"
              >
                <View
                  className="mb-3 h-16 w-16 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: option.disabled
                      ? isDark
                        ? colors.gray[700]
                        : colors.gray[300]
                      : `${option.color}20`,
                  }}
                >
                  <Ionicons
                    name={option.icon as any}
                    size={28}
                    color={
                      option.disabled
                        ? isDark
                          ? colors.charcoal[600]
                          : colors.charcoal[400]
                        : option.color
                    }
                  />
                </View>
                <Text
                  className={`font-semibold-work-sans text-sm ${
                    option.disabled
                      ? 'text-gray-400 dark:text-gray-600'
                      : 'text-gray-800 dark:text-white'
                  }`}
                >
                  {option.label}
                </Text>
                {option.disabled && (
                  <Text className="mt-1 text-xs text-gray-400 dark:text-gray-600">
                    Limit reached
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            onPress={onClose}
            className="mt-4 rounded-2xl bg-gray-100 py-4 dark:bg-gray-800"
          >
            <Text className="text-center font-semibold-work-sans text-base text-gray-800 dark:text-white">
              Cancel
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
