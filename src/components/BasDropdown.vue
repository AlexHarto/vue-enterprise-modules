<template>
  <div ref="dropdownContainer" class="relative">
    <button
      :id="`dropdown_${id}`"
      data-dropdown-toggle="dropdown"
      class="flex items-center mb-0.5 min-w-11"
      type="button"
      @click="toggleDropdown"
    >
      <span v-if="label">{{ label }}</span>
      <slot></slot>
      <BasIcon
        icon="chevron-down"
        :class="[
          'ml-1.5 w-4 h-4 transition-transform',
          { 'transform rotate-180': optionsVisible },
        ]"
      ></BasIcon>
    </button>
    <transition name="slide-down" mode="out-in">
      <div
        v-if="optionsVisible"
        data-test="options"
        class="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded shadow top-8 min-w-24 dark:bg-base-dark"
      >
        <ul
          class="text-sm text-base-dark dark:text-base-light"
          :aria-labelledby="`dropdown${id}`"
        >
          <li
            v-for="(option, optionIndex) in options"
            :key="`${id}_${option.label}`"
          >
            <a
              :href="option.link || '#'"
              class="block px-4 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              :class="{
                'rounded-t': optionIndex === 0,
                'rounded-b': optionIndex === options.length - 1,
              }"
              @click="optionClick(option)"
              >{{ option.label }}</a
            >
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { DropdownOption } from '@/infra/types/DropdownOption';
import { ref, watch } from 'vue';
import BasIcon from './BasIcon.vue';

withDefaults(
  defineProps<{
    id?: string;
    label?: string;
    options?: DropdownOption[];
  }>(),
  {
    id: 'default',
    label: '',
    options: () => [] as DropdownOption[],
  }
);

const dropdownContainer = ref<HTMLDivElement>();
const optionsVisible = ref(false);

const toggleDropdown = () => {
  optionsVisible.value = !optionsVisible.value;
};

const clickOutside = (event: Event) => {
  if (dropdownContainer.value && event && event.composedPath) {
    if (
      !(
        event.composedPath().includes(dropdownContainer.value.childNodes[0]) ||
        event.composedPath().includes(dropdownContainer.value.childNodes[1])
      )
    ) {
      optionsVisible.value = false;
    }
  }
};

const optionClick = (option: DropdownOption) => {
  optionsVisible.value = false;
  if (option.onClick) {
    option.onClick();
  }
};

watch(
  () => optionsVisible.value,
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
