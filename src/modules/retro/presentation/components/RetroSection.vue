<template>
  <div
    :class="['flex flex-col mt-0.5 rounded retro-section', (data.type as string).toLowerCase()]"
  >
    <h2
      class="sm:(flex items-center) p-4 text-xl font-bold rounded-t retro-section-title"
    >
      <div class="tracking-wide">{{ t(data.title) }}</div>
      <div class="flex justify-end gap-4 mt-2 ml-auto sm:mt-0">
        <button
          :class="['icon-button', { 'icon-button--active': isChecksActive }]"
          @click="toggleChecks"
        >
          <SvgIcon icon="check" class="w-6 h-6"></SvgIcon>
        </button>
        <button
          :class="['icon-button', { 'icon-button--active': isSortedActive }]"
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
      <div v-if="data.messages" class="relative flex-grow my-2">
        <transition-group name="group-fade" tag="div" class="relative">
          <RetroSectionItem
            v-for="(message, messageIndex) in messages"
            :key="`message_${messageIndex}`"
            :type="data.type"
            :message="message"
            :checks="isChecksActive"
            class="retro-section-message"
          ></RetroSectionItem>
        </transition-group>
      </div>
      <form
        class="flex flex-col gap-2 mt-4 sm:flex-row retro-section-form"
        @submit.prevent
      >
        <input
          ref="newMessageInputRef"
          v-model="newMessage"
          type="text"
          :placeholder="t('retro.input.placeholder')"
          class="w-full px-4 py-2 rounded interactive"
        />
        <button class="sm:(w-26) rounded" @click="addNewMessage">
          <div class="w-full h-full px-4 py-2 rounded interactive">
            {{ t('retro.add_button') }}
          </div>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { RetroSectionData } from '../../infra/types/Section';
import { useRetroStore } from '../../store';
import RetroSectionItem from './RetroSectionItem.vue';

const emits = defineEmits(['update:global-checks', 'update:global-sort']);

const props = defineProps<{
  data: RetroSectionData;
  globalChecks: boolean;
  globalSort: boolean;
}>();

const { t } = useI18n();
const { addMessage, sortedMessages } = useRetroStore();

const newMessage = ref('');
const newMessageInputRef = ref<HTMLInputElement>();
// Checks
const isChecks = ref(false);
const isChecksLocalPriority = ref(false);
const isChecksActive = computed(
  () =>
    (isChecksLocalPriority.value && isChecks.value) ||
    (!isChecksLocalPriority.value && (isChecks.value || props.globalChecks))
);
// Sorted
const isSorted = ref(false);
const isSortedLocalPriority = ref(false);
const isSortedActive = computed(
  () =>
    (isSortedLocalPriority.value && isSorted.value) ||
    (!isSortedLocalPriority.value && (isSorted.value || props.globalSort))
);
// Message list
const messages = computed(() =>
  isSortedActive.value ? sortedMessages(props.data.type) : props.data.messages
);

const toggleChecks = (e: MouseEvent) => {
  if (e.shiftKey) {
    isChecksLocalPriority.value = false;
    if (isChecks.value && !props.globalChecks) {
      isChecks.value = props.globalChecks;
    } else if (!isChecks.value && props.globalChecks) {
      isChecks.value = !props.globalChecks;
    }
    emits('update:global-checks', !isChecks.value);
  } else {
    isChecksLocalPriority.value = true;
  }
  isChecks.value = !isChecks.value;
};

const toggleSorted = (e: MouseEvent) => {
  if (e.shiftKey) {
    isSortedLocalPriority.value = false;
    if (isSorted.value && !props.globalSort) {
      isSorted.value = props.globalSort;
    } else if (!isSorted.value && props.globalSort) {
      isSorted.value = !props.globalSort;
    }
    emits('update:global-sort', !isSorted.value);
  } else {
    isSortedLocalPriority.value = true;
  }
  isSorted.value = !isSorted.value;
};

const addNewMessage = async () => {
  if (newMessage.value) {
    addMessage(props.data.type, newMessage.value);
    newMessage.value = '';
    newMessageInputRef.value?.focus();
  }
};
</script>

<style scoped>
.retro-section {
  color: var(--light-text-color);
  background-color: var(--bg-color);
  border-color: var(--border-color);
}
.retro-section-title {
  color: var(--dark-text-color);
  background-color: var(--button-bg-color);
}
.retro-section-form {
  input {
    color: var(--light-text-color);
    background-color: var(--input-bg-color);
    @apply focus:(text-black bg-white bg-opacity-75);
  }
  input::placeholder {
    color: var(--input-placeholder-color);
  }
  button {
    color: var(--dark-text-color);
    background-color: var(--button-bg-color);
  }
}

.icon-button {
  @apply p-1.5 border text-white border-white border-opacity-70 rounded transition-colors;
}
.icon-button--active {
  @apply text-black bg-white bg-opacity-90;
}
.interactive {
  @apply transition-colors border border-transparent;
}
@media (hover: hover) and (pointer: fine) {
  .icon-button:hover {
    @apply bg-white bg-opacity-40;
  }
  .icon-button--active:hover {
    @apply text-black bg-white bg-opacity-70;
  }
  .interactive:hover {
    /* border-color: var(--button-bg-color); */
    @apply bg-white border-white bg-opacity-30;
  }

  button:active .interactive {
    @apply text-black;
  }
}
</style>
