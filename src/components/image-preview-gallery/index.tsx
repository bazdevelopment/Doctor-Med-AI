import React from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface IMediPickerFile {
  id: string;
  fileUri: string;
  fileName: string;
  fileMimeType: string;
  fileExtension: string;
}

interface ImagePreviewGalleryProps {
  files: IMediPickerFile[];
  onRemoveFile: (fileId: string) => void;
}

const ImagePreviewGallery: React.FC<ImagePreviewGalleryProps> = ({
  files,
  onRemoveFile,
}) => {
  if (files.length === 0) {
    return null; // Don't render anything if there are no files
  }

  return (
    <View className="p-2 border-t border-gray-200 dark:border-gray-700">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {files.map((file) => (
          <View key={file.id} className="w-20 h-20 rounded-xl m-1 relative">
            <Image
              source={{ uri: file.fileUri || file?.uri }}
              className="w-full h-full rounded-xl"
              resizeMode="cover"
            />
            {/* Remove Button */}
            <TouchableOpacity
              className="absolute -top-1 -right-1 w-6 h-6 bg-black/60 rounded-full justify-center items-center border-2 border-white"
              onPress={() => onRemoveFile(file.id)}
            >
              <Ionicons name="close" size={16} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ImagePreviewGallery;
