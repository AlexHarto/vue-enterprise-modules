<template>
  <div
    :class="{
      'bg-info-bg border-info-border text-info-text':
        notification.type === NotificationType.INFO,
      'bg-warning-bg border-warning-border text-warning-text':
        notification.type === NotificationType.WARNING,
      'bg-error-bg border-error-border text-error-text':
        notification.type === NotificationType.ERROR,
    }"
    class="border rounded flex flex-col shadow-md p-4"
    data-test="notification"
  >
    <header class="flex font-semibold -mt-2 mb-2 items-center justify-between">
      <div v-if="notification.title" data-test="notification-title">
        {{ notification.title }}
      </div>
      <div
        v-if="notification.closable"
        data-test="notification-close"
        role="button"
        tabindex="0"
        @keypress.space="removeNotification(notification.id)"
        @click="removeNotification(notification.id)"
      >
        <BasIcon
          icon="close"
          class="cursor-pointer h-4 transition-all stroke-2 w-4 hover:stroke-3 hover:scale-105"
          data-test="notification-close-icon"
        />
      </div>
    </header>
    <section class="flex items-center">
      <div v-if="notification.icon" class="mr-2">
        <BasIcon
          class="h-8 w-8"
          data-test="notification-icon"
          :icon="notification.type"
        />
      </div>
      <div class="w-full" data-test="notification-message">
        {{ notification.message }}
        <slot :name="`content_${notification.id}`"></slot>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import BasIcon from '@/components/BasIcon.vue';
import { NotificationType, useNotifications } from '../..';
import type { Notification } from '../../infra/types/Notification';

defineProps<{
  notification: Notification;
}>();

const { removeNotification } = useNotifications();
</script>
