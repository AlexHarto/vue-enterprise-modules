<template>
  <div>
    <h1 class="mb-4 text-xl font-bold">{{ t('rooms.create.title') }}</h1>
    <p>{{ t('rooms.create.advantages') }}</p>
    <p class="mt-2">{{ t('rooms.create.unregistered') }}</p>
    <h2 class="mt-6 mb-4 text-lg font-semibold">
      {{ t('rooms.create.create_new_room') }}
    </h2>
    <p>{{ t('rooms.create.name_share_intro') }}</p>
    <form class="flex items-end gap-2 mt-6" @submit.prevent>
      <div class="w-full max-w-[500px]">
        <BasInput
          v-model="roomName"
          name="room"
          label-class="block mb-1 text-sm"
          :label="t('rooms.create.name_of_the_room')"
        ></BasInput>
      </div>
      <BasButton
        class="bg-opacity-90 max-h-max bg-base-dark"
        :label="t('rooms.create.create_room')"
      ></BasButton>
    </form>
    <div v-if="roomCreated" class="mt-6">
      <p>{{ t('rooms.create.room_created') }}</p>
      <div class="flex items-center gap-2 mt-4">
        <BasLink new-window :href="roomLink"></BasLink>
        <BasButton
          outline
          class="max-h-max border-base-dark"
          :label="t('rooms.create.copy_link')"
          @click="copyToClipboard"
        ></BasButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasButton from '@/components/BasButton.vue';
import BasInput from '@/components/BasInput.vue';
import BasLink from '@/components/BasLink.vue';
import { NotificationType, useNotifications } from '@/modules/notifications';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { addNotification } = useNotifications();

const roomName = ref('');
const roomCreated = ref(true);
const roomLink = ref('https://localhost:3000');
const clipboardSuccess = ref(false);

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(roomLink.value);
    clipboardSuccess.value = true;
    addNotification({
      id: 'roomLinkClipboardSuccess',
      type: NotificationType.INFO,
      icon: true,
      title: t('rooms.notifications.clipboard_success.title'),
      message: t('rooms.notifications.clipboard_success.message'),
      closable: true,
      closeAfterMs: 5000,
    });
  } catch (err) {
    clipboardSuccess.value = false;
    addNotification({
      id: 'roomLinkClipboardError',
      type: NotificationType.ERROR,
      icon: true,
      title: t('rooms.notifications.clipboard_error.title'),
      message: t('rooms.notifications.clipboard_error.message'),
      closable: true,
    });
  }
};
</script>

<style scoped></style>
