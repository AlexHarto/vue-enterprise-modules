<template>
  <div
    :class="['flex flex-col mt-2 rounded retro-section', (data.type as string).toLowerCase()]"
  >
    <h2 class="text-xl font-bold border-b retro-section-title">
      <div class="p-4 tracking-wide">{{ data.title }}</div>
    </h2>
    <div class="flex flex-col flex-grow px-4 pb-4 retro-section-content">
      <div v-if="data.messages" class="flex-grow">
        <div
          v-for="(message, messageIndex) in data.messages"
          :key="`message_${messageIndex}`"
          class="flex py-2 my-4 border-b retro-section-message"
        >
          <RetroSectionItem :message="message"></RetroSectionItem>
        </div>
      </div>
      <div>
        <form class="flex gap-2 retro-section-form" @submit.prevent>
          <input
            v-model="newMessageText"
            type="text"
            placeholder="Type here..."
            class="w-full px-4 py-2 rounded"
          />
          <button class="w-1/6 px-4 py-2 rounded">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { RetroSectionData } from '../../infra/types/Section';
import RetroSectionItem from './RetroSectionItem.vue';

defineProps<{ data: RetroSectionData }>();

const newMessageText = ref('');
</script>

<style scoped>
.try {
  --text-color: white;
  --bg-color: hsl(170, 70%, 37%);
  --border-color: hsl(170, 50%, 77%);
  --message-border-color: hsl(170, 39%, 67%);
  --input-text-color: black;
  --input-bg-color: var(--border-color);
  --input-placeholder-color: hsl(215, 14%, 34%);
  --button-text-color: white;
  --button-bg-color: hsl(170, 70%, 27%);
}
.stop {
  --text-color: white;
  --bg-color: hsl(10, 70%, 37%);
  --border-color: hsl(10, 50%, 77%);
  --message-border-color: hsl(10, 39%, 67%);
  --input-text-color: black;
  --input-bg-color: var(--border-color);
  --input-placeholder-color: hsl(215, 14%, 34%);
  --button-text-color: white;
  --button-bg-color: hsl(10, 70%, 27%);
}
.continue {
  --text-color: white;
  --bg-color: hsl(80, 70%, 37%);
  --border-color: hsl(80, 50%, 77%);
  --message-border-color: hsl(80, 39%, 67%);
  --input-text-color: black;
  --input-bg-color: var(--border-color);
  --input-placeholder-color: hsl(215, 14%, 34%);
  --button-text-color: white;
  --button-bg-color: hsl(80, 70%, 27%);
}
.kudos {
  --text-color: white;
  --bg-color: hsl(245, 58%, 51%);
  --border-color: hsl(245, 96%, 89%);
  --message-border-color: hsl(245, 89%, 74%);
  --input-text-color: black;
  --input-bg-color: var(--border-color);
  --input-placeholder-color: hsl(245, 14%, 34%);
  --button-text-color: white;
  --button-bg-color: hsl(245, 84%, 67%);
}
.retro-section {
  color: var(--text-color);
  background-color: var(--bg-color);
  border-color: var(--border-color);
}
.retro-section-message {
  border-color: var(--message-border-color);
}
.retro-section-form {
  input {
    color: var(--input-text-color);
    background-color: var(--input-bg-color);
  }
  input::placeholder {
    color: var(--input-placeholder-color);
  }
  button {
    color: var(--button-text-color);
    background-color: var(--button-bg-color);
  }
}
</style>
