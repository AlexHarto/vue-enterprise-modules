<template>
  <svg ref="svgElem" data-test="svg" xmlns="http://www.w3.org/2000/svg"></svg>
</template>

<script setup lang="ts">
import { onMounted, ref } from '@vue/runtime-core';

const svgElem = ref<SVGElement | undefined>(undefined);

const props = defineProps<{
  icon: string;
}>();

onMounted(() => {
  if (props.icon && svgElem.value) {
    // It has to be a relative path :/
    import(
      /* webpackChunkName: "icons" */
      /* webpackMode: "lazy-once" */
      `../assets/icons/${props.icon}.svg`
    ).then((iconFile) => {
      const useElem: SVGUseElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'use'
      );
      useElem.setAttributeNS(
        'http://www.w3.org/1999/xlink',
        'xlink:href',
        `${iconFile.default}#${props.icon}`
      );
      // Append use element
      if (svgElem.value) {
        svgElem.value.appendChild(useElem);
      }
    });
  }
});
</script>
