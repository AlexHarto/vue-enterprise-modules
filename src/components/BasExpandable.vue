<template>
  <div ref="expandableContainer" class="relative expandable">
    <button
      class="ml-auto border-2 border-primary-border rounded px-4 py-2 max-w-min transition-all flex gap-2 items-center justify-between expandable-title"
      @click="toggleExpand"
    >
      <span v-if="title">{{ title }}</span>
      <div>
        <slot name="title"></slot>
      </div>
      <BasIcon
        icon="chevron-down"
        :class="[
          'ml-1.5 w-4 h-4 transition-transform',
          { 'transform rotate-180': isExpanded },
        ]"
      ></BasIcon>
    </button>
    <transition name="slide-down">
      <div
        v-show="isExpanded"
        class="absolute z-10 top-14 right-0 border-2 border-primary-border rounded max-w-min expandable-content"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import BasIcon from './BasIcon.vue';

defineProps<{
  title?: string;
}>();

const isExpanded = ref(false);
const expandableContainer = ref<HTMLDivElement>();

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const clickOutside = (event: Event) => {
  if (expandableContainer.value && event && event.composedPath) {
    if (
      !(
        event
          .composedPath()
          .includes(expandableContainer.value.childNodes[0]) ||
        event.composedPath().includes(expandableContainer.value.childNodes[1])
      )
    ) {
      isExpanded.value = false;
    }
  }
};

watch(
  () => isExpanded.value,
  (newValue) => {
    if (newValue) {
      window.addEventListener('click', clickOutside);
    } else {
      window.removeEventListener('click', clickOutside);
    }
  }
);
</script>

<style scoped></style>
