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
          type="text"
          class="w-full p-1 bg-transparent"
        />
      </div>
      <div
        v-else
        class="flex-grow p-1 cursor-text"
        role="button"
        @click="editMode"
      >
        {{ message.label }}
      </div>
      <div class="flex-center">
        <transition name="fast-fade" mode="out-in">
          <button v-if="userLikesIt" @click="toggleLiked">
            <BasIcon icon="heart-filled" class="w-6 h-6 interactive"></BasIcon>
          </button>
          <button v-else @click="toggleLiked">
            <BasIcon
              icon="heart"
              class="w-6 h-6 interactive heart-icon"
            ></BasIcon>
          </button>
        </transition>
      </div>
      <span class="pl-2 text-right min-w-4">{{ numLikes }}</span>
    </div>
    <div class="my-1 border-t-2 border-opacity-25 border-section-accent"></div>
  </div>
</template>

<script setup lang="ts">
import BasCheckbox from '@/components/BasCheckbox.vue';
import BasIcon from '@/components/BasIcon.vue';
import { computed, nextTick, ref } from 'vue';
import type { RetroSectionMessage } from '../../infra/types/Section';
import { useRetroStore } from '../../store';

const props = defineProps<{
  message: RetroSectionMessage;
  checks: boolean;
}>();

const { userId, editMessage, addLikeToMessage, removeLikeFromMessage } =
  useRetroStore();

const editing = ref(false);

const userLikesIt = computed(() => props.message.likes.includes(userId));
const messageId = computed(() => props.message.id || '-1');

const newLabel = computed({
  get: () => props.message.label,
  set: (newLabel: string) => {
    editMessage(messageId.value, newLabel);
  },
});

const editMode = async () => {
  if (userId === props.message.author) {
    editing.value = true;
    await nextTick();
  }
};

const isChecked = ref(false);
const numLikes = computed(() => props.message.likes.length || 0);

const toggleLiked = () => {
  if (userLikesIt.value) {
    removeLikeFromMessage(messageId.value);
  } else {
    addLikeToMessage(messageId.value);
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
