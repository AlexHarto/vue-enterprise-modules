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

const props = withDefaults(
  defineProps<{
    label?: string;
    switch?: boolean;
    hslBorderColor?: string;
  }>(),
  {
    label: '',
    hslBorderColor: '0 0% 25%',
  }
);

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
  --color-secondary-border: v-bind(hslBorderColor);
  @apply rounded border-2 outline-primary-text;
}
.btn-label {
  @apply flex items-center justify-center rounded-sm whitespace-nowrap;
}
.btn:not([outline]) {
  @apply text-secondary-text border-secondary-border;
  @apply focus:(text-secondary-text-focus border-secondary-border-focus);
}
.btn[active='true'] .btn-label {
  @apply bg-base-light text-base-dark;
  @apply hover:bg-opacity-80;
}
.btn[outline] {
  @apply focus:(border-primary-border-focus);
}
.btn:not([outline]) .btn-label {
  @apply py-2 px-4;
}
.btn[outline] .btn-label {
  @apply py-1 px-2;
}

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .btn:active .btn-label {
    @apply bg-base-light text-base-dark;
  }
  .btn:hover .btn-label {
    @apply bg-base-light bg-opacity-40;
  }
}
</style>
