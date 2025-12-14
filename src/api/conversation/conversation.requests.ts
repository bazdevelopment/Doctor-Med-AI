import { recordError } from '@react-native-firebase/crashlytics';
import storage from '@react-native-firebase/storage';

import { firebaseCloudFunctionsInstance } from '@/firebase/config';
import { uploadFilesToFirebase } from '@/firebase/utils';
import { generateUniqueId } from '@/utilities/generate-unique-id';

export const fetchConversation = async ({
  conversationId,
}: {
  conversationId: string;
}) => {
  try {
    const { data } = await firebaseCloudFunctionsInstance.httpsCallable(
      'getConversation'
    )({ conversationId });
    return data.conversation;
  } catch (error) {
    throw error;
  }
};

export const fetchAllUserConversations = async ({
  limit,
}: {
  limit: number;
}) => {
  try {
    const { data } = await firebaseCloudFunctionsInstance.httpsCallable(
      'getAllConversations'
    )({ limit });

    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export const analyzeImageUsingAiV2 = async (variables: {
  language: string;
  promptMessage: string;
  fileUri: string;
  userId: string;
}) => {
  try {
    const uniqueId = generateUniqueId();
    const storagePath = `interpretations/${variables.userId}/${uniqueId}`;

    const response = await uploadFilesToFirebase(
      [variables.fileUri],
      [storagePath]
    ).then(async ([storageUrl]) => {
      const onAnalyzeImageUsingAiV2 =
        firebaseCloudFunctionsInstance.httpsCallable(
          'analyzeImageConversationV2'
        );
      const { data } = await onAnalyzeImageUsingAiV2({
        image: storageUrl,
        language: variables.language,
        promptMessage: variables.promptMessage,
        storagePath,
      });
      return data;
    });

    return response;
  } catch (err: Error) {
    throw error.message;
  }
};

interface MediaFile {
  fileUri: string;
  id: string;
  url?: string; // If already uploaded
  type: 'image' | 'video' | 'pdf';
  mimeType?: string;
}
/**
 * Legacy function to match your existing API
 * Analyzes multiple images/videos/PDFs using AI
 */
export const sendChatMessageUsingAI = async (payload: {
  mediaFiles: MediaFile[];
  language: string;
  userMessage: string;
  userId: string;
  conversationId?: string;
}) => {
  try {
    // Upload all files and get URLs
    const fileUrls = await uploadAllFiles(payload.mediaFiles, payload.userId);
    // Call cloud function
    const sendChatMessageFn =
      firebaseCloudFunctionsInstance.httpsCallable('sendChatMessage');
    const { data } = await sendChatMessageFn({
      userId: payload.userId,
      conversationId: payload.conversationId,
      userMessage: payload.userMessage,
      language: payload.language,
      fileUrls,
      history: [],
      includePreviousHistory: true,
    });
    return data;
  } catch (error) {
    console.error('Error analyzing files:', error);
    throw error;
  }
};

const uploadImageToFirebase = async (
  imageUri: string,
  imageId: string,
  userId: string
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    // Update uploading state for this specific image

    // Generate unique ID for the file
    const uniqueId = generateUniqueId();
    const filePath = `interpretations/${userId}/${uniqueId}`;
    // Create reference to Firebase Storage
    const storageRef = storage.ref(filePath);
    // Start upload task

    const info = await FileSystem.getInfoAsync(imageUri);
    const task = storageRef.putFile(imageUri, {
      cacheControl: 'public, max-age=31536000',
      contentType: 'image/jpeg',
      customMetadata: {
        uploadedBy: userId,
        uploadedAt: new Date().toISOString(),
        originalName: `image_${imageId}`,
        uniqueId: uniqueId,
      },
    });

    // Track upload progress
    task.on(
      'state_changed',
      (taskSnapshot) => {
        const progress = Math.round(
          (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
        );

        console.log(`Upload ${imageId} progress: ${progress}%`);
      },
      (error) => {
        // Handle upload error
        console.error(`Upload error for ${imageId}:`, error.message);

        reject(error);
      },
      async () => {
        // Upload completed successfully
        try {
          const downloadURL = await storageRef.getDownloadURL();
          const getInterpretationMedia = (userId: string, mediaId: string) =>
            `https://firebasestorage.googleapis.com/v0/b/microscan-ai-${__DEV__ ? 'dev' : 'prod'}.firebasestorage.app/o/interpretations%2F${userId}%2F${mediaId}?alt=media`;

          //!not needed for now
          const url = getInterpretationMedia(userId, uniqueId);

          resolve(downloadURL);
        } catch (urlError) {
          recordError(
            urlError,
            'Error when uploading multiple images to storage'
          );
          console.error('Error getting download URL:', urlError);

          reject(urlError);
        }
      }
    );
  });
};

// // Upload all images to Firebase Storage
// const uploadAllImages = async (images, userId: string): Promise<string[]> => {
//   try {
//     const uploadPromises = images.map(async (image) => {
//       if (image.url) {
//         return image.url; // Already uploaded
//       }
//       return await uploadImageToFirebase(image.fileUri, image.id, userId);
//     });

//     const urls = await Promise.all(uploadPromises);
//     return urls;
//   } catch (error) {
//     throw error;
//   }
// };

const uploadToFirebaseStorage = async (
  localPath: string,
  conversationId: string
): Promise<string> => {
  const fileName = localPath?.split('/').pop()!;
  const ref = storage().ref(`interpretations/${conversationId}/${fileName}`);
  await ref.putFile(localPath);
  return await ref.getDownloadURL();
};

const uploadAllFiles = async (files: MediaFile[], conversationId: string) => {
  return Promise.all(
    files.map((f) => uploadToFirebaseStorage(f.uri, conversationId))
  );
};
