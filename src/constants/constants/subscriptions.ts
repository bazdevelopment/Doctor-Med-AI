import { Platform } from 'react-native';

export const SUBSCRIPTIONS_PLANS_ANDROID = {
  MONTHLY: 'doctor_med_ai_1month_subscription:monthly-subscription',
  YEARLY: 'doctor_med_ai_1year_subscription_v2:yearly-subscription',
  WEEKLY: 'doctor_med_ai_1week_subscription_v2:weekly-subscription',
};

export const SUBSCRIPTIONS_PLANS_IOS = {
  MONTHLY: 'doctor_med_ai_1month_subscription',
  YEARLY: 'doctor_med_ai_1year_subscription',
  WEEKLY: 'doctor_med_ai_1week_subscription',
};

export const SUBSCRIPTION_PLANS_PER_PLATFORM = Platform.select({
  android: {
    MONTHLY: SUBSCRIPTIONS_PLANS_ANDROID.MONTHLY,
    YEARLY: SUBSCRIPTIONS_PLANS_ANDROID.YEARLY,
    WEEKLY: SUBSCRIPTIONS_PLANS_ANDROID.WEEKLY,
  },
  ios: {
    MONTHLY: SUBSCRIPTIONS_PLANS_IOS.MONTHLY,
    YEARLY: SUBSCRIPTIONS_PLANS_IOS.YEARLY,
    WEEKLY: SUBSCRIPTIONS_PLANS_IOS.WEEKLY,
  },
});
