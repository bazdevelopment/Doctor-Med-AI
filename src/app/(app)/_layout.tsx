import { Redirect, router, Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';
import * as QuickActions from 'expo-quick-actions';
import { useQuickActionRouting } from 'expo-quick-actions/router';
import { useNetInfo } from '@react-native-community/netinfo';

import { colors, SafeAreaView, useModal } from '@/components/ui';
import { HomeIcon, Settings } from '@/components/ui/icons';
import { ChatIcon } from '@/components/ui/icons/chat';
import { StethoscopeIcon } from '@/components/ui/icons/stethoscope';
import { DEVICE_TYPE } from '@/utilities/device-type';
import { useUser } from '@/api/user/user.hooks';
import { translate, useIsFirstTime, useSelectedLanguage } from '@/lib';
import { firebaseAuth } from '@/firebase/config';
import { useInitializeRevenueCat } from '@/api/subscription/subscription.hooks';
import InitialLoadSpinner from '@/components/initial-load-spinner.ts';
import { useCrashlytics } from '@/lib/hooks/use-crashlytics';
import { useIsOnboarded } from '@/lib/hooks/use-is-onboarded';
import { checkForAppUpdate } from '@/firebase/remote-config';
import useRemoteConfig from '@/lib/hooks/use-remote-config';
import { useHaptic } from '@/lib/hooks/use-haptics';
import { playSound } from '@/utilities/play-sound';
import usePushNotifications from '@/lib/hooks/use-push-notifications';
import { usePushNotificationToken } from '@/lib/hooks/use-push-notification-token';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { language } = useSelectedLanguage();
  const { isConnected } = useNetInfo();
  const modal = useModal();

  usePushNotifications(); // push notifications popup
  const { storeDeviceInfo } = usePushNotificationToken();

  const addSelectionHapticEffect = useHaptic('selection');
  const addHeavyHapticEffect = useHaptic('heavy');
  const { isPending: isPendingRevenueCatSdkInit } = useInitializeRevenueCat(
    firebaseAuth.currentUser?.uid as string
  );
  const { data: userInfo, isPending: isPendingUserinfo } = useUser(language);

  const isLoggedIn = !!firebaseAuth.currentUser?.uid;
  const { logEvent } = useCrashlytics();
  const [isFirstTime] = useIsFirstTime();
  const [isOnboardingRunning] = useIsOnboarded();

  useQuickActionRouting();

  const { MINIMUM_VERSION_ALLOWED } = useRemoteConfig();

  checkForAppUpdate(MINIMUM_VERSION_ALLOWED);

  useEffect(() => {
    // Guard clause: Skip logic if isConnected is null
    if (isConnected === null) return;

    if (!isConnected) {
      router.navigate('/no-internet');
      playSound('error');
      addHeavyHapticEffect?.();
    } else {
      modal.dismiss();
    }
  }, [isConnected, modal, addHeavyHapticEffect]);

  useEffect(() => {
    storeDeviceInfo();
  }, []);

  useEffect(() => {
    QuickActions.setItems<QuickActions.Action>([
      {
        title: translate('deleteApp.title'),
        subtitle: translate('deleteApp.subtitle'),
        icon: 'heart_icon',
        id: '0',
        params: { href: '/rate' },
      },
    ]);
  }, []);

  if (isPendingUserinfo || isPendingRevenueCatSdkInit)
    return <InitialLoadSpinner />;

  if (isFirstTime && !userInfo) {
    logEvent(`User ${userInfo?.userId} is redirected to welcome screen`);
    return <Redirect href="/welcome" />;
  }
  if (isFirstTime && !isLoggedIn) {
    logEvent(`User ${userInfo?.userId} is redirected to welcome screen`);
    return <Redirect href="/welcome" />;
  }
  if (isOnboardingRunning) {
    return <Redirect href="/onboarding" />;
  }
  if (!isPendingUserinfo && !isPendingRevenueCatSdkInit && !userInfo) {
    return <Redirect href="/welcome" />;
  }
  return (
    <SafeAreaView
      className="flex-1 bg-white dark:bg-transparent"
      edges={DEVICE_TYPE.ANDROID ? ['bottom'] : ['top']}
    >
      <Tabs
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
          tabBarActiveTintColor: colors.primary[900],
          tabBarInactiveTintColor: isDark ? colors.white : colors.charcoal[500],
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: translate('general.tabs.home'),
            tabBarIcon: ({ color, focused }) => (
              <HomeIcon color={color} isFocused={focused} isDark={isDark} />
            ),
            header: () => null,
            tabBarButtonTestID: 'home-tab',
          }}
          listeners={{
            tabPress: () => addSelectionHapticEffect?.(),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: translate('general.tabs.chat'),
            tabBarIcon: ({ color, focused }) => (
              <ChatIcon color={color} isFocused={focused} isDark={isDark} />
            ),
            header: () => null,
            tabBarButtonTestID: 'chat-tab',
          }}
          listeners={{
            tabPress: () => addSelectionHapticEffect?.(),
          }}
        />
        <Tabs.Screen
          name="doctors"
          options={{
            title: translate('general.tabs.aiDoctors'),
            tabBarIcon: ({ color, focused }) => (
              <StethoscopeIcon
                color={color}
                isFocused={focused}
                isDark={isDark}
              />
            ),
            tabBarButtonTestID: 'doctors-tab',
            header: () => null,
          }}
          listeners={{
            tabPress: () => addSelectionHapticEffect?.(),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: translate('general.tabs.settings'),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Settings color={color} isFocused={focused} isDark={isDark} />
            ),
            tabBarButtonTestID: 'settings-tab',
          }}
          listeners={{
            tabPress: () => addSelectionHapticEffect?.(),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
