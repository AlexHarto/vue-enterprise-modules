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
          ref="labelInputRef"
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
        <transition
          :name="message.userLikedIt ? 'grow-fade' : 'fade'"
          mode="out-in"
        >
          <button v-if="message.userLikedIt" @click="toggleLiked">
            <BasIcon
              icon="heart-filled"
              class="w-6 h-6 transition-all transform opacity-100 interactive"
            ></BasIcon>
          </button>
          <button v-else @click="toggleLiked">
            <BasIcon
              icon="heart"
              class="w-6 h-6 transition-all transform opacity-100 interactive heart-icon"
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
import type { RetroSectionMessage, RetroType } from '../../infra/types/Section';
import { useRetroStore } from '../../store';

const props = defineProps<{
  type: RetroType;
  message: RetroSectionMessage;
  checks: boolean;
}>();

const { editMessage, changeMessageLikes } = useRetroStore();

const editing = ref(false);
const labelInputRef = ref<HTMLInputElement>();

const newLabel = computed({
  get: () => props.message.label,
  set: (v: string) => {
    editMessage(props.type, props.message.id, v);
  },
});

const editMode = async () => {
  editing.value = true;
  await nextTick();
  labelInputRef.value?.focus();
};

const isChecked = ref(false);
const numLikes = computed(() => props.message.likes || 0);

const toggleLiked = () => {
  const amount = props.message.userLikedIt ? -1 : 1;
  changeMessageLikes(props.type, props.message.id, amount);
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
