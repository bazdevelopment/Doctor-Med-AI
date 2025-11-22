import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

import { generateUniqueId } from '@/utilities/generate-unique-id';

const Chat = () => {
  const { topic = '' } = useLocalSearchParams();

  useEffect(() => {
    router.navigate({
      pathname: '/chat-screen',
      params: {
        conversationId: generateUniqueId(),
        mediaSource: '',
        mimeType: '',
        topic,
      },
    });
  }, []);
  return null;
};

export default Chat;
