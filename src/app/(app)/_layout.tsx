import { Redirect, Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';

import { colors, SafeAreaView } from '@/components/ui';
import { HomeIcon } from '@/components/ui/icons';
import { ChatIcon } from '@/components/ui/icons/chat';
import { StethoscopeIcon } from '@/components/ui/icons/stethoscope';
import { WheelIcon } from '@/components/ui/icons/wheel';
import { DEVICE_TYPE } from '@/utilities/device-type';
import { useUser } from '@/api/user/user.hooks';
import { useIsFirstTime, useSelectedLanguage } from '@/lib';
import { firebaseAuth } from '@/firebase/config';
import { useInitializeRevenueCat } from '@/api/subscription/subscription.hooks';
import InitialLoadSpinner from '@/components/initial-load-spinner.ts';
import { useCrashlytics } from '@/lib/hooks/use-crashlytics';
import { useIsOnboarded } from '@/lib/hooks/use-is-onboarded';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { language } = useSelectedLanguage();

  const { data: userInfo, isPending: isPendingUserinfo } = useUser(language);
  const { isPending: isPendingRevenueCatSdkInit } = useInitializeRevenueCat(
    firebaseAuth.currentUser?.uid as string
  );
  const isLoggedIn = !!firebaseAuth.currentUser?.uid;

  const { logEvent } = useCrashlytics();
  const [isFirstTime] = useIsFirstTime();
  const [isOnboardingRunning] = useIsOnboarded();

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
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <HomeIcon color={color} isFocused={focused} isDark={isDark} />
            ),
            header: () => null,
            tabBarButtonTestID: 'home-tab',
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: 'Chat',
            tabBarIcon: ({ color, focused }) => (
              <ChatIcon color={color} isFocused={focused} isDark={isDark} />
            ),
            header: () => null,
            tabBarButtonTestID: 'chat-tab',
          }}
        />
        <Tabs.Screen
          name="doctors"
          options={{
            title: 'AI Doctors',
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
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <WheelIcon color={color} isFocused={focused} isDark={isDark} />
            ),
            tabBarButtonTestID: 'settings-tab',
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
