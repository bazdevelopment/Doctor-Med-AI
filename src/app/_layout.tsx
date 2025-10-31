// Import  global CSS file
import '../../global.css';

import {
  useFonts,
  WorkSans_300Light,
  WorkSans_400Regular,
  WorkSans_600SemiBold,
  WorkSans_700Bold,
  WorkSans_800ExtraBold,
} from '@expo-google-fonts/work-sans';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { APIProvider } from '@/api';
import { hydrateAuth, loadSelectedTheme, translate } from '@/lib';
import { useThemeConfig } from '@/lib/use-theme-config';
import { colors } from '@/components/ui';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(app)',
};

hydrateAuth();
loadSelectedTheme();
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Font-Regular': WorkSans_400Regular,
    'Font-SemiBold': WorkSans_600SemiBold,
    'Font-Light': WorkSans_300Light,
    'Font-Bold': WorkSans_700Bold,
    'Font-Medium': WorkSans_400Regular,
    'Font-Extra-Bold': WorkSans_800ExtraBold,
  });

  const [appIsReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Keep the splash screen visible while we load fonts
        await SplashScreen.preventAutoHideAsync();

        // Check if fonts are loaded
        if (fontsLoaded) {
          setAppReady(true);
          await SplashScreen.hideAsync();
        }
      } catch (error) {
        console.error('Error preparing app:', error);
      }
    };

    prepareApp();

    // Fallback: Hide splash screen after 3 seconds even if fonts are not loaded because sometimes I notices the app remains stuck on splash screen because the fonts were not loaded (mainly android)
    const timeout = setTimeout(async () => {
      setAppReady(true);
      await SplashScreen.hideAsync();
      setAppReady(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [fontsLoaded]);

  // Render nothing until the app is ready
  if (!appIsReady) {
    return null;
  }
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen
          name="welcome"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="paywall-new"
          options={{
            headerShown: false,
            gestureEnabled: false,
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="chat-screen"
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="no-internet"
          options={{
            headerShown: false,
            gestureEnabled: false,
            presentation: 'fullScreenModal',
          }}
        />
        <Stack.Screen
          name="new-app-version"
          options={{
            headerShown: false,
            gestureEnabled: false,
            presentation: 'fullScreenModal',
          }}
        />
        <Stack.Screen
          name="notifications"
          options={{
            header: (props) => (
              <CustomHeader
                {...props}
                title={translate('rootLayout.screens.notifications.title')}
                titlePosition="center"
                onGoBack={router.back}
                backIconColor={isDark ? colors.white : colors.black}
              />
            ),
          }}
        />
        <Stack.Screen
          name="rate"
          options={{
            header: (props) => (
              <CustomHeader
                {...props}
                title={translate('rootLayout.screens.rate.title')}
                titlePosition="center"
                onGoBack={router.back}
                backIconColor={isDark ? colors.white : colors.black}
              />
            ),
          }}
        />
        <Stack.Screen
          name="citations"
          options={{
            header: (props) => (
              <CustomHeader
                {...props}
                title={translate('settings.citations')}
                titleClassName="text-black"
                titlePosition="center"
                onGoBack={router.back}
                backIconColor={isDark ? colors.white : colors.black}
              />
            ),
          }}
        />
        <Stack.Screen
          name="contact-us"
          options={{
            header: (props) => (
              <CustomHeader
                {...props}
                title={translate('settings.contactUs')}
                titlePosition="center"
                onGoBack={router.back}
                titleClassName="text-black"
                backIconColor={isDark ? colors.white : colors.black}
              />
            ),
          }}
        />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeConfig();
  return (
    <GestureHandlerRootView
      style={styles.container}
      className={theme.dark ? `dark` : undefined}
    >
      <KeyboardProvider>
        <ThemeProvider value={theme}>
          <APIProvider>
            <BottomSheetModalProvider>
              {children}
              <FlashMessage position="top" />
            </BottomSheetModalProvider>
          </APIProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
