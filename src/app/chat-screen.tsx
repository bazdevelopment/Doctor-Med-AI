import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { router, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BlurView } from '@react-native-community/blur';

import {
  Animated,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import { Toaster } from 'sonner-native';
import { twMerge } from 'tailwind-merge';

import {
  useAllUserConversations,
  useConversationHistory,
  useSendStreamingMessage,
} from '@/api/conversation/conversation.hooks';
import { useUser } from '@/api/user/user.hooks';

import Icon from '@/components/icon';

import AnimatedChatQuestions from '@/components/animated-questions';
import CustomAlert from '@/components/custom-alert';

import { LockerIcon } from '@/components/ui/icons/locker';
import { wait } from '@/utilities/wait';
import {
  MAX_CONVERSATIONS_ALLOWED_FREE_TRIAL,
  BLURRING_CONTENT_CONVERSATIONS_LIMIT,
} from '@/constants/constants/limits';
import { colors, SafeAreaView, Text } from '@/components/ui';
import { shuffleArray } from '@/utilities/shuffle-array';
import { useTextToSpeech } from '@/lib/hooks/use-text-to-speech';
import { translate, useSelectedLanguage } from '@/lib';
import useBackHandler from '@/lib/hooks/use-back-handler';
import { DEVICE_TYPE } from '@/utilities/device-type';
import { generateUniqueId } from '@/utilities/generate-unique-id';
import { useClipboard } from '@/lib/hooks/use-clipboard';
import { SoundOn } from '@/components/ui/icons/sound-on';
import { StopIcon } from '@/components/ui/icons/stop';
import CopyIcon from '@/components/ui/icons/copy';
import { CopiedIcon } from '@/components/ui/icons/copied';
import { AddMediaPicker } from '@/components/ui/icons/add-media-picker';
import { ImagePickerModal } from '@/components/image-picker-modal';
import { useMediaPiker } from '@/lib/hooks/use-media-picker';
import ImagePreviewGallery from '@/components/image-preview-gallery';
import { RobotIcon } from '@/components/ui/icons/robot';
import { SendIcon } from '@/components/ui/icons/send';
import {
  shouldRequestInAppRating,
  requestAppRatingWithDelayStorage,
} from '@/utilities/request-app-review';
import useSubscriptionAlert from '@/lib/hooks/use-subscription-banner';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { CloseIcon } from '@/components/ui/icons/close';
import Toast from '@/components/toast';
import MessageMediaAttachments from '@/components/message-media-attachments';
import useRemoteConfig from '@/lib/hooks/use-remote-config';
import { Env } from '@/lib/env';

type MessageType = {
  role: string;
  content: string;
  isPending?: boolean;
  isError?: boolean;
  imageUrls?: string[];
};
const RANDOM_QUESTIONS = [
  translate('rootLayout.screens.chatScreen.randomQuestions.one'),
  translate('rootLayout.screens.chatScreen.randomQuestions.two'),
  translate('rootLayout.screens.chatScreen.randomQuestions.three'),
  translate('rootLayout.screens.chatScreen.randomQuestions.four'),
  translate('rootLayout.screens.chatScreen.randomQuestions.five'),
  translate('rootLayout.screens.chatScreen.randomQuestions.six'),
  // translate('rootLayout.screens.chatScreen.randomQuestions.seven'),
  translate('rootLayout.screens.chatScreen.randomQuestions.eight'),
  translate('rootLayout.screens.chatScreen.randomQuestions.nine'),
  translate('rootLayout.screens.chatScreen.randomQuestions.ten'),
  translate('rootLayout.screens.chatScreen.randomQuestions.eleven'),
  translate('rootLayout.screens.chatScreen.randomQuestions.twelve'),
  translate('rootLayout.screens.chatScreen.randomQuestions.thirteen'),
  translate('rootLayout.screens.chatScreen.randomQuestions.fourteen'),
  translate('rootLayout.screens.chatScreen.randomQuestions.fifteen'),
];

const BlurredMessageOverlay = ({
  onUnlock,
  isDark,
}: {
  onUnlock: () => void;
  isDark: boolean;
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Gentle pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1100,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1100,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <TouchableOpacity
      className="absolute inset-0 top-[30%] items-center justify-center rounded-2xl"
      onPress={onUnlock}
      activeOpacity={1}
    >
      {DEVICE_TYPE.IOS ? (
        <BlurView
          blurAmount={2}
          blurType={isDark ? 'dark' : 'light'}
          style={[StyleSheet.absoluteFill]}
        />
      ) : (
        <View className="absolute inset-0 bg-slate-100/95 dark:bg-blackBeauty/95" />
      )}
      <TouchableOpacity
        onPress={onUnlock}
        className="items-center justify-center"
        activeOpacity={0.7}
      >
        <View className="rounded-full border-2 border-charcoal-300 p-[3px] dark:border-charcoal-500 dark:bg-charcoal-800">
          <Animated.View
            style={{
              transform: [{ scale: pulseAnim }],
            }}
            className="border-1 items-center justify-center rounded-full border-charcoal-700 bg-[#2196F3] p-4 shadow-lg"
          >
            <LockerIcon width={22} height={22} fill={colors.white} />
          </Animated.View>
        </View>

        <Text className="mt-2 rounded-full bg-white p-2 text-center font-semibold-poppins text-base text-gray-800 dark:bg-blackEerie dark:text-white">
          {translate('general.unlockNow')} 🔓
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export const ChatBubble = ({
  message,
  isUser,
  isRobot,
  onRetrySendMessage,
  speak,
  isSpeaking,
  shouldBlur = false,
  onUnlock,
}: {
  message: MessageType;
  isUser: boolean;
  isRobot: boolean;
  onRetrySendMessage: () => void;
  speak: (text: string) => void;
  isSpeaking: boolean;
  shouldBlur?: boolean;
  onUnlock?: () => void;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const { copyToClipboard, copiedText } = useClipboard();
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const { lightStyles, darkStyles } = getChatMessagesStyles(
    message,
    isUser,
    colors
  );

  return (
    <>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
        className={twMerge(
          'py-3 my-1 rounded-2xl flex-row items-end relative',
          isUser
            ? 'px-4 bg-primary-900 dark:bg-primary-900 self-end rounded-tr-none'
            : isRobot
              ? 'pr-1 bg-slate-100 dark:bg-black self-start rounded-tl-none mr-[30] border-2 border-primary-900 bg-primary-50'
              : 'pr-1 bg-slate-100 dark:bg-black self-start rounded-tl-none mr-[30]',
          message.isError && 'bg-red-100'
        )}
      >
        {!isUser &&
          (isRobot ? (
            <Icon
              icon={<RobotIcon color={colors.primary[900]} />}
              size={30}
              containerStyle="mr-2 mt-2 h-10 w-10 self-start rounded-full"
            />
          ) : (
            <Image
              source={require('../assets/images/random/assistant-avatar-3.jpg')}
              className="mr-2 h-8 w-8 self-start rounded-full"
            />
          ))}
        {/* <Text
          className={twMerge(
            'text-base',
            isUser ? 'text-white' : 'text-gray-800 dark:text-white',
            message.isError && 'text-red-800',
          )}
        > */}
        <Markdown style={isDark ? darkStyles : lightStyles}>
          {message.content}
        </Markdown>

        {shouldBlur && !isUser && onUnlock && (
          <BlurredMessageOverlay onUnlock={onUnlock} isDark={isDark} />
        )}
      </Animated.View>
      {isUser && message?.imageUrls?.length > 0 && (
        <MessageMediaAttachments
          urls={message.imageUrls}
          isUser={isUser}
          onDocumentPress={(url) => {
            // Optional: Custom handler for document press
            // e.g., open in a WebView, download, etc.
            // Linking.openURL(url);
          }}
        />
      )}
      {!shouldBlur && (
        <View className="item-center mt-1 flex-row gap-4">
          {!isUser && (
            <TouchableOpacity
              className="rounded-full p-1"
              onPress={() => {
                copyToClipboard(message.content);
                Toast.success(translate('general.copyText.copied'), {
                  style: { marginTop: 50 },
                  closeButton: true,
                });
              }}
            >
              {!!copiedText ? (
                <CopiedIcon
                  width={20}
                  height={20}
                  color={colors.primary[900]}
                />
              ) : (
                <CopyIcon width={20} height={20} color={colors.primary[900]} />
              )}
            </TouchableOpacity>
          )}

          {!isUser && !!speak && (
            <View className="h-9">
              {isSpeaking ? (
                <TouchableOpacity onPress={() => speak(message.content)}>
                  <StopIcon
                    width={22}
                    height={22}
                    top={3}
                    color={colors.primary[900]}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => speak(message.content)}>
                  <SoundOn width={20} height={20} top={3} />
                </TouchableOpacity>
              )}
            </View>
          )}
          {isSpeaking && !isUser && (
            <LottieView
              source={require('../assets/lottie/speaking-animation.json')}
              autoPlay
              loop
              style={{ width: 30, height: 30 }}
            />
          )}

          {message.isError && (
            <TouchableOpacity
              className="ml-2 flex-1 flex-row justify-end  gap-1"
              onPress={onRetrySendMessage}
            >
              <Text className="mt-1 text-xs text-red-500">
                {translate('general.tryAgain')}
              </Text>
              <Ionicons name="refresh-circle" size={24} color="#EF4444" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
};

let globalHasRequested = false;

export function useRequestAppRatingOnce({
  isLoading,
  isFetchingAllConversationsPending,
  userInfo,
  requestAppRatingWithDelayStorage,
  canRequestInAppRating,
}: {
  isLoading: boolean;
  isFetchingAllConversationsPending: boolean;
  userInfo?: { completedScans?: number };
  requestAppRatingWithDelayStorage: (delay: number) => void;
  canRequestInAppRating: boolean;
}) {
  const hasRequestedRef = useRef(globalHasRequested);

  useEffect(() => {
    if (hasRequestedRef.current || globalHasRequested) return;

    if (
      !isLoading &&
      !isFetchingAllConversationsPending &&
      canRequestInAppRating &&
      userInfo?.completedScans === 1
    ) {
      hasRequestedRef.current = true;
      globalHasRequested = true;
      requestAppRatingWithDelayStorage(1000);
    }
  }, [
    isLoading,
    isFetchingAllConversationsPending,
    userInfo?.completedScans,
    requestAppRatingWithDelayStorage,
    canRequestInAppRating,
  ]);
}
export const TypingIndicator = () => {
  return (
    <LottieView
      source={require('../assets/lottie/typing-loader-animation.json')}
      autoPlay
      loop
      style={{ width: 80, height: 80, marginLeft: -15, top: -25 }}
    />
  );
};

const ChatScreen = () => {
  const { conversationId = generateUniqueId(), topic } = useLocalSearchParams();

  const [userMessage, setUserMessage] = useState('');
  const [pendingMessages, setPendingMessages] = useState<MessageType[]>([]);

  const [isStreaming, setIsStreaming] = useState(false);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(
    null
  );

  const [lastUserMessageIndex, setLastUserMessageIndex] = useState<
    number | null
  >(null);

  const { language: appLanguage } = useSelectedLanguage();
  const selectedLanguage = appLanguage;

  const flashListRef = useRef<FlashList<MessageType>>(null);
  const [randomQuestions, setRandomQuestions] = useState<string[]>([]);
  const {
    speak,
    stop: stopSpeaking,
    isSpeaking,
  } = useTextToSpeech({
    preferredGender: 'female',
  });

  const [isVisible, setVisible] = useState(false);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const {
    i18n: { language },
  } = useTranslation();

  const { data: userInfo } = useUser(language);

  const { data: conversation, isLoading: isLoadingConversation } =
    useConversationHistory(conversationId as string);

  const { canRequest: canRequestInAppRating } = shouldRequestInAppRating();

  const showPicker = () => setVisible(true);
  const closePicker = () => setVisible(false);

  const {
    onChooseImageFromGallery,
    onChooseFromFiles,
    onTakePhoto,
    files,
    onRemoveFile,
    onResetFiles,
  } = useMediaPiker({ onCloseModal: closePicker });

  const { data, isPending: isFetchingAllConversationsPending } =
    useAllUserConversations();
  const { AI_ANALYSIS_PROMPT_FIREBASE } = useRemoteConfig();

  const conversationsCount = data?.count || 0;
  // Hooks for messaging
  const { sendStreamingMessage } = useSendStreamingMessage();
  const { isUpgradeRequired } = useSubscriptionAlert();

  const handleSpeak = (messageId: string, text: string) => {
    if (currentlySpeakingId === messageId) {
      setCurrentlySpeakingId(null);
      speak(text);
      wait(50).then(() => stopSpeaking());
    } else {
      setCurrentlySpeakingId(messageId);
      stopSpeaking();
      speak(text);
    }
  };

  const handleRetryMessage = async (message: MessageType) => {
    try {
      // Mark the message as pending again
      setPendingMessages((prev) =>
        prev.map((msg) =>
          msg.content === message.content
            ? {
                ...msg,
                isPending: true,
                isError: false,
                imageUrls: mediaFiles?.map((img) => img.uri),
              }
            : msg
        )
      );

      const mediaFiles = files?.map((file) => ({
        uri: file?.fileUri || file?.uri || '',
        type: file?.type || '',
        mimeType: file?.mimeType || '',
      }));

      await sendStreamingMessage({
        prompt:
          AI_ANALYSIS_PROMPT_FIREBASE || Env.EXPO_PUBLIC_AI_ANALYSIS_PROMPT,
        userMessage: message.content
          ? message.content
          : mediaFiles.length
            ? translate('general.analyzingMediaFilesPlaceholder')
            : '',
        conversationId: conversationId as string,
        userId: userInfo.userId,
        history: conversation?.messages || [],
        mediaFiles,
        language: selectedLanguage,
        onStream: (chunk: string) => {},
        onComplete: (fullResponse: string) => {
          setIsStreaming(false);
          onResetFiles?.();
        },
        onError: (error: Error) => {
          // console.error('Error sending message:', error);
          setIsStreaming(false);
          Toast.error('Failed to send message. Please try again.');
        },
      });
      // Remove the pending message and add it to the conversation
      setPendingMessages((prev) =>
        prev.filter((msg) => msg.content !== message.content)
      );
    } catch (error) {
      // console.error('Error retrying message:', error);
      // Mark the message as failed again
      setPendingMessages((prev) =>
        prev.map((msg) =>
          msg.content === message.content
            ? {
                ...msg,
                isPending: false,
                isError: true,
              }
            : msg
        )
      );
    }
  };

  const handleSendMessage = async (userMsg: string) => {
    if (!userMsg.trim() && !files?.length) return;
    setUserMessage('');

    Keyboard.dismiss();
    // Check limits
    if (
      isUpgradeRequired &&
      conversationsCount >= MAX_CONVERSATIONS_ALLOWED_FREE_TRIAL
    ) {
      return Toast.showCustomToast(
        <CustomAlert
          title={translate('general.attention')}
          subtitle={translate('alerts.chatAndMediaFilesLimit')}
          buttons={[
            {
              label: translate('components.UpgradeBanner.heading'),
              variant: 'default',
              onPress: () =>
                wait(500).then(() => router.navigate('/paywall-new')),
              buttonTextClassName: 'dark:text-white',
              className:
                'flex-1 rounded-xl h-[48] bg-primary-900 active:opacity-80 dark:bg-primary-900',
            },
          ]}
        />,
        {
          position: 'middle',
          duration: Infinity,
        }
      );
    }

    // Convert files to MediaFile format
    const mediaFiles = files?.map((file) => ({
      uri: file?.fileUri || file?.uri || '',
      type: file?.type || '',
      mimeType: file?.mimeType || '',
    }));

    // Add the message to pending messages
    const newMessage: MessageType = {
      role: 'user',
      content: !!userMsg?.trim()
        ? userMsg
        : !!mediaFiles?.length
          ? translate('general.analyzingMediaFilesPlaceholder')
          : '',
      isPending: true,
      imageUrls: mediaFiles.map((img) => img.uri),
    };
    setPendingMessages((prev) => [...prev, newMessage]);
    // Store the index of the user's message
    setLastUserMessageIndex(messages.length);

    // Reset streaming message
    setIsStreaming(true);

    try {
      await sendStreamingMessage({
        prompt:
          AI_ANALYSIS_PROMPT_FIREBASE || Env.EXPO_PUBLIC_AI_ANALYSIS_PROMPT,
        userMessage: !!userMsg?.trim()
          ? userMsg
          : !!mediaFiles?.length
            ? translate('general.analyzingMediaFilesPlaceholder')
            : '',
        conversationId: conversationId as string,
        userId: userInfo.userId,
        history: conversation?.messages || [],
        mediaFiles,
        language: selectedLanguage,
        onStream: (chunk: string) => {},
        onComplete: (fullResponse: string) => {
          setIsStreaming(false);
          onResetFiles?.();
        },
        onError: (error: Error) => {
          // console.error('Error sending message:', error);
          setIsStreaming(false);
          Toast.error('Failed to send message. Please try again.');
        },
      });

      // Remove the pending message and add it to the conversation
      setPendingMessages((prev) =>
        prev.filter((msg) => msg.content !== newMessage.content)
      );
    } catch (error) {
      // console.error('Error sending message:', error);
      setIsStreaming(false);
      setPendingMessages((prev) =>
        prev.map((msg) =>
          msg.content === newMessage.content
            ? { ...msg, isPending: false, isError: true }
            : msg
        )
      );
    }
  };

  const handleUnlockMessage = () => {
    router.navigate('/paywall-new');
  };
  const mockMessage = [
    {
      content: translate('general.chatBotPlaceholder', { topic }),
      role: 'robot',
    },
  ];
  // Combine conversation messages with streaming message
  const messages: MessageType[] = useMemo(
    () => [
      ...(topic && mockMessage),

      ...(conversation?.messages?.filter(
        (msg: ConversationMessage) => !Array.isArray(msg.content)
      ) || []),
      ...pendingMessages,
    ],
    [conversation?.messages, pendingMessages]
  );

  useBackHandler(() => true);

  // Scroll logic
  useEffect(() => {
    if (messages.length && flashListRef.current) {
      setTimeout(() => {
        if (lastUserMessageIndex !== null) {
          flashListRef.current?.scrollToIndex({
            index: lastUserMessageIndex,
            animated: true,
            viewPosition: 0,
          });
        } else {
          flashListRef.current?.scrollToOffset({
            offset: 0,
            animated: true,
          });
        }
      }, 100);
    }
  }, [messages, lastUserMessageIndex]);

  // Scroll when keyboard appears
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        flashListRef.current?.scrollToOffset({
          offset: 100000,
          animated: true,
        });
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (!topic) {
      setRandomQuestions(shuffleArray(RANDOM_QUESTIONS).slice(0, 5));
    }
  }, [topic]);

  useRequestAppRatingOnce({
    isLoading: isLoadingConversation,
    isFetchingAllConversationsPending,
    userInfo,
    requestAppRatingWithDelayStorage,
    canRequestInAppRating,
  });
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-transparent">
      {DEVICE_TYPE.IOS && (
        <Toaster autoWiggleOnUpdate="toast-change" pauseWhenPageIsHidden />
      )}
      {/* <KeyboardAwareScrollView
        contentContainerStyle={{
          //   paddingBottom: isKeyboardVisible && DEVICE_TYPE.ANDROID ? 100 : 0,
          flex: 1,
        }}
        keyboardShouldPersistTaps="handled"
        // bottomOffset={500}
      > */}
      <KeyboardAvoidingView
        behavior="padding"
        className="flex-1"
        keyboardVerticalOffset={DEVICE_TYPE.ANDROID ? 40 : 0}
      >
        <View className="flex-1 bg-white dark:bg-transparent">
          {/* Header */}
          <View className="flex-row items-center  border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-600 dark:bg-transparent">
            <Icon
              size={26}
              // containerStyle="rounded-full dark:bg-white p-1"
              onPress={() => {
                stopSpeaking();
                router.push('/(app)');
              }}
              icon={
                <CloseIcon
                  innerColor={isDark ? 'transparent' : colors.white}
                  color={isDark ? colors.white : colors.black}
                />
              }
            />
            <View className="justify-center items-center flex-1 flex-row -left-2">
              <Image
                source={require('../assets/images/random/assistant-avatar-3.jpg')}
                className="mr-2 h-8 w-8 rounded-full"
              />
              <View className="ml-2">
                <Text className="font-bold-poppins text-xl dark:text-white">
                  Dr. Med
                </Text>
                {isStreaming ? (
                  <Text className="text-xs text-gray-500 dark:text-white">
                    {translate('general.typing')}
                  </Text>
                ) : (
                  <View className="flex-row items-center gap-2">
                    <View className="h-2 w-2 rounded-full bg-success-400" />
                    <Text className="text-xs text-gray-500 dark:text-white">
                      {translate('general.online')}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Random Questions for New Conversations (only if no topic) */}
          {!topic && !messages.length && !!RANDOM_QUESTIONS.length && (
            <ScrollView
              contentContainerClassName="h-[90%] justify-end"
              keyboardShouldPersistTaps="handled"
            >
              <AnimatedChatQuestions
                questions={randomQuestions}
                onSelect={(question) => {
                  if (
                    isUpgradeRequired &&
                    conversationsCount >= MAX_CONVERSATIONS_ALLOWED_FREE_TRIAL
                  ) {
                    return Toast.showCustomToast(
                      <CustomAlert
                        title={translate('general.attention')}
                        subtitle={translate('alerts.chatAndMediaFilesLimit')}
                        buttons={[
                          {
                            label: translate(
                              'components.UpgradeBanner.heading'
                            ),
                            variant: 'default',
                            onPress: () =>
                              wait(500).then(() =>
                                router.navigate('/paywall-new')
                              ),
                            buttonTextClassName: 'dark:text-white',
                            className:
                              'flex-1 rounded-xl h-[48] bg-primary-900 active:opacity-80 dark:bg-primary-900',
                          },
                        ]}
                      />,
                      {
                        position: 'middle',
                        duration: Infinity,
                      }
                    );
                  }
                  handleSendMessage(question);
                }}
              />
            </ScrollView>
          )}

          {/* Messages List */}
          <FlashList
            ref={flashListRef}
            data={messages}
            extraData={[
              isSpeaking,
              isUpgradeRequired,
              conversationsCount,
              isStreaming,
            ]}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              padding: 16,
              paddingBottom: 8,
            }}
            renderItem={({ item, index }) => {
              const isAssistantMessage = item.role !== 'user';
              const isFreeTrialLimitReached =
                isUpgradeRequired &&
                conversationsCount >= BLURRING_CONTENT_CONVERSATIONS_LIMIT;

              const shouldBlurMessage =
                isFreeTrialLimitReached && isAssistantMessage && index >= 1;
              return (
                <ChatBubble
                  message={item}
                  isUser={item.role === 'user'}
                  isRobot={item.role === 'robot'}
                  onRetrySendMessage={() => handleRetryMessage(item)}
                  speak={(text) => handleSpeak(index.toString(), text)}
                  isSpeaking={currentlySpeakingId === index.toString()}
                  shouldBlur={shouldBlurMessage}
                  onUnlock={handleUnlockMessage}
                />
              );
            }}
            estimatedItemSize={100}
            ListFooterComponent={isStreaming ? <TypingIndicator /> : null}
          />

          {/* File Preview */}
          {!!files?.length && !isStreaming && (
            <ImagePreviewGallery files={files} onRemoveFile={onRemoveFile} />
          )}

          {/* Input Area */}
          <View className="border-t border-gray-200 bg-white px-4 pb-2 pt-4 dark:border-blackEerie dark:bg-transparent flex-row">
            <View
              className={`flex-row items-center rounded-full border-2 border-primary-900/60 bg-gray-100 px-4 py-1.5 dark:bg-transparent flex-1 ${userMessage.length > 30 && 'rounded-lg'}`}
            >
              <Icon
                icon={<AddMediaPicker />}
                size={30}
                color={colors.white}
                containerStyle="-left-2 border-white border-[1.5px] rounded-full"
                onPress={() => {
                  if (
                    isUpgradeRequired &&
                    conversationsCount >= MAX_CONVERSATIONS_ALLOWED_FREE_TRIAL
                  ) {
                    return Toast.showCustomToast(
                      <CustomAlert
                        title={translate('general.attention')}
                        subtitle={translate('alerts.chatAndMediaFilesLimit')}
                        buttons={[
                          {
                            label: translate(
                              'components.UpgradeBanner.heading'
                            ),
                            variant: 'default',
                            onPress: () =>
                              wait(500).then(() =>
                                router.navigate('/paywall-new')
                              ),
                            buttonTextClassName: 'dark:text-white',
                            className:
                              'flex-1 rounded-xl h-[48] bg-primary-900 active:opacity-80 dark:bg-primary-900',
                          },
                        ]}
                      />,
                      {
                        position: 'middle',
                        duration: Infinity,
                      }
                    );
                  }
                  showPicker();
                }}
              />
              <TextInput
                className="flex-1 py-3 text-base text-gray-800 dark:text-white"
                value={userMessage}
                onChangeText={setUserMessage}
                placeholder={translate('general.chatbotPlaceholder')}
                placeholderTextColor={
                  isDark ? colors.charcoal[200] : colors.charcoal[800]
                }
                multiline
                maxLength={400}
                allowFontScaling={true}
              />
            </View>
            <TouchableOpacity
              onPress={() => handleSendMessage(userMessage)}
              disabled={
                isStreaming ||
                isFetchingAllConversationsPending ||
                (!userMessage.trim() && !files?.length)
              }
              className={twMerge(
                'ml-2 p-2 rounded-full w-[55px] h-[55px] items-center justify-center self-center',
                userMessage.trim() || !!files?.length
                  ? 'bg-primary-900 dark:bg-primary-900'
                  : 'bg-gray-300 dark:bg-charcoal-400'
              )}
            >
              <SendIcon />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <ImagePickerModal
        title=""
        data={['Select from the library', 'Take a picture', 'Choose file']}
        isVisible={isVisible}
        onCancelPress={closePicker}
        onBackdropPress={closePicker}
        onPress={(item) => {}}
        onChooseImageFromGallery={onChooseImageFromGallery}
        onChooseFromFiles={onChooseFromFiles}
        onTakePhoto={onTakePhoto}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;

type Message = {
  isError: boolean;
};

type Colors = {
  danger: Record<number, string>;
  white: string;
  charcoal: Record<number, string>;
};

type StyleObject = Record<string, React.CSSProperties>;

function getChatMessagesStyles(
  message: Message,
  isUser: boolean,
  colors: Colors
): {
  lightStyles: StyleObject;
  darkStyles: StyleObject;
} {
  const baseTextColor = message.isError
    ? colors.danger[800]
    : isUser
      ? colors.white
      : colors.charcoal[800];

  const darkTextColor = message.isError ? colors.danger[800] : colors.white;

  const lightStyles: StyleObject = {
    body: {
      marginTop: -7,
      marginBottom: -7,
      fontSize: 15,
      lineHeight: 22,
      color: baseTextColor,
    },
    heading1: {
      color: baseTextColor,
    },
    paragraph: {
      fontFamily: 'Font-Medium',
    },
    list_item: {
      fontFamily: 'Font-Medium',
    },
    code_inline: {
      backgroundColor: colors.primary[900],
      fontFamily: 'Font-Medium',
    },
    span: {
      fontFamily: 'Font-Medium',
    },
    strong: {
      fontFamily: 'Font-Extra-Bold',
      fontWeight: '800',
    },
    em: {
      fontFamily: 'Font-Medium',
      fontStyle: 'italic',
    },
  };

  const darkStyles: StyleObject = {
    body: {
      marginTop: -7,
      marginBottom: -7,
      fontSize: 15,
      lineHeight: 22,
      color: darkTextColor,
    },
    heading1: {
      fontFamily: 'Font-Extra-Bold',
      color: darkTextColor,
    },
    heading2: {
      fontFamily: 'Font-Extra-Bold',
      fontWeight: '800',
    },
    paragraph: {
      fontFamily: 'Font-Medium',
    },
    list_item: {
      fontFamily: 'Font-Medium',
    },
    code_inline: {
      backgroundColor: colors.primary[900],
      fontFamily: 'Font-Medium',
    },
    span: {
      fontFamily: 'Font-Medium',
    },
    strong: {
      fontFamily: 'Font-Extra-Bold',
      fontWeight: '800',
    },
    em: {
      fontFamily: 'Font-Regular',
      fontStyle: 'italic',
    },
  };

  return { lightStyles, darkStyles };
}
