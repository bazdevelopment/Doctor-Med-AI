import { useScrollToTop } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { RefreshControl } from 'react-native';

import { useFetchUserNotifications } from '@/api/push-notifications/push-notifications.hooks';
import { useGetCustomerInfo } from '@/api/subscription/subscription.hooks';
import { useUser } from '@/api/user/user.hooks';
import CustomHomeHeader from '@/components/custom-home-header';
import DisclaimerBanner from '@/components/disclaimer-banner';
import MedicalCardsList from '@/components/medical-cards-list';
import MedicalImagesGallery from '@/components/medical-images-gallery';
import MedicalSpecializationsPreview from '@/components/medical-specialization-preview';
import { type INotificationItem } from '@/components/notifications/notification-item/notification-item.interface';
import { ScrollView } from '@/components/ui';
import { useSelectedLanguage } from '@/lib';
import useRemoteConfig from '@/lib/hooks/use-remote-config';

export default function Home() {
  const { language } = useSelectedLanguage();
  const { SHOW_MEDICAL_DISCLAIMER_BANNER } = useRemoteConfig();
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);
  const { data: userInfo, refetch: refetchUserInfo } = useUser(language);
  const scrollViewRef = useRef(null);

  const { data: userNotifications } = useFetchUserNotifications({
    userId: userInfo?.userId,
    language,
  })();

  const unReadMessages = userNotifications?.notifications.filter(
    (notification: INotificationItem) => !notification.isRead
  ).length;

  const { data: _customerInfo, refetch: refetchCustomerInfo } =
    useGetCustomerInfo();

  const { refetch: refetchUserNotifications } = useFetchUserNotifications({
    userId: userInfo?.userId,
    language,
  })();

  // Only show refresh control when manually refreshing, not on background refetch
  const isRefreshing = isManualRefreshing;

  const onFullSync = async () => {
    setIsManualRefreshing(true);

    try {
      await Promise.all([
        refetchUserInfo(),
        refetchUserNotifications(),
        refetchCustomerInfo(),
      ]);

      // Add minimum delay to prevent too fast refresh
      await new Promise((resolve) => setTimeout(resolve, 800));
    } finally {
      setIsManualRefreshing(false);
    }
  };

  useScrollToTop(scrollViewRef);
  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
      refreshControl={
        <RefreshControl onRefresh={onFullSync} refreshing={isRefreshing} />
      }
    >
      <CustomHomeHeader unReadMessages={unReadMessages} />
      {SHOW_MEDICAL_DISCLAIMER_BANNER && <DisclaimerBanner />}
      <MedicalCardsList className="p-3" />
      <MedicalImagesGallery className="mt-2" />
      <MedicalSpecializationsPreview />
    </ScrollView>
  );
}
