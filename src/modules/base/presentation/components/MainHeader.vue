<template>
  <div class="bg-gray-200">
    <div
      class="flex items-center justify-between px-4 mx-auto max-w-7xl min-h-16"
    >
      <div class="text-xl font-bold" data-test="logo">
        {{ t('header.app') }}
      </div>
      <div class="flex items-center">
        <template v-for="menuItem in menuItems" :key="menuItem.routeName">
          <RouterLink
            v-if="menuItem.isVisible"
            :to="{ path: getRoutePath(menuItem.routeName) }"
            data-test="router-link"
          >
            <div class="px-2.5 py-1.5" data-test="menu-item">
              {{ t(menuItem.label) }}
            </div>
            <div
              :class="[
                'transition-colors duration-300 ease-in-out',
                currentPath === getRoutePath(menuItem.routeName)
                  ? 'selected-underline'
                  : 'unselected-underline delay-75',
              ]"
            ></div>
          </RouterLink>
        </template>
        <LanguageSelector></LanguageSelector>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRoutePath } from '@/router';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink, useRouter } from 'vue-router';
import { useMainMenuStore } from '../../store';
import LanguageSelector from './LanguageSelector.vue';

const { t } = useI18n();

const router = useRouter();

const mainMenuStore = useMainMenuStore();
const { menuItems } = storeToRefs(mainMenuStore);

const currentPath = computed(() => {
  return router.currentRoute.value.path;
});
</script>

<style scoped>
.selected-underline {
  @apply border-b-2 border-gray-500;
}
.unselected-underline {
  @apply border-b-2 border-transparent;
}
</style>
