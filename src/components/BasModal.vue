<template>
  <dialog id="modalDialog" class="dialog">
    <h2 v-if="title" class="text-lg font-semibold mb-2">{{ title }}</h2>
    <slot name="message"></slot>
    <slot></slot>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    open: boolean;
    title: string;
  }>(),
  {
    title: '',
    open: false,
  }
);

const isOpen = ref(false);

watch(
  () => props.open,
  (newValue) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modal = document.querySelector('#modalDialog') as any;
    if (modal) {
      if (isOpen.value !== newValue) {
        isOpen.value = newValue;
        modal.showModal();
      }
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.dialog {
  @apply border-2 bg-light-50 rounded border-primary-border max-w-[50ch] shadow-lg;
}
.dialog::backdrop {
  background-color: hsla(0, 0%, 0%, 0.4);
}
</style>
