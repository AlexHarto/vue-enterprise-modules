<template>
  <div class="h-screen relative">
    <RouterView />
    <NotificationsContainer class="mt-16">
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

const { addNotification } = useNotifications();

addNotification({
  id: 'notification1',
  type: NotificationType.INFO,
  title: t('notifications.notification1.title'),
  icon: true,
  closable: true,
  closeAfterMs: 2000,
});

addNotification({
  id: 'notification2',
  type: NotificationType.ERROR,
  title: t('notifications.notification2.title'),
  message: t('notifications.notification2.message'),
  icon: true,
  closable: true,
  closeAfterMs: 3000,
});
</script>

<style>
@import './styles/colors.css';
@import './styles/elevation.css';

body {
  @apply transition-colors;
  color: hsl(var(--color-light-black));
  background-color: hsl(var(--color-light-white));
}
body.dark {
  color: hsl(var(--color-dark-black));
  background-color: hsl(var(--color-dark-white));
}
</style>
