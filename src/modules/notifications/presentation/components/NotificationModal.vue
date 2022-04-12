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
    class="flex flex-col p-4 border rounded shadow-md"
    data-test="notification"
  >
    <header class="flex items-center justify-between mb-2 -mt-2 font-semibold">
      <div v-if="notification.title">
        {{ notification.title }}
      </div>
      <div
        v-if="notification.closable"
        data-test="notification-close"
        @click="removeNotification(notification.id)"
      >
        <SvgIcon
          icon="close"
          class="w-4 h-4 transition-all cursor-pointer stroke-2 hover:stroke-3 hover:scale-105"
          data-test="notification-close-icon"
        />
      </div>
    </header>
    <section class="flex items-center">
      <div v-if="notification.icon" class="mr-2">
        <SvgIcon
          class="w-8 h-8"
          data-test="notification-icon"
          :icon="notification.type"
        />
      </div>
      <div class="w-full">
        {{ notification.message }}
        <slot :name="`content_${notification.id}`"></slot>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';
import { NotificationType, useNotifications } from '../..';
import type { Notification } from '../../infra/types/Notification';

defineProps<{
  notification: Notification;
}>();

const { removeNotification } = useNotifications();
</script>
