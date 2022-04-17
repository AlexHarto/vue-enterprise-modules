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
    <div v-if="editing" class="flex-grow mr-4">
      <input
        ref="labelInputRef"
        v-model="newLabel"
        type="text"
        class="bg-transparent w-full"
      />
    </div>
    <div v-else class="flex-grow cursor-text" role="button" @click="editMode">
      {{ message.label }}
    </div>
    <div class="flex-center">
      <transition
        :name="message.userLikedIt ? 'grow-fade' : 'fade'"
        mode="out-in"
      >
        <button v-if="message.userLikedIt" @click="toggleLiked">
          <SvgIcon
            icon="heart-filled"
            class="w-6 h-6 transition-all transform opacity-100"
          ></SvgIcon>
        </button>
        <button v-else @click="toggleLiked">
          <SvgIcon
            icon="heart"
            class="w-6 h-6 transition-all transform opacity-100 heart-icon"
          ></SvgIcon>
        </button>
      </transition>
    </div>
    <span class="pl-2 text-right min-w-4">{{ numLikes }}</span>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';
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
