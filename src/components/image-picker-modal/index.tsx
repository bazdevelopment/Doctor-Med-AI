import React from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useMediaPiker } from '@/lib/hooks/use-media-picker';
import { translate } from '@/lib';

type ImagePickerModalProps = {
  title?: string;
  data?: string[];
  isVisible: boolean;
  onCancelPress?: () => void;
  onBackdropPress?: () => void;
  onPress?: (result: any) => void;
  onChooseImageFromGallery: () => void;
  onChooseFromFiles: () => void;
  onTakePhoto: () => void;
};

export const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  title = '',
  isVisible,
  onCancelPress,
  onBackdropPress,
  onChooseImageFromGallery,
  onChooseFromFiles,
  onTakePhoto,
}) => {
  const data = [
    {
      title: translate('components.ImagePickerModal.photoLibrary'),
      icon: 'photo-library',
      action: onChooseImageFromGallery,
    },
    {
      title: translate('components.ImagePickerModal.takePhoto'),
      icon: 'photo-camera',
      action: onTakePhoto,
    },
    {
      title: translate('components.ImagePickerModal.chooseFile'),
      icon: 'folder',
      action: onChooseFromFiles,
    },
  ];

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onBackdropPress}
    >
      <Pressable className="flex-1 bg-black/40 " onPress={onBackdropPress}>
        <View className="bg-neutral-800 rounded-2xl w-72 overflow-hidden shadow-lg bottom-20 absolute left-20 flex-1">
          {title ? (
            <Text className="text-gray-300 text-center text-sm py-2 border-b border-neutral-700">
              {title}
            </Text>
          ) : null}

          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.action}
              className={`flex-row items-center justify-between px-4 py-3 border-b border-neutral-700 ${
                index === data.length - 1 ? 'border-b-0' : ''
              }`}
            >
              <Text className="text-white text-base">{item.title}</Text>
              <MaterialIcons name={item.icon as any} size={22} color="white" />
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            className=" bg-neutral-800 rounded-2xl w-72 py-1 py-4 shadow-lg border-t border-neutral-700 "
            onPress={onCancelPress}
          >
            <Text className="text-white text-lg text-base font-semibold-work-sans px-4">
              {translate('general.cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};
