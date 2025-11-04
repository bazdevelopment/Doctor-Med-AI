import { type ITranslation } from './types';

export const en: ITranslation = {
  common: {
    welcome: 'Welcome',
    error: 'An error occurred',
    loading: 'Loading...',
    noUserFound: 'You are not authorized to make this request. Please log in',
    userIdMissing:
      'It looks like the user id is missing. Please provide it to proceed',
    scanLimitReached:
      'You’ve reached the maximum number of scans allowed. Please upgrade your plan to continue using the service',
    mandatoryLanguage: 'The language code is required',
  },
  loginUserAnonymously: {
    mandatoryUsername: "Choose a nickname and let's get started!",
    userLoggedIn: "Welcome back! You're in.",
    accountCreated: "You're in! Enjoy exploring!",
    error:
      'Oops! Something went wrong. Please check your connection and try again.',
  },
  updateUserSubscription: {
    subscribeSuccess: 'Successfully subscribed!',
    updateSubscriptionError: 'Unable to update user subscription!',
  },
  updateUserLanguage: {
    updateSuccess: 'Successfully updated the language!',
    updateError:
      'An unexpected error occurred while updating the language. Please try again later',
  },
  updateUser: {
    successUpdatedUser: 'User updated successfully',
    updateUserError: 'Unable to update the user record. Please try again.',
  },
  getUserInfo: {
    successGetInfo: 'Successfully fetched userInfo data',
    errorGetInfo:
      'An unexpected error occurred while fetching user information. Please try again later',
  },
  getUserInfoById: {
    noUserInfoData: 'The user document exists, but no data is available',
    getUserFetchError: 'An error occurred while fetching the user information',
  },
  storeDeviceToken: {
    deviceTokenRequired: 'Providing a device token is mandatory.',
    generalError: 'Error storing device token',
  },

  sendGlobalPushNotifications: {
    requiredParams: 'Notification title and body are mandatory.',
    generalError: 'An error occurred while processing notifications',
    generalErrorAdditional: 'Failed to send global notification',
  },

  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'Device ID is mandatory',
    languageMandatory: 'Language is mandatory',
    deviceIdentified: 'Your device has been identified successfully',
    generalError: 'An error occurred while checking device trial',
  },

  getUserNotification: {
    generalError: 'Failed to fetch user notifications',
    generalErrorAdditional:
      'An error occurred while fetching user notifications',
  },

  getScanCategories: {
    noCategoryFound: 'No categories found',
    generalError: 'An error occurred while retrieving scan categories',
  },

  uploadScanCategories: {
    successfullyUploaded: 'Scan categories uploaded successfully',
    generalError: 'Failed to upload scan categories',
  },

  sendUserNotification: {
    noTokenFound: 'No valid Expo tokens found. Unable to send notifications',
    generalError: 'Failed to send notification',
  },
};
