<template>
  <div class="absolute flex flex-col top-4 right-4">
    <transition-group name="group-fade" tag="div">
      <NotificationModal
        v-for="notification in activeNotifications"
        :key="notification.id"
        :notification="notification"
        class="mb-4 fade-item w-[350px]"
      >
        <template #[`content_${notification.id}`]>
          <slot :name="notification.id"></slot>
        </template>
      </NotificationModal>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useNotifications } from '../..';
import NotificationModal from './NotificationModal.vue';

const { activeNotifications } = useNotifications();
</script>
