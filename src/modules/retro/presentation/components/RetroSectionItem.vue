<template>
  <div>
    <div class="flex items-center">
      <transition name="fade" mode="out-in">
        <BasCheckbox
          v-if="checks"
          v-model="isChecked"
          name="checkbox"
          class="mr-2"
          @update:model-value="setChecked"
        ></BasCheckbox>
      </transition>
      <div v-if="editing" class="flex-grow mr-4">
        <input
          v-model="newLabel"
          :aria-label="t('retro.aria.item')"
          type="text"
          class="bg-transparent w-full p-1"
        />
      </div>
      <div
        v-else
        class="cursor-text flex-grow p-1"
        role="button"
        tabindex="0"
        @keypress.space="editMode"
        @click="editMode"
      >
        {{ message.label }}
      </div>
      <div class="flex-center">
        <transition name="fast-fade" mode="out-in">
          <button v-if="userLikesIt" @click="toggleLiked">
            <BasIcon icon="heart-filled" class="h-6 w-6 interactive"></BasIcon>
          </button>
          <button v-else @click="toggleLiked">
            <BasIcon
              icon="heart"
              class="h-6 w-6 interactive heart-icon"
            ></BasIcon>
          </button>
        </transition>
      </div>
      <span class="text-right min-w-4 pl-2">{{ numLikes }}</span>
    </div>
    <div class="border-section-accent border-t my-1"></div>
  </div>
</template>

<script setup lang="ts">
import BasCheckbox from '@/components/BasCheckbox.vue';
import BasIcon from '@/components/BasIcon.vue';
import { computed, nextTick, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { RetroSectionMessage } from '../../infra/types/Section';
import { useRetroStore } from '../../store';

const props = defineProps<{
  message: RetroSectionMessage;
  checks: boolean;
}>();

const { t } = useI18n();
const retroStore = useRetroStore();

const editing = ref(false);

const userLikesIt = computed(() =>
  props.message.likes.includes(retroStore.userName)
);
const messageId = computed(() => props.message.id || '-1');

const newLabel = computed({
  get: () => props.message.label,
  set: (newLabel: string) => {
    retroStore.editMessage(messageId.value, newLabel);
  },
});

const editMode = async () => {
  if (retroStore.userName === props.message.author) {
    editing.value = true;
    await nextTick();
  }
};

const isChecked = ref(false);
const numLikes = computed(() => props.message.likes.length || 0);

const toggleLiked = () => {
  if (userLikesIt.value) {
    retroStore.removeLikeFromMessage(messageId.value);
  } else {
    retroStore.addLikeToMessage(messageId.value);
  }
};
const setChecked = (newValue: boolean) => {
  isChecked.value = newValue;
};
</script>

<style scoped>
@media (hover: hover) and (pointer: fine) {
  .heart-icon {
    @apply opacity-70;
  }
  .heart-icon:hover {
    @apply opacity-100;
  }
}
</style>
