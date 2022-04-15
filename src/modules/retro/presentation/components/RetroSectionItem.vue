<template>
  <div class="flex-grow">{{ message.label }}</div>
  <button @click="toggleLiked">
    <transition :name="liked ? 'grow-fade' : 'fade'" mode="out-in">
      <SvgIcon
        v-if="liked"
        icon="heart-filled"
        class="w-6 h-6 transform opacity-100"
      ></SvgIcon>
      <SvgIcon
        v-else
        icon="heart"
        class="w-6 h-6 transform opacity-100"
      ></SvgIcon>
    </transition>
  </button>
  <span class="pl-2 text-right min-w-4">{{ numLikes }}</span>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SvgIcon from '../../../../components/SvgIcon.vue';
import type { RetroSectionMessage } from '../../infra/types/Section';

defineProps<{ message?: RetroSectionMessage }>();

const liked = ref<boolean>(false);
const numLikes = ref<number>(0);

const toggleLiked = () => {
  liked.value = !liked.value;
  setTimeout(
    () => {
      numLikes.value += liked.value ? 1 : -1;
    },
    liked.value ? 350 : 250
  );
};
</script>

<style scoped></style>
