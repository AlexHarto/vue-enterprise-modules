<template>
  <div>
    <h1 class="mb-4 text-xl font-bold">Create a Retro room</h1>
    <p>
      Registered users will see here the previous rooms and some usefull
      statistics to measure the mood of the team.
    </p>
    <p class="mt-2">
      If you are not registered, you can still create a room, but it will be
      temporary and automatically removed after 4 hours of inactivity.
    </p>
    <h2 class="mt-6 mb-4 text-lg font-semibold">Create a new room</h2>
    <p>Type the name of the room and share it with your colleages.</p>
    <p class="mt-2">The room will be available for 4 hours.</p>
    <form class="flex items-end gap-2 mt-6" @submit.prevent>
      <BasInput
        name="room"
        label="Name of the room:"
        label-class="block mb-1 text-sm"
        placeholder="Type here..."
        class="w-full max-w-56"
      ></BasInput>
      <BasButton label="Create room" class="max-h-max bg-base-dark"></BasButton>
    </form>
    <div v-if="roomCreated" class="mt-6">
      <p>Room created!!! Here is the link for the room:</p>
      <div class="flex items-center gap-2 mt-4">
        <BasLink new-window :href="roomLink"></BasLink>
        <BasButton
          outline
          label="Copy link"
          class="max-h-max border-base-dark"
          @click="copyToClipboard"
        ></BasButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasButton from '@/components/BasButton.vue';
// import { useI18n } from 'vue-i18n';
import BasInput from '@/components/BasInput.vue';
import BasLink from '@/components/BasLink.vue';
import { NotificationType, useNotifications } from '@/modules/notifications';
import { ref } from 'vue';
// const { t } = useI18n();

const { addNotification } = useNotifications();

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
      title: 'Link copied!',
      message: 'Great! You have the link of the room on your clipboard.',
      closable: true,
      closeAfterMs: 5000,
    });
  } catch (err) {
    clipboardSuccess.value = false;
    addNotification({
      id: 'roomLinkClipboardError',
      type: NotificationType.ERROR,
      icon: true,
      title: 'Something wrong happened',
      message:
        'Oh oh. Looks like the room link cannot be copied to your clipboard. Please, do it manually by right-clicking the link and choosing "Copy link address".',
      closable: true,
    });
  }
};
</script>

<style scoped></style>
