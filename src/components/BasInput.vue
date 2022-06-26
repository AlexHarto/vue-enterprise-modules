<template>
  <div
    :class="[
      'bas-input colorize',
      {
        primary: isTruthy(primary),
        secondary: isTruthy(secondary),
        tertiary: isTruthy(tertiary),
        disabled: isTruthy(disabled),
        error: isTruthy(error),
      },
    ]"
  >
    <fieldset class="bas-input-fieldset">
      <legend class="bas-input-legend">
        {{ label }}
      </legend>
      <label>
        <div class="flex items-center justify-center bas-input-wrapper">
          <input
            ref="inputField"
            v-bind="$attrs"
            v-model="cValue"
            :disabled="isTruthy(disabled)"
            :name="name"
            :class="{ 'mr-2.5': !clearable }"
          />
          <BasButton
            v-if="clearable && !error"
            text
            icon="close"
            class="mr-1 mb-2 ml-0.25 p-2 stroke-2"
            :primary="isTruthy(primary)"
            :secondary="isTruthy(secondary)"
            :tertiary="isTruthy(tertiary)"
            :disabled="isTruthy(disabled)"
            @click="clear"
          ></BasButton>
          <BasIcon
            v-if="error"
            icon="exclamation-icon"
            class="h-7 text-$color-text mr-4 mb-3 ml-2 stroke-2 w-7"
            :disabled="isTruthy(disabled)"
          ></BasIcon>
        </div>
      </label>
    </fieldset>
    <transition name="fade" mode="out-in">
      <div v-if="useSlots().message" class="bas-input-message">
        <slot name="message"></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
  customOptions: {},
};
</script>

<script setup lang="ts">
import { isTruthy } from '@/utils/AttributeUtils';
import { computed, ref, useSlots } from 'vue';
import BasButton from './BasButton.vue';
import BasIcon from './BasIcon.vue';

const emits = defineEmits(['update:modelValue']);

const props = withDefaults(
  defineProps<{
    label?: string;
    name?: string;
    modelValue: string;
    clearable?: boolean;
    primary?: string | boolean | undefined;
    secondary?: string | boolean | undefined;
    tertiary?: string | boolean | undefined;
    disabled?: string | boolean | undefined;
    error?: string | boolean | undefined;
  }>(),
  {
    label: undefined,
    name: '',
    modelValue: undefined,
    primary: undefined,
    secondary: undefined,
    tertiary: undefined,
    disabled: undefined,
    error: undefined,
  }
);

const inputField = ref<HTMLInputElement>();

const cValue = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    emits('update:modelValue', value);
  },
});

const clear = () => {
  cValue.value = '';
  inputField.value?.focus();
};
</script>

<style scoped>
.bas-input {
  --color-bg: var(--color-primary);
  --color-text: var(--color-primary-text);
  --color-border: var(--color-primary-border);
  --color-ring: var(--color-primary-ring);
}
.bas-input.secondary {
  --color-bg: var(--color-secondary);
  --color-text: var(--color-secondary-text);
  --color-border: var(--color-secondary-border);
  --color-ring: var(--color-secondary-ring);
}
.bas-input.tertiary {
  --color-bg: var(--color-tertiary);
  --color-text: var(--color-tertiary-text);
  --color-border: var(--color-tertiary-border);
  --color-ring: var(--color-tertiary-ring);
}
.bas-input.error {
  --color-bg: var(--color-error);
  --color-text: var(--color-error-text);
  --color-border: var(--color-error-border);
  --color-ring: var(--color-error-ring);
}
.bas-input.disabled {
  --color-bg: var(--color-secondary);
  --color-text: var(--color-secondary-text);
  --color-border: var(--color-secondary-border);
  --color-ring: var(--color-secondary-ring);
  @apply border-opacity-50 opacity-50;
}
body.dark .bas-input.disabled {
  @apply border-opacity-40 opacity-40;
}
.bas-input {
  @apply my-2 w-full;
  .bas-input-fieldset {
    @apply border border-$color-border rounded pl-2;
    input {
      @apply bg-transparent outline-none text-base mb-2 w-full px-1 pt-2 pb-2;
    }
  }
  .bas-input-legend {
    @apply text-xs text-$color-text opacity-80 px-1 pt-0.25;
  }
  .bas-input-message {
    @apply mt-1 text-sm text-$color-text;
  }
}
.bas-input:not(.disabled) .bas-input-fieldset:focus-within {
  @apply border-2 -mx-0.25 -mb-0.25;
}
input:-webkit-autofill,
input:-webkit-autofill:focus {
  transition: background-color 600000s 0s, color 600000s 0s;
}
input[data-autocompleted] {
  background-color: transparent !important;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .bas-input {
    @apply transition-all;
  }
}
</style>
