import type { ConfigContext, ExpoConfig } from '@expo/config';
import type { AppIconBadgeConfig } from 'app-icon-badge/types';

import { ClientEnv, Env } from './env';

const appIconBadgeConfig: AppIconBadgeConfig = {
  enabled: Env.APP_ENV !== 'production',
  badges: [
    {
      text: Env.APP_ENV,
      type: 'banner',
      color: 'white',
    },
    {
      text: Env.VERSION.toString(),
      type: 'ribbon',
      color: 'white',
    },
  ],
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  owner: Env.EXPO_ACCOUNT_OWNER,
  scheme: Env.SCHEME,
  slug: 'doctormedai',
  version: Env.VERSION.toString(),
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    appStoreUrl:
      'https://apps.apple.com/us/app/medical-assistant-ai-doctor/id6754875987',
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
    googleServicesFile: ClientEnv.GOOGLE_SERVICES_PLIST_PATH,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  experiments: {
    typedRoutes: true,
  },
  android: {
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.doctormedai',
    googleServicesFile: ClientEnv.GOOGLE_SERVICES_JSON_PATH,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    blockedPermissions: ['FOREGROUND_SERVICE_MEDIA_PLAYBACK'], // Android review didn't pass (permission used by expo-av)You
    package: Env.PACKAGE,
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
  },
  plugins: [
    [
      'expo-splash-screen',
      {
        backgroundColor: '#FFFFFF',
        image: './assets/icon_transparent.png',
        imageWidth: 150,
      },
    ],
    [
      'expo-font',
      {
        fonts: ['./assets/fonts/Inter.ttf'],
      },
    ],
    'expo-localization',
    [
      'expo-document-picker',
      {
        iCloudContainerEnvironment: 'Production',
      },
    ],
    'expo-router',
    [
      'expo-image-picker',
      {
        photosPermission:
          'Allow $(PRODUCT_NAME) to access your photo library to upload media for AI analysis, providing insights and feedback for informational purposes.',
        cameraPermission:
          'Allow $(PRODUCT_NAME) to access your camera to capture images for AI-powered analysis, providing insights and feedback for informational purposes.',
        //'Disables the microphone permission',
        microphonePermission: false,
      },
    ],
    ['app-icon-badge', appIconBadgeConfig],
    ['react-native-edge-to-edge'],
    '@react-native-firebase/app',
    '@react-native-firebase/auth',
    '@react-native-firebase/crashlytics',
    [
      'expo-build-properties',
      {
        android: {
          compileSdkVersion: 35,
          targetSdkVersion: 35,
          buildToolsVersion: '35.0.0',
        },
        ios: {
          useFrameworks: 'static',
        },
      },
    ],
    [
      'expo-quick-actions',
      {
        androidIcons: {
          heart_icon: {
            foregroundImage: './assets/heart-icon-android.png',
            backgroundColor: '#FFFFFF',
          },
        },
        iosIcons: {
          heart_icon: './assets/heart-icon-ios.png',
        },
      },
    ],
    [
      'expo-asset',
      {
        assets: ['./assets/icon_transparent.png'],
      },
    ],
  ],
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
});
