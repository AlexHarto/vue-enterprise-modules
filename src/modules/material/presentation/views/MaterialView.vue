<template>
  <div class="m-6">
    <h1 class="font-bold mb-4 text-3xl">Components (based on material 3)</h1>
    <label>
      <input id="dark" v-model="darkMode" type="checkbox" name="dark" />
      Dark mode
    </label>
    <div class="flex py-6 gap-2">
      <div>
        <h1 class="font-bold text-2xl">Buttons</h1>

        <div v-for="theme in ['Default', 'Outlined', 'Text']" :key="theme">
          <p class="mt-6">
            <strong>{{ theme }}</strong>
          </p>
          <div v-for="t in 3" :key="t">
            <BasButton
              class="m-6 block"
              :secondary="t === 2 ? '' : undefined"
              :tertiary="t === 3 ? '' : undefined"
              :outlined="theme === 'Outlined' ? '' : undefined"
              :text="theme === 'Text' ? '' : undefined"
              :tonal="theme === 'Tonal' ? '' : undefined"
              :label="buttonStatus"
              @mouseover="isOver = true"
              @mouseout="isOver = false"
              @focus="isFocused = true"
              @blur="isFocused = false"
            ></BasButton>
            <BasButton
              :secondary="t === 2 ? '' : undefined"
              :tertiary="t === 3 ? '' : undefined"
              :outlined="theme === 'Outlined' ? '' : undefined"
              :text="theme === 'Text' ? '' : undefined"
              :tonal="theme === 'Tonal' ? '' : undefined"
              label="Using icons"
              start-icon="plus"
              end-icon="plus"
              class="m-6 block"
            ></BasButton>
            <BasButton
              :secondary="t === 2 ? '' : undefined"
              :tertiary="t === 3 ? '' : undefined"
              :outlined="theme === 'Outlined' ? '' : undefined"
              :text="theme === 'Text' ? '' : undefined"
              :tonal="theme === 'Tonal' ? '' : undefined"
              icon="plus"
              class="m-6 block"
            ></BasButton>
            <BasButton
              :secondary="t === 2 ? '' : undefined"
              :tertiary="t === 3 ? '' : undefined"
              :outlined="theme === 'Outlined' ? '' : undefined"
              :text="theme === 'Text' ? '' : undefined"
              :tonal="theme === 'Tonal' ? '' : undefined"
              label="A"
              single-letter
              class="m-6 block"
            ></BasButton>
            <BasButton
              :secondary="t === 2 ? '' : undefined"
              :tertiary="t === 3 ? '' : undefined"
              :outlined="theme === 'Outlined' ? '' : undefined"
              :text="theme === 'Text' ? '' : undefined"
              :tonal="theme === 'Tonal' ? '' : undefined"
              label="Disabled"
              class="m-6 block"
              disabled
            ></BasButton>
          </div>
        </div>
      </div>
      <div>
        <h1 class="font-bold text-2xl">Chips</h1>
        <div
          v-for="theme in ['Default', 'Selected', 'Avatar', 'Avatar Selected']"
          :key="theme"
        >
          <p class="mt-6">
            <strong>{{ theme }}</strong>
          </p>
          <div v-for="t in 3" :key="t">
            <BasChip
              class="m-6 block"
              :secondary="t === 2 ? '' : undefined"
              :tertiary="t === 3 ? '' : undefined"
              :selected="theme.includes('Selected') ? '' : undefined"
              :avatar="
                theme.includes('Avatar') ? 'avatar-check.svg' : undefined
              "
              :label="buttonStatus"
              @mouseover="isOver = true"
              @mouseout="isOver = false"
              @focus="isFocused = true"
              @blur="isFocused = false"
            ></BasChip>
            <BasChip
              :secondary="t === 2 ? '' : undefined"
              :tertiary="t === 3 ? '' : undefined"
              :selected="theme.includes('Selected') ? '' : undefined"
              :start-icon="!theme.includes('Avatar') ? 'heart' : undefined"
              :avatar="
                theme.includes('Avatar') ? 'avatar-check.svg' : undefined
              "
              label="Using icons"
              end-icon="close"
              class="m-6 block"
            ></BasChip>
            <BasChip
              :secondary="t === 2 ? '' : undefined"
              :tertiary="t === 3 ? '' : undefined"
              :selected="theme.includes('Selected') ? '' : undefined"
              :avatar="
                theme.includes('Avatar') ? 'avatar-check.svg' : undefined
              "
              label="Elevated"
              class="m-6 block"
              elevated
            ></BasChip>
            <BasChip
              :secondary="t === 2 ? '' : undefined"
              :tertiary="t === 3 ? '' : undefined"
              :selected="theme.includes('Selected') ? '' : undefined"
              :avatar="
                theme.includes('Avatar') ? 'avatar-check.svg' : undefined
              "
              label="Disabled"
              class="m-6 block"
              disabled
            ></BasChip>
          </div>
        </div>
      </div>
      <div>
        <h1 class="font-bold text-2xl">Input</h1>
        <div v-for="theme in ['Default']" :key="theme">
          <p class="mt-6">
            <strong>{{ theme }}</strong>
          </p>
          <div v-for="t in 3" :key="t">
            <BasInput
              v-model="vmodelInput"
              :primary="t === 1 ? '' : undefined"
              :secondary="t === 2 ? '' : undefined"
              :tertiary="t === 3 ? '' : undefined"
              clearable
              label="Label"
            >
              <template #message>Some instructions</template>
            </BasInput>
            <BasInput
              v-model="vmodelInput"
              :primary="t === 1 ? '' : undefined"
              :secondary="t === 2 ? '' : undefined"
              :tertiary="t === 3 ? '' : undefined"
              placeholder="Placeholder"
              label="Label"
            >
              <template #message>Some instructions</template>
            </BasInput>
            <BasInput
              v-model="vmodelInput"
              :secondary="t === 2 ? '' : undefined"
              :tertiary="t === 3 ? '' : undefined"
              placeholder="Placeholder"
              error
              clearable
              label="Label"
            >
              <template #message>Something wrong happened</template>
            </BasInput>
            <BasInput
              v-model="vmodelInput"
              :secondary="t === 2 ? '' : undefined"
              :tertiary="t === 3 ? '' : undefined"
              placeholder="Placeholder"
              disabled
              error
              clearable
              label="Disabled"
            >
              <template #message>Something wrong happened</template>
            </BasInput>
          </div>
        </div>
      </div>
    </div>
    <div class="flex">
      <button
        class="border rounded-full font-medium bg-green-800 bg-opacity-10 border-green-800 ml-96 transition-colors text-green-900 hover:bg-opacity-20 active:bg-opacity-30"
      >
        <div class="flex py-2.5 px-5 gap-2 justify-center items-center">
          <BasIcon
            icon="close"
            class="h-4 transform stroke-2 w-4 rotate-45"
          ></BasIcon>
          <span>Enabled</span>
        </div>
      </button>
      <button
        class="rounded-full font-medium bg-green-800 text-white ml-28 transition-colors hover:bg-opacity-80 active:bg-opacity-90"
      >
        <div class="flex py-2.5 px-5 justify-center items-center">
          <span>Enabled</span>
        </div>
      </button>
      <button
        class="rounded-full font-medium bg-green-600 bg-opacity-20 ml-28 transition-colors hover:bg-opacity-40 active:bg-opacity-50"
      >
        <div class="flex py-2.5 px-5 justify-center items-center">
          <span>Enabled</span>
        </div>
      </button>
      <button
        class="border rounded-full font-medium bg-green-600 bg-opacity-0 border-green-800 ml-28 transition-colors text-green-900 hover:bg-opacity-10 active:bg-opacity-20"
      >
        <div class="flex py-2.5 px-5 justify-center items-center">
          <span>Enabled</span>
        </div>
      </button>
    </div>
    <br />
    <br />
    <div class="flex">
      <button
        disabled
        class="border rounded-full cursor-default font-medium bg-gray-800 bg-opacity-10 border-gray-800 ml-96 opacity-50 transition-colors text-gray-900"
      >
        <div class="flex py-2.5 px-5 gap-2 justify-center items-center">
          <BasIcon
            icon="close"
            class="h-4 transform stroke-2 w-4 rotate-45"
          ></BasIcon>
          <span>Enabled</span>
        </div>
      </button>
      <button
        disabled
        class="rounded-full cursor-default font-medium bg-gray-800 text-white ml-28 opacity-40 transition-colors"
      >
        <div class="flex py-2.5 px-5 justify-center items-center">
          <span>Enabled</span>
        </div>
      </button>
      <button
        disabled
        class="rounded-full cursor-default font-medium bg-gray-600 bg-opacity-20 ml-28 opacity-50 transition-colors"
      >
        <div class="flex py-2.5 px-5 justify-center items-center">
          <span>Enabled</span>
        </div>
      </button>
      <button
        disabled
        class="border rounded-full cursor-default font-medium bg-gray-600 bg-opacity-0 border-gray-800 ml-28 opacity-40 transition-colors text-gray-900"
      >
        <div class="flex py-2.5 px-5 justify-center items-center">
          <span>Enabled</span>
        </div>
      </button>
    </div>
    <br />
    <br />
    <div class="flex">
      <button
        class="font-medium ml-100 transition-colors text-green-900 hover:text-inherit"
      >
        <div class="flex py-2.5 px-5 gap-2 justify-center items-center">
          <span>Enabled</span>
        </div>
      </button>
      <button
        class="rounded-full font-medium bg-green-800 bg-opacity-0 ml-36 transition-colors hover:bg-opacity-20 active:bg-opacity-30"
      >
        <div class="flex p-2.5 gap-2 justify-center items-center">
          <BasIcon icon="heart" class="h-6 transform w-6"></BasIcon>
        </div>
      </button>
      <div class="flex ml-36 justify-center items-center">
        <button
          disabled
          class="border rounded-l-full cursor-default font-medium bg-green-600 bg-opacity-20 border-green-800 transform transition-colors translate-x-[2px]"
        >
          <div class="flex py-2.5 px-4 gap-2 justify-center items-center">
            <BasIcon icon="check" class="h-5 transform stroke-2 w-5"></BasIcon>
            <span>Selected</span>
          </div>
        </button>
        <button
          class="border font-medium bg-green-600 bg-opacity-0 border-green-800 transform transition-colors translate-x-[1px] hover:bg-opacity-10 active:bg-opacity-20"
        >
          <div class="flex py-2.5 px-8 justify-center items-center">
            <span>Enabled</span>
          </div>
        </button>
        <button
          class="border rounded-r-full font-medium bg-green-600 bg-opacity-0 border-green-800 transition-colors hover:bg-opacity-10 active:bg-opacity-20"
        >
          <div class="flex py-2.5 px-8 justify-center items-center">
            <span>Enabled</span>
          </div>
        </button>
      </div>
    </div>
    <br />
    <br />
    <div class="flex">
      <button
        disabled
        class="cursor-default font-medium ml-100 opacity-40 transition-colors text-gray-900"
      >
        <div class="flex py-2.5 px-5 gap-2 justify-center items-center">
          <span>Enabled</span>
        </div>
      </button>
      <button
        disabled
        class="rounded-full cursor-default font-medium bg-gray-800 bg-opacity-0 ml-36 opacity-40 transition-colors"
      >
        <div class="flex p-2.5 gap-2 justify-center items-center">
          <BasIcon icon="heart" class="h-6 transform w-6"></BasIcon>
        </div>
      </button>
      <div class="flex ml-36 justify-center items-center">
        <button
          class="border rounded-l-full font-medium bg-green-600 bg-opacity-0 border-green-800 transform transition-colors translate-x-[2px] hover:bg-opacity-10 active:bg-opacity-20"
        >
          <div class="flex py-2.5 px-8 justify-center items-center">
            <span>Enabled</span>
          </div>
        </button>
        <button
          disabled
          class="border cursor-default font-medium bg-green-600 bg-opacity-20 border-green-800 transform transition-colors translate-x-[1px]"
        >
          <div class="flex py-2.5 px-4 gap-2 justify-center items-center">
            <BasIcon icon="check" class="h-5 transform stroke-2 w-5"></BasIcon>
            <span>Selected</span>
          </div>
        </button>
        <button
          disabled
          class="border rounded-r-full cursor-default font-medium bg-green-600 bg-opacity-0 border-green-800 opacity-40 transition-colors"
        >
          <div class="flex py-2.5 px-8 justify-center items-center">
            <span>Disabled</span>
          </div>
        </button>
      </div>
    </div>
    <br />
    <br />
    <br />
  </div>
</template>

<script setup lang="ts">
import BasButton from '@/components/BasButton.vue';
import BasChip from '@/components/BasChip.vue';
import BasIcon from '@/components/BasIcon.vue';
import BasInput from '@/components/BasInput.vue';
import { computed, ref } from 'vue';

const isOver = ref(false);
const isFocused = ref(false);
const isDarkMode = ref(false);
const vmodelInput = ref('');

const darkMode = computed({
  get: () => isDarkMode.value,
  set: (newDarkMode: boolean) => {
    if (newDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    isDarkMode.value = newDarkMode;
  },
});

const buttonStatus = computed(() => {
  if (isFocused.value) {
    return 'Focused';
  }
  if (isOver.value) {
    return 'Hovered';
  }
  return 'Enabled';
});
</script>
