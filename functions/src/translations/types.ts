export interface ITranslation {
  common: {
    welcome: string;
    error: string;
    loading: string;
    noUserFound: string;
    userIdMissing: string;
    scanLimitReached: string;
    mandatoryLanguage: string;
  };
  loginUserAnonymously: {
    mandatoryUsername: string;
    userLoggedIn: string;
    accountCreated: string;
    error: string;
  };
  updateUserSubscription: {
    subscribeSuccess: string;
    updateSubscriptionError: string;
  };
  updateUserLanguage: {
    updateSuccess: string;
    updateError: string;
  };
  updateUser: {
    successUpdatedUser: string;
    updateUserError: string;
  };
  getUserInfo: {
    successGetInfo: string;
    errorGetInfo: string;
  };

  getUserInfoById: {
    noUserInfoData: string;
    getUserFetchError: string;
  };
  storeDeviceToken: {
    deviceTokenRequired: string;
    generalError: string;
  };

  sendGlobalPushNotifications: {
    requiredParams: string;
    generalError: string;
    generalErrorAdditional: string;
  };

  checkDeviceUniqueIdentifier: {
    deviceMandatory: string;
    languageMandatory: string;
    deviceIdentified: string;
    generalError: string;
  };

  getUserNotification: {
    generalError: string;
    generalErrorAdditional: string;
  };

  getScanCategories: {
    noCategoryFound: string;
    generalError: string;
  };

  uploadScanCategories: {
    successfullyUploaded: string;
    generalError: string;
  };

  sendUserNotification: {
    noTokenFound: string;
    generalError: string;
  };
}
