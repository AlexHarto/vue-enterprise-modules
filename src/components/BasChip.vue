<template>
  <button
    :class="['text-sm p-1.5 bas-chip colorize', { avatar: avatar?.length }]"
  >
    <div class="flex bas-chip-label">
      <span
        v-if="avatar"
        :aria-label="`${t('aria.icon')} ${avatarAriaLabel || avatar}`"
      >
        <img
          :src="`/${avatar}`"
          alt="Avatar"
          class="h-6.75 -my-0.75 -ml-0.5 w-6.75 avatar-icon"
        />
      </span>
      <span
        v-if="startIcon"
        :aria-label="`${t('aria.icon')} ${startIconAriaLabel || startIcon}`"
      >
        <BasIcon :icon="startIcon" class="h-5 stroke-2 w-5"></BasIcon>
      </span>
      <span class="px-2">
        {{ label }}
        <slot></slot>
      </span>
      <span
        v-if="endIcon"
        :aria-label="`${t('aria.icon')} ${endIconAriaLabel || endIcon}`"
      >
        <BasIcon :icon="endIcon" class="h-5 stroke-2 w-5"></BasIcon>
      </span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import BasIcon from './BasIcon.vue';

/**
 * Hidden props:
 * selected - string/boolean - selected chip.
 * elevated - string/boolean - elevated/dragging chip.
 */
withDefaults(
  defineProps<{
    label?: string;
    startIcon?: string;
    startIconAriaLabel?: string;
    endIcon?: string;
    endIconAriaLabel?: string;
    avatar?: string;
    avatarAriaLabel?: string;
  }>(),
  {
    label: undefined,
    startIcon: undefined,
    startIconAriaLabel: undefined,
    endIcon: undefined,
    endIconAriaLabel: undefined,
    avatar: undefined,
    avatarAriaLabel: undefined,
  }
);

const { t } = useI18n();
</script>

<style scoped>
.bas-chip {
  --color-bg: var(--color-primary);
  --color-text: var(--color-primary-text);
  --color-border: var(--color-primary-border);
  --color-ring: var(--color-primary-ring);
  @apply rounded-lg font-medium shadow-none;
}
.bas-chip.avatar {
  @apply rounded-full;
}
.bas-chip[secondary] {
  --color-bg: var(--color-secondary);
  --color-text: var(--color-secondary-text);
  --color-border: var(--color-secondary-border);
  --color-ring: var(--color-secondary-ring);
}
.bas-chip[tertiary] {
  --color-bg: var(--color-tertiary);
  --color-text: var(--color-tertiary-text);
  --color-border: var(--color-tertiary-border);
  --color-ring: var(--color-tertiary-ring);
}
.bas-chip:not([disabled]):not([selected]):not([elevated]) {
  @apply border border-$color-border;
}
.bas-chip[selected] {
  @apply bg-$color-bg bg-opacity-20;
}
.bas-chip[elevated] {
  @apply bg-$color-bg bg-opacity-20;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--elevation-light-3);
}
.bas-chip[elevated]:not([selected]) {
  @apply border border-$color-border;
}
.bas-chip[disabled] {
  @apply cursor-default bg-opacity-20 text-$color-black-text;
}
.bas-chip[disabled] .avatar-icon {
  @apply opacity-40;
}
.bas-chip[disabled]:not([selected]) {
  @apply border border-$color-outline text-opacity-40;
}
.bas-chip[disabled][selected] {
  @apply bg-$color-outline text-opacity-40;
}
.bas-chip[disabled][elevated] {
  @apply bg-transparent text-opacity-40;
}

.bas-chip:not([disabled]):not([selected]):not([elevated]):hover,
.bas-chip:not([disabled]):not([selected]):not([elevated]):focus,
.bas-chip:not([disabled]):not([selected]):not([elevated]):hover:focus {
  @apply bg-$color-bg bg-opacity-10 ring-$color-border;
}
.bas-chip:not([disabled]):not([selected]):not([elevated]):focus:active {
  @apply bg-$color-bg bg-opacity-20;
}
.bas-chip:not([disabled]):hover,
.bas-chip:not([disabled]):focus,
.bas-chip:not([disabled]):hover:focus,
.bas-chip:not([disabled]):focus:active {
  @apply bg-$color-bg bg-opacity-30;
}
.bas-chip:not([disabled])[elevated]:hover,
.bas-chip:not([disabled])[elevated]:focus,
.bas-chip:not([disabled])[elevated]:hover:focus,
.bas-chip:not([disabled])[elevated]:focus:active {
  @apply outline-none ring-$color-border ring-1 ring-offset-1;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--elevation-light-3);
}
.bas-chip:not([disabled])[elevated][selected]:hover,
.bas-chip:not([disabled])[elevated][selected]:focus,
.bas-chip:not([disabled])[elevated][selected]:hover:focus,
.bas-chip:not([disabled])[elevated][selected]:focus:active {
  @apply outline-none ring-$color-border ring-2 ring-offset-0;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--elevation-light-3);
}
.bas-chip:not([disabled])[selected]:hover,
.bas-chip:not([disabled])[selected]:focus,
.bas-chip:not([disabled])[selected]:hover:focus,
.bas-chip:not([disabled])[selected]:focus:active {
  @apply outline-none ring-$color-border ring-2 ring-offset-0;
}
.bas-chip:not([disabled]):not([elevated]):not([selected]):focus,
.bas-chip:not([disabled]):not([elevated]):not([selected]):hover:focus {
  @apply outline-none ring-$color-border ring-offset-$color-white-ring ring-1 ring-offset-1;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .bas-chip {
    @apply transition-all;
  }
}
</style>
