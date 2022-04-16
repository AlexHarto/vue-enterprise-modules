<template>
  <div class="flex items-center">
    <button
      v-if="checks"
      class="mr-2 w-5 h-5 border border-opacity-75 rounded transition-colors checkbox"
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
        <button v-if="liked" class="flex-center">
          <SvgIcon
            icon="heart-filled"
            class="w-6 h-6 transition-all transform opacity-100"
          ></SvgIcon>
        </button>
        <button v-else class="flex-center">
          <SvgIcon
            icon="heart"
            class="w-6 h-6 transition-all transform opacity-100 heart-icon"
          ></SvgIcon>
        </button>
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
  numLikes.value += liked.value ? 1 : -1;
};
const toggleChecked = () => {
  isChecked.value = !isChecked.value;
};
</script>

<style scoped>
@media (hover: hover) and (pointer: fine) {
  .checkbox:hover {
    @apply text-black bg-white bg-opacity-75;
  }
  .heart-icon {
    @apply opacity-70;
  }
  .heart-icon:hover {
    @apply opacity-100;
  }
}
</style>
