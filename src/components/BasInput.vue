<template>
  <label class="w-full">
    <span class="text-sm">{{ label }}</span>
    <div class="mt-1 w-full rounded input-wrapper interactive">
      <input
        v-bind="$attrs"
        v-model="cValue"
        :name="name"
        class="w-full p-2 bg-transparent rounded"
      />
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="useSlots().message" class="mt-1 text-sm input-message">
        <slot name="message"></slot>
      </div>
    </transition>
  </label>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
  customOptions: {},
};
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue';

const emits = defineEmits(['update:modelValue']);

const props = withDefaults(
  defineProps<{
    label?: string;
    name: string;
    modelValue: string;
    hslBorderColor?: string;
  }>(),
  {
    label: undefined,
    name: '',
    modelValue: undefined,
    hslBorderColor: '0 0% 25%',
  }
);

const cValue = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    emits('update:modelValue', value);
  },
});
</script>

<style scoped>
.input-wrapper {
  --color-primary-border: v-bind(hslBorderColor);
  @apply bg-primary-bg text-primary-text bg-opacity-75 border-none;
}
.input-wrapper.interactive {
  @apply hover:(text-primary-text-hover bg-opacity-100);
}
input {
  @apply border-2 border-primary-border border-opacity-75;
  @apply hover:border-opacity-80;
}
@media (prefers-reduced-motion: no-preference) {
  input {
    @apply outline-inherit;
  }
}
input::placeholder {
  @apply opacity-75;
  color: var(--input-placeholder-color);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .input-wrapper.interactive {
    @apply focus-within:(text-primary-text-focus bg-primary-bg-focus);
  }
}
</style>
