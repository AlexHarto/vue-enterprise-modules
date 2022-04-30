<template>
  <button class="btn interactive" @click="clickHandler">
    <div class="btn-label interactive">
      {{ label }}
      <slot></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

/**
 * Hidden props:
 * outline  - string/boolean - makes the button outline.
 * active   - string/boolean - only if it's a switch button. It will appear as active.
 */
const emits = defineEmits(['click', 'shiftClick']);

const props = defineProps<{
  label?: string;
  switch?: boolean;
}>();

const isActive = ref(false);

const clickHandler = (e: MouseEvent) => {
  let event = {};
  if (props.switch) {
    isActive.value = !isActive.value;
    event = { ...e, isActive: isActive.value };
  } else {
    event = e;
  }
  if (e.shiftKey) {
    emits('shiftClick', event);
  } else {
    emits('click', event);
  }
};
</script>

<style scoped>
.btn {
  @apply rounded border-2;
}
.btn:not([outline]) {
  @apply text-secondary-text bg-secondary-bg border-secondary-bg;
  @apply focus:(text-secondary-text-focus bg-secondary-bg-focus border-secondary-border-focus);
}
.btn[outline] {
  @apply bg-transparent border-primary-border;
  @apply focus:(bg-primary-bg-focus border-primary-border-focus bg-opacity-80);
}
.btn:not([outline]) .btn-label {
  @apply py-2 px-4;
}
.btn[outline] .btn-label {
  @apply py-1 px-2;
}

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .btn:not([outline]) {
    @apply hover:(text-secondary-text-hover bg-secondary-bg-hover border-secondary-border-hover bg-opacity-80);
    @apply active:(text-secondary-text-active bg-secondary-bg-active border-secondary-border-active);
  }
  .btn[outline] {
    @apply hover:(bg-primary-bg-hover border-primary-border-hover);
    @apply active:(bg-primary-bg-active border-primary-border-active);
  }
}
</style>
