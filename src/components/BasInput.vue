<template>
  <label class="w-full">
    <span :class="labelClass">{{ label }}</span>
    <div class="rounded input-wrapper interactive">
      <input
        v-bind="$attrs"
        v-model="cValue"
        :name="name"
        class="p-2 bg-transparent rounded"
      />
    </div>
  </label>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
  customOptions: {},
};
</script>

<script setup lang="ts">
import { computed } from 'vue';

const emits = defineEmits(['update:modelValue']);

const props = withDefaults(
  defineProps<{
    label?: string;
    labelClass?: string;
    name: string;
    modelValue: string;
  }>(),
  {
    label: undefined,
    labelClass: undefined,
    name: '',
    modelValue: undefined,
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
  @apply bg-primary-bg border-2 border-primary-border text-primary-text bg-opacity-75;
}
.input-wrapper.interactive {
  @apply hover:(text-primary-text-hover bg-opacity-100);
}
@media (prefers-reduced-motion: no-preference) {
  input {
    @apply outline-inherit;
  }
}
input::placeholder {
  color: var(--input-placeholder-color);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .input-wrapper.interactive {
    @apply focus-within:(text-primary-text-focus bg-primary-bg-focus);
  }
}
</style>
