<template>
  <div
    :id="`section_${data.type}`"
    :class="['flex flex-col mt-0.5 rounded retro-section', (data.type as string).toLowerCase()]"
  >
    <h2
      class="sm:(flex items-center) p-4 text-xl font-bold rounded-t retro-section-title"
    >
      <div class="tracking-wide">{{ t(data.title) }}</div>
      <div class="flex justify-end gap-4 mt-2 ml-auto sm:mt-0">
        <BasButton
          class="bg-section-accent border-base-light interactive"
          outline
          switch
          :active="isChecksActive"
          @click="toggleChecks"
          @shift-click="shiftToggleChecks"
          ><BasIcon icon="check" class="w-6 h-6"></BasIcon
        ></BasButton>
        <BasButton
          class="bg-section-accent border-base-light interactive"
          outline
          switch
          :active="isSortedActive"
          @click="toggleSorted"
          @shift-click="shiftToggleSorted"
          ><BasIcon
            icon="sort-desc"
            class="w-6 h-6 transform translate-y-0.5 translate-x-0.5"
          ></BasIcon
        ></BasButton>
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
        class="flex flex-col gap-2 sm:flex-row retro-section-form"
        @submit.prevent
      >
        <BasInput
          ref="newMessageInputRef"
          v-model="newMessage"
          :placeholder="t('retro.input.placeholder')"
          :name="`new_message_${data.type}`"
          :hsl-border-color="hslBorderColor"
          class="w-full interactive"
        ></BasInput>
        <BasButton
          :label="t('retro.add_button')"
          :hsl-border-color="hslBorderColor"
          class="bg-section-accent interactive"
          @click="addNewMessage"
        ></BasButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasButton from '@/components/BasButton.vue';
import BasIcon from '@/components/BasIcon.vue';
import BasInput from '@/components/BasInput.vue';
import { computed, onMounted, ref } from 'vue';
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
const hslBorderColor = ref('0 0% 25%');
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

const toggleSorted = () => {
  isSortedLocalPriority.value = true;
  isSorted.value = !isSorted.value;
};

const shiftToggleSorted = () => {
  isSortedLocalPriority.value = false;
  if (isSorted.value && !props.globalSort) {
    isSorted.value = props.globalSort;
  } else if (!isSorted.value && props.globalSort) {
    isSorted.value = !props.globalSort;
  }
  emits('update:global-sort', !isSorted.value);
  isSorted.value = !isSorted.value;
};

const toggleChecks = () => {
  isChecksLocalPriority.value = true;
  isChecks.value = !isChecks.value;
};

const shiftToggleChecks = () => {
  isChecksLocalPriority.value = false;
  if (isChecks.value && !props.globalChecks) {
    isChecks.value = props.globalChecks;
  } else if (!isChecks.value && props.globalChecks) {
    isChecks.value = !props.globalChecks;
  }
  emits('update:global-checks', !isChecks.value);
  isChecks.value = !isChecks.value;
};

const addNewMessage = async () => {
  if (newMessage.value) {
    addMessage(props.data.type, newMessage.value);
    newMessage.value = '';
    newMessageInputRef.value?.focus();
  }
};

onMounted(() => {
  const el = document.querySelector(`#section_${props.data.type}`);
  if (el) {
    const h = getComputedStyle(el).getPropertyValue('--color-hue');
    const sl = getComputedStyle(el).getPropertyValue(
      '--color-section-accent-sl'
    );
    hslBorderColor.value = `${h}${sl}`;
  } else {
    hslBorderColor.value = '0 0% 25%';
  }
});
</script>

<style scoped>
.retro-section {
  @apply text-primary-text bg-section-bg border-section-border;
}
.retro-section-title {
  @apply text-secondary-text bg-section-accent;
}
</style>
