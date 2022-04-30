<template>
  <svg ref="svgElem" data-test="svg" xmlns="http://www.w3.org/2000/svg">
    <use :href="iconHref" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  icon: string;
}>();

const iconHref = computed(() => {
  const path = import.meta.env.VITE_ICONS_PATH || './icons/';
  return `${path}${props.icon}.svg#${props.icon}`;
});
</script>
