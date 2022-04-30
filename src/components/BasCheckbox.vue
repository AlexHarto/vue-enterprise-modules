<template>
  <label class="checkbox">
    <span :class="labelClass">{{ label }}</span>
    <div class="flex items-center">
      <input :value="modelValue" type="checkbox" :name="name" class="hidden" />
      <button
        class="checkbox-button interactive"
        role="checkbox"
        @click="toggleCheck"
      >
        <BasIcon
          v-if="modelValue"
          icon="check"
          class="w-5 h-5 p-0.5 transform -translate-x-0.5 -translate-y-0.5 checkbox-icon"
        ></BasIcon>
      </button>
    </div>
  </label>
</template>

<script setup lang="ts">
import BasIcon from '@/components/BasIcon.vue';

/**
 * Hidden props:
 * outline  - string/boolean - makes the button outline.
 */
const emits = defineEmits(['update:modelValue']);

const props = withDefaults(
  defineProps<{
    label?: string;
    labelClass?: string;
    name: string;
    modelValue: boolean;
  }>(),
  {
    label: undefined,
    labelClass: undefined,
    name: '',
    modelValue: false,
  }
);

const toggleCheck = () => {
  emits('update:modelValue', !props.modelValue);
};
</script>

<style scoped>
.checkbox {
  @apply rounded;
}
.checkbox-button {
  @apply w-5 h-5 cursor-pointer rounded bg-transparent border-2 ring-0;
  @apply focus:ring-1;
}
.checkbox:not([outline]) .checkbox-button {
  @apply border-base-dark ring-base-dark;
}
.checkbox:not([outline]) .checkbox-icon {
  @apply text-base-dark;
}
.checkbox[outline] .checkbox-button {
  @apply border-base-light ring-base-light;
}
.checkbox[outline] .checkbox-icon {
  @apply text-base-light;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .checkbox:not([outline]) .checkbox-button {
    @apply hover:(bg-base-dark/15);
    @apply active:bg-transparent;
  }
  .checkbox[outline] .checkbox-button {
    @apply hover:(bg-base-light/25);
    @apply active:bg-transparent;
  }
}
</style>
