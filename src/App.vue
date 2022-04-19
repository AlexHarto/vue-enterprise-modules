<template>
  <div class="relative w-screen h-screen">
    <RouterView />
    <NotificationsContainer>
      <template #notification1>
        <p>{{ t('notifications.notification1.message1') }}</p>
        <p>{{ t('notifications.notification1.message2') }}</p>
      </template>
    </NotificationsContainer>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { RouterView } from 'vue-router';
import {
  NotificationsContainer,
  NotificationType,
  useNotifications,
} from './modules/notifications';

const { t } = useI18n();

const notifications = useNotifications();

notifications.addNotification({
  id: 'notification1',
  type: NotificationType.INFO,
  title: t('notifications.notification1.title'),
  icon: true,
  closable: true,
  closeAfterMs: 2000,
});

notifications.addNotification({
  id: 'notification2',
  type: NotificationType.ERROR,
  title: t('notifications.notification2.title'),
  message: t('notifications.notification2.message'),
  icon: true,
  closable: true,
  closeAfterMs: 3000,
});
</script>
