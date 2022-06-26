<template>
  <div
    :id="`section_${data.type}`"
    :class="['flex flex-col mt-0.5 rounded retro-section colorize', data.name]"
  >
    <h2
      class="rounded-t font-bold text-xl p-4 retro-section-title sm:(flex items-center)"
    >
      <div class="tracking-wide">{{ t(data.title) }}</div>
      <div class="flex ml-auto mt-2 gap-4 justify-end sm:mt-0">
        <transition name="fade" mode="out-in">
          <BasButton
            v-if="retroStore.showControls"
            icon="check"
            :class="['black-icon', { active: isChecksActive }]"
            @click="toggleChecks"
            @shift-click="shiftToggleChecks"
          ></BasButton>
        </transition>
        <BasButton
          icon="sort-desc"
          :class="['black-icon', { active: isSortedActive }]"
          @click="toggleSorted"
          @shift-click="shiftToggleSorted"
        ></BasButton>
      </div>
    </h2>
    <div class="flex flex-col flex-grow px-4 pb-4 retro-section-content">
      <div v-if="orderedMessages" class="flex-grow my-2 relative">
        <transition-group name="group-fade" tag="div" class="relative">
          <RetroSectionItem
            v-for="message in orderedMessages"
            :key="`message_${message.type}_${message.id}`"
            class="retro-section-message"
            :message="message"
            :checks="isChecksActive"
          ></RetroSectionItem>
        </transition-group>
      </div>
      <form
        class="flex flex-col mt-4 gap-4 items-center justify-center retro-section-form sm:flex-row"
        @submit.prevent="addClickHandler"
      >
        <BasInput
          v-model="newLabel"
          secondary
          clearable
          class="w-full"
          :placeholder="t('retro.input.placeholder')"
          :name="`new_message_${data.type}`"
          :label="t('retro.input.label')"
        ></BasInput>
        <BasButton secondary outlined class="h-14 mt-2">
          {{ t('retro.add_button') }}
        </BasButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasButton from '@/components/BasButton.vue';
import BasInput from '@/components/BasInput.vue';
import type { RetroSectionData } from '@/modules/retro/infra/types/Section';
import { useRetroStore } from '@/modules/retro/store';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import RetroSectionItem from './RetroSectionItem.vue';

const emits = defineEmits(['update:global-checks', 'update:global-sort']);

const props = defineProps<{
  data: RetroSectionData;
  globalChecks: boolean;
  globalSort: boolean;
}>();

const { t } = useI18n();
const retroStore = useRetroStore();

const newLabel = ref('');
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
const filteredMessages = computed(() =>
  retroStore.sortedMessagesByIndex(props.data.type)
);
const orderedMessages = computed(() =>
  isSortedActive.value
    ? retroStore.sortedMessagesByLikes(props.data.type)
    : filteredMessages.value
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

const addClickHandler = async () => {
  if (newLabel.value) {
    retroStore.addNewMessage(props.data.type, newLabel.value);
    newLabel.value = '';
  }
};
</script>

<style scoped>
.retro-section {
  @apply bg-$color-white ring-section-accent text-$color-black  ring-2;
}
.retro-section-title {
  @apply bg-section-accent text-$color-white;
}
.black-icon {
  --color-bg: var(--color-black);
  --color-text: var(--color-white);
  --color-border: var(--color-black);
  --color-ring: var(--color-black);
}
.active {
  @apply filter invert;
}
</style>
