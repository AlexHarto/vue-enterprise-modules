<template>
  <button class="p-2.5 bas-button colorize">
    <BasIcon v-if="icon" :icon="icon" class="h-6 w-6"></BasIcon>
    <div
      v-else
      class="flex gap-2 bas-button-label"
      :class="singleLetter ? 'w-6 justify-center' : 'px-4'"
    >
      <span v-if="startIcon" class="-mt-0.2">
        <BasIcon
          :icon="startIcon"
          :aria-label="startIconAriaLabel || startIcon"
          class="h-6 w-6"
        ></BasIcon>
      </span>
      {{ label }}
      <slot></slot>
      <span v-if="endIcon" class="-mt-0.2">
        <BasIcon
          :icon="endIcon"
          :aria-label="endIconAriaLabel || endIcon"
          class="h-6 w-6"
        ></BasIcon>
      </span>
    </div>
  </button>
</template>

<script setup lang="ts">
import BasIcon from './BasIcon.vue';

/**
 * Hidden props:
 * outlined    - string/boolean - outlined button.
 * text        - string/boolean - text button.
 * tonal       - string/boolean - tonal button.
 * transparent - string/boolean - button is transparent, background, ring and border.
 */
withDefaults(
  defineProps<{
    label?: string;
    startIcon?: string;
    startIconAriaLabel?: string;
    endIcon?: string;
    endIconAriaLabel?: string;
    icon?: string;
    iconAriaLabel?: string;
    singleLetter?: boolean;
  }>(),
  {
    label: undefined,
    startIcon: undefined,
    startIconAriaLabel: undefined,
    endIcon: undefined,
    endIconAriaLabel: undefined,
    icon: undefined,
    iconAriaLabel: undefined,
  }
);
</script>

<style scoped>
.bas-button {
  --color-bg: var(--color-primary);
  --color-text: var(--color-primary-text);
  --color-border: var(--color-primary-border);
  --color-ring: var(--color-primary-ring);
  @apply rounded-full font-medium shadow-none;
}
.bas-button[secondary] {
  --color-bg: var(--color-secondary);
  --color-text: var(--color-secondary-text);
  --color-border: var(--color-secondary-border);
  --color-ring: var(--color-secondary-ring);
}
.bas-button[tertiary] {
  --color-bg: var(--color-tertiary);
  --color-text: var(--color-tertiary-text);
  --color-border: var(--color-tertiary-border);
  --color-ring: var(--color-tertiary-ring);
}
.bas-button[transparent][transparent] {
  --color-bg: transparent;
  --color-border: transparent;
  --color-ring: transparent;
}
.bas-button:not([disabled]):not([outlined]):not([text]) {
  @apply bg-$color-bg text-$color-white-text;
}
.bas-button[outlined] {
  @apply border border-$color-border text-$color-text;
}
.bas-button[text] {
  @apply text-$color-text;
}
.bas-button[disabled] {
  @apply cursor-default bg-opacity-20 text-$color-black-text;
}
.bas-button[disabled]:not([outlined]) {
  @apply bg-$color-outline text-opacity-40;
}
.bas-button[disabled][outlined] {
  @apply border-opacity-50 text-opacity-40;
}
.bas-button[disabled][text] {
  @apply bg-transparent text-opacity-40;
}

.bas-button:not([disabled]):not([outlined]):not([text]):hover,
.bas-button:not([disabled]):not([outlined]):not([text]):focus,
.bas-button:not([disabled]):not([outlined]):not([text]):hover:focus {
  @apply bg-opacity-90 shadow-md ring-$color-border;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 var(--tw-ring-offset-color)),
    var(--tw-ring-shadow, 0 0 var(--tw-ring-color)), var(--elevation-light-1);
}
.bas-button:not([disabled]):not([outlined]):not([text]):focus:active {
  @apply bg-opacity-80;
}
.bas-button:not([disabled])[outlined]:hover,
.bas-button:not([disabled])[outlined]:focus,
.bas-button:not([disabled])[outlined]:hover:focus,
.bas-button:not([disabled])[text]:hover,
.bas-button:not([disabled])[text]:focus,
.bas-button:not([disabled])[text]:hover:focus {
  @apply bg-$color-bg bg-opacity-10;
}
.bas-button:not([disabled])[outlined]:focus:active,
.bas-button:not([disabled])[text]:focus:active {
  @apply bg-$color-bg bg-opacity-20;
}
.bas-button:not([disabled]):focus,
.bas-button:not([disabled]):hover:focus {
  @apply outline-none ring-$color-border ring-offset-$color-white-ring ring-2 ring-offset-2;
}
.bas-button:not([disabled])[outlined]:focus,
.bas-button:not([disabled])[outlined]:hover:focus {
  @apply ring-1;
}
.bas-button:not([disabled])[text]:focus,
.bas-button:not([disabled])[text]:hover:focus {
  @apply ring-1 ring-offset-0;
}

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .bas-button {
    @apply transition-all;
  }
}
</style>
