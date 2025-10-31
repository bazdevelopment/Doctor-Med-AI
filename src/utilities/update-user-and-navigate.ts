import { queryClient } from '@/api';
import { IOnboardingCollectedData } from '@/app/onboarding';
import { CrashlyticsLogLevel } from '@/crashlytics/crashlytics.types';
import { router } from 'expo-router';
import { CustomerInfo } from 'react-native-purchases';

export const updateUserAndNavigate = async ({
  userId,
  language,
  collectedData,
  customerInfo,
  onUpdateUser,
  logEvent,
  setIsFirstTime,
  allowAppAccess,
}: {
  allowAppAccess: string;
  userId: string;
  language: string;
  collectedData: IOnboardingCollectedData;
  customerInfo: CustomerInfo;
  setIsFirstTime: (value: boolean) => void;
  logEvent: (message: string, level?: CrashlyticsLogLevel) => Promise<void>;
  onUpdateUser: ({
    language,
    userId,
    fieldsToUpdate,
  }: {
    language: string;
    userId: string;
    fieldsToUpdate: object;
  }) => Promise<void>;
}) => {
  await updateUserAfterSelectingPlan({
    language,
    userId,
    collectedData,
    customerInfo,
    onUpdateUser,
  })
    .then(() => {
      queryClient.setQueryData(['user-info'], (oldData: IUserInfo) => ({
        ...oldData,
        isOnboarded: true,
        isFreeTrialOngoing: false,
      }));
      queryClient.invalidateQueries({ queryKey: ['user-info'] });

      if (allowAppAccess === 'false') {
        router.back();
      } else {
        router.navigate('/(app)');
      }
      setIsFirstTime(false);
      logEvent(
        `User ${userId} has been onboarded successfully and selected ${collectedData.selectedPackage} plan and is redirected to home screen`
      );
    })
    .catch((e) => {
      console.log('error', e);
      // !updateUserAfterSelectingPlan will throw an error if the google modal for subscription is shown and the user close the modal (without paying)
    });
};

export const updateUserAfterSelectingPlan = async ({
  language,
  userId,
  collectedData,
  customerInfo,
  onUpdateUser,
}: {
  language: string;
  userId: string;
  collectedData: { preferredName: string };
  customerInfo: CustomerInfo;
  onUpdateUser: ({
    language,
    userId,
    fieldsToUpdate,
  }: {
    language: string;
    userId: string;
    fieldsToUpdate: object;
  }) => Promise<void>;
}) => {
  const fieldsToUpdate: Partial<IUserInfo> = {
    isOnboarded: true,
    ...(collectedData.preferredName && {
      userName: collectedData.preferredName,
    }),
    isFreeTrialOngoing: !!customerInfo?.activeSubscriptions?.length
      ? false
      : true,
    ...(customerInfo && {
      activeSubscriptionsRevenue: customerInfo.activeSubscriptions,
      allExpirationDatesRevenue: customerInfo.allExpirationDates,
      allPurchaseDatesRevenue: customerInfo.allPurchaseDates,
      allPurchasedProductIdentifiersRevenue:
        customerInfo.allPurchasedProductIdentifiers,
      firstSeenRevenue: customerInfo.firstSeen,
    }),
  };

  // Guard clause to ensure onUpdateUser is a function
  // If onUpdateUser is undefined, return a resolved Promise
  if (typeof onUpdateUser !== 'function') {
    console.error('onUpdateUser is not a function');
    return Promise.resolve(); // Resolved Promise to ensure .then() is called
  }

  // Otherwise, call onUpdateUser and return its Promise
  return onUpdateUser({
    language,
    userId,
    fieldsToUpdate,
  });
};
