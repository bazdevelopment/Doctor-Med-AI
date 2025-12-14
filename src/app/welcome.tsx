import React from 'react';
import {
  Keyboard,
  Linking,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import { useCreateAnonymousAccount } from '@/api/user/user.hooks';
import Branding from '@/components/branding';
import { Button, SafeAreaView, Text } from '@/components/ui';
import { WelcomeIllustration } from '@/components/ui/illustrations/welcome';
import { firebaseAuth } from '@/firebase/config';
import { translate, useIsFirstTime, useSelectedLanguage } from '@/lib';
import { useStoreUserId } from '@/lib/hooks/use-store-user-id';
import getDeviceSizeCategory from '@/utilities/get-device-size-category';

const Welcome = () => {
  const { isVerySmallDevice, isLargeDevice } = getDeviceSizeCategory();
  const [storedUserId, setUserId] = useStoreUserId();
  const { language } = useSelectedLanguage();
  const [_, setIsFirstTime] = useIsFirstTime();
  // const [isOnboarded] = useIsOnboarded();

  const onSuccessHandler = (userId: string) => {
    //update internal storage with userId and set is first time when opening the app to false
    setUserId(userId);
    setIsFirstTime(false);
    // !isOnboardingRunning
    //   ? router.navigate('/onboarding')
    //   : router.navigate('/(app)');
  };

  const { mutate: onCreateAnonymousAccount, isPending: isLoginPending } =
    useCreateAnonymousAccount(onSuccessHandler);

  return (
    <ScrollView
      contentContainerClassName="bg-white dark:bg-transparent"
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView>
        <View className="items-center justify-center px-6 pb-32 pt-14">
          <Branding isLogoVisible invertedColors />
          <Text className="my-10 text-center font-bold-poppins text-[30px] text-primary-900">
            {translate('rootLayout.screens.welcome.heading')}
          </Text>

          <WelcomeIllustration
            width={isVerySmallDevice ? 250 : 300}
            height={isVerySmallDevice ? 250 : 300}
          />
          <View
            className={`mt-16 ${isLargeDevice ? 'mt-20 w-[50%]' : 'w-full'}`}
          >
            <Button
              label={translate('rootLayout.screens.welcome.startButton')}
              variant="default"
              className="h-[55px] rounded-xl bg-primary-900 pl-5 dark:bg-primary-900"
              textClassName="font-semibold-poppins text-lg dark:text-white "
              iconPosition="left"
              loading={isLoginPending}
              onPress={() => {
                onCreateAnonymousAccount({
                  username: '-',
                  language,
                  // submit the stored user id, otherwise check for firebase uid
                  //do not rely only on firebaseAuth.currentUser?.uid,because if the user logs out it will become undefined, but the storedUserId will still be populated
                  actualUserId: storedUserId || firebaseAuth.currentUser?.uid,
                });
                Keyboard.dismiss();
              }}
            />

            {/* TODO: add the button "Already have an account" */}
            {/* <Button
              label={translate('rootLayout.screens.welcome.accountButton')}
              variant="default"
              className="h-[55px] w-full rounded-xl border-2 border-primary-900 bg-white pl-5 dark:bg-primary-200"
              textClassName="text-lg text-center text-primary-900"
              iconPosition="left"
              onPress={() => router.navigate('/login')}
            /> */}
          </View>

          <View className="mt-6 w-full flex-row flex-wrap items-center justify-center px-12">
            <Text className="text-sm">
              {translate('general.agreeingMessage')}{' '}
            </Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://medstudyaitermsconditions.netlify.app/'
                )
              }
            >
              <Text className="text-sm text-primary-900 dark:text-primary-900">
                {translate('general.termsAndConditions')}
              </Text>
            </TouchableOpacity>
            <Text className="text-sm"> {translate('general.and')} </Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://medstudyaiprivacy.netlify.app/')
              }
            >
              <Text className="text-sm text-primary-900 dark:text-primary-900">
                {translate('general.privacyPolicy')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Welcome;
