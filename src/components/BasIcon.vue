<template>
  <svg
    data-test="svg"
    xmlns="http://www.w3.org/2000/svg"
    :aria-label="fullAriaLabel"
  >
    <use :href="iconHref" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = withDefaults(
  defineProps<{
    icon: string;
    ariaLabel?: string;
  }>(),
  {
    ariaLabel: undefined,
  }
);

const { t } = useI18n();

const fullAriaLabel = computed(
  () => `${t('aria.icon') || 'Icon'} ${props.ariaLabel || props.icon}`
);

const iconHref = computed(() => {
  const path = import.meta.env.VITE_ICONS_PATH || './icons/';
  return `${path}${props.icon}.svg#${props.icon}`;
});
</script>
