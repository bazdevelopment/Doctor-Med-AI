import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';

import { colors } from '@/components/ui';
import { BotIcon, HomeIcon } from '@/components/ui/icons';
import { WheelIcon } from '@/components/ui/icons/wheel';
import { useAuth, useIsFirstTime } from '@/lib';

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  // const hideSplash = useCallback(async () => {
  //   await SplashScreen.hideAsync();
  // }, []);
  // useEffect(() => {
  //   if (status !== 'idle') {
  //     setTimeout(() => {
  //       hideSplash();
  //     }, 1000);
  //   }
  // }, [hideSplash, status]);

  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
        tabBarActiveTintColor: colors.primary[900],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon color={color} isFocused={focused} isDark={isDark} />
          ),
          tabBarButtonTestID: 'home-tab',
        }}
      />
      <Tabs.Screen
        name="doctors"
        options={{
          title: 'AI Doctors',
          tabBarIcon: ({ color, focused }) => (
            <BotIcon color={color} isFocused={focused} isDark={isDark} />
          ),
          tabBarButtonTestID: 'doctors-tab',
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
  );
}
