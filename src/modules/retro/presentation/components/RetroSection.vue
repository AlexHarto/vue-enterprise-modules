<template>
  <div
    :class="['flex flex-col mt-0.5 rounded retro-section', (data.type as string).toLowerCase()]"
  >
    <h2
      class="flex items-center justify-between text-xl font-bold retro-section-title"
    >
      <div class="p-4 tracking-wide">{{ data.title }}</div>
      <div class="flex">
        <button
          :class="[
            'p-1.5 mr-4 border border-white border-opacity-70 rounded transition-colors',
            isChecks
              ? 'text-black bg-white bg-opacity-90 hover:(text-black bg-white bg-opacity-70)'
              : 'text-white hover:(bg-white bg-opacity-40)',
          ]"
          @click="toggleChecks"
        >
          <SvgIcon icon="check" class="w-6 h-6"></SvgIcon>
        </button>
        <button
          :class="[
            'p-1.5 mr-4 border border-white border-opacity-70 rounded transition-colors',
            isSorted
              ? 'text-black bg-white bg-opacity-90 hover:(text-black bg-white bg-opacity-70)'
              : 'text-white hover:(bg-white bg-opacity-40)',
          ]"
          @click="toggleSorted"
        >
          <SvgIcon
            icon="sort-desc"
            class="w-6 h-6 transform translate-y-0.5"
          ></SvgIcon>
        </button>
      </div>
    </h2>
    <div class="flex flex-col flex-grow px-4 pb-4 retro-section-content">
      <div v-if="data.messages" class="flex-grow my-2">
        <transition-group name="flip-list" tag="ul">
          <li
            v-for="(message, messageIndex) in sortedMessages"
            :key="`message_${messageIndex}`"
            class="py-1 my-2 border-b border-opacity-70 retro-section-message"
          >
            <RetroSectionItem
              :message="message"
              :checks="isChecks"
            ></RetroSectionItem>
          </li>
        </transition-group>
      </div>
      <form class="flex gap-2 mt-4 retro-section-form" @submit.prevent>
        <input
          v-model="newMessageText"
          type="text"
          placeholder="Type here..."
          class="w-full px-4 py-2 transition-colors rounded"
        />
        <button
          class="w-1/6 px-4 py-2 transition-colors border-2 border-transparent rounded focus:(border-black ring-1 ring-white)"
        >
          Add
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import type { RetroSectionData } from '../../infra/types/Section';
import RetroSectionItem from './RetroSectionItem.vue';

const props = defineProps<{ data: RetroSectionData }>();

const newMessageText = ref('');

const isChecks = ref(false);

const isSorted = ref(false);

const sortedMessages = computed(() => props.data.messages);

const toggleChecks = () => {
  isChecks.value = !isChecks.value;
};

const toggleSorted = () => {
  isSorted.value = !isSorted.value;
};
</script>

<style scoped>
.flip-list-move {
  transition: transform 1s;
}
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
.retro-section-title {
  background-color: var(--button-bg-color);
}
.retro-section-message {
  border-color: var(--message-border-color);
}
.retro-section-form {
  input {
    color: var(--input-text-color);
    background-color: var(--input-bg-color);
    @apply focus:(text-black bg-white bg-opacity-75) hover:(text-black bg-white bg-opacity-75);
  }
  input::placeholder {
    color: var(--input-placeholder-color);
  }
  button {
    color: var(--button-text-color);
    background-color: var(--button-bg-color);
    @apply hover:(text-black bg-white bg-opacity-75);
  }
}
</style>
