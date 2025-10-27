import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';

import { colors, SafeAreaView } from '@/components/ui';
import { HomeIcon } from '@/components/ui/icons';
import { ChatIcon } from '@/components/ui/icons/chat';
import { StethoscopeIcon } from '@/components/ui/icons/stethoscope';
import { WheelIcon } from '@/components/ui/icons/wheel';
import { useAuth, useIsFirstTime } from '@/lib';
import { DEVICE_TYPE } from '@/utilities/device-type';

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView
      className="flex-1"
      edges={DEVICE_TYPE.ANDROID ? ['bottom'] : ['top']}
    >
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
