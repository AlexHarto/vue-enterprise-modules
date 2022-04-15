<template>
  <div class="flex items-center">
    <button
      v-if="checks"
      class="mr-2 w-5 h-5 text-white border border-white border-opacity-75 rounded transition-colors hover:(text-black bg-white bg-opacity-75)"
      @click="toggleChecked"
    >
      <SvgIcon
        v-if="isChecked"
        icon="check"
        class="w-5 h-5 p-0.5 transform -translate-x-0.2 -translate-y-0.2"
      ></SvgIcon>
    </button>
    <div class="flex-grow">{{ message.label }}</div>
    <button @click="toggleLiked">
      <transition :name="liked ? 'grow-fade' : 'fade'" mode="out-in">
        <SvgIcon
          v-if="liked"
          icon="heart-filled"
          class="w-6 h-6 transition-all transform opacity-100"
        ></SvgIcon>
        <SvgIcon
          v-else
          icon="heart"
          class="w-6 h-6 transition-all transform opacity-70 hover:opacity-100"
        ></SvgIcon>
      </transition>
    </button>
    <span class="pl-2 text-right min-w-4">{{ numLikes }}</span>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';
import { ref } from 'vue';
import type { RetroSectionMessage } from '../../infra/types/Section';

defineProps<{
  message?: RetroSectionMessage;
  checks: boolean;
}>();

const isChecked = ref(false);
const liked = ref(false);
const numLikes = ref(0);

const toggleLiked = () => {
  liked.value = !liked.value;
  setTimeout(
    () => {
      numLikes.value += liked.value ? 1 : -1;
    },
    liked.value ? 350 : 250
  );
};
const toggleChecked = () => {
  isChecked.value = !isChecked.value;
};
</script>

<style scoped></style>
