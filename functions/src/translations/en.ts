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
};
