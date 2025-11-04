import { View } from 'react-native';

import Icon from '@/components/icon';

import { type INotificationIcon } from './notification-icon.interface';
import { colors } from '@/components/ui';
import { NotificationBell } from '@/components/ui/icons/notification-bell';
import icon from '@/components/icon';

const NotificationIcon = ({ isRead }: INotificationIcon) => {
  const baseClasses = 'rounded-full items-center justify-center';

  return (
    <View className={baseClasses}>
      <Icon
        icon={<NotificationBell color={colors.white} isRead={isRead} />}
        size={32}
      />
    </View>
  );
};
export default NotificationIcon;
