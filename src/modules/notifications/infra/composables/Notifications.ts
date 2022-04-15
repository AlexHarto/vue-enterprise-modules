import { reactive } from 'vue';
import type { Notification } from '../types/Notification';
import { defaultNotificationOptions } from '../types/NotificationOptions';

const activeNotifications = reactive<Notification[]>([]);

const useNotifications = (
  options: NotificationOptions = defaultNotificationOptions
) => {
  const addNotification = (notification: Notification) => {
    const foundIndex = activeNotifications.findIndex(
      (n) => n.id === notification.id
    );
    if (foundIndex < 0) {
      activeNotifications.push(notification);
      if (notification.closeAfterMs) {
        notification._closeAfterMsTimeoutId = setTimeout(() => {
          removeNotification(notification.id);
        }, notification.closeAfterMs);
      }
    } else if (!options.silent) {
      console.warn('addNotification: Notification id already registered.');
    }
  };

  const removeNotification = (id: string) => {
    const foundIndex = activeNotifications.findIndex((n) => n.id === id);
    if (foundIndex > -1) {
      const notification = activeNotifications[foundIndex];
      if (notification._closeAfterMsTimeoutId) {
        clearTimeout(notification._closeAfterMsTimeoutId as number);
      }
      activeNotifications.splice(foundIndex, 1);
    } else if (!options.silent) {
      console.warn('removeNotification: Notification id not found.');
    }
  };

  const removeAllNotifications = () => {
    activeNotifications.forEach((notification) => {
      removeNotification(notification.id);
    });
    activeNotifications.length = 0;
  };

  return {
    activeNotifications,
    addNotification,
    removeNotification,
    removeAllNotifications,
  };
};

export default useNotifications;
