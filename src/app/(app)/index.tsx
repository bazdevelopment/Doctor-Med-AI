import React from 'react';

import CustomHomeHeader from '@/components/custom-home-header';
import MedicalCardsList from '@/components/medical-cards-list';
import MedicalImagesGallery from '@/components/medical-images-gallery';
import MedicalSpecializationsPreview from '@/components/medical-specialization-preview';
import { ScrollView } from '@/components/ui';
import { INotificationItem } from '@/components/notifications/notification-item/notification-item.interface';
import { useFetchUserNotifications } from '@/api/push-notifications/push-notifications.hooks';
import { useSelectedLanguage } from '@/lib';
import { useUser } from '@/api/user/user.hooks';

export default function Home() {
  const { language } = useSelectedLanguage();
  const { data: userInfo } = useUser(language);

  const { data: userNotifications } = useFetchUserNotifications({
    userId: userInfo?.userId,
    language,
  })();
  const unReadMessages = userNotifications?.notifications.filter(
    (notification: INotificationItem) => !notification.isRead
  ).length;
  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <CustomHomeHeader unReadMessages={unReadMessages} />
      <MedicalCardsList className="p-3" />
      <MedicalImagesGallery className="mt-2" />
      <MedicalSpecializationsPreview />
    </ScrollView>
  );
}
