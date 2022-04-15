<template>
  <div class="relative">
    <transition name="fade-up">
      <div v-show="toastVisible" class="max-h-40">
        <div class="p-4 rounded bg-info-bg text-info-text border-info-border">
          <header
            class="flex items-center justify-between mb-2 -mt-2 font-semibold"
          >
            <div data-test="toast-title">
              <h1 class="mb-4 text-lg font-bold">
                {{ t('home.presentation.title') }}
              </h1>
            </div>
            <div data-test="toast-close" @click="removeToast">
              <SvgIcon
                icon="close"
                class="w-4 h-4 transition-all cursor-pointer stroke-2 hover:stroke-3 hover:scale-105"
                data-test="notification-close-icon"
              />
            </div>
          </header>
          <section class="flex items-center">
            <div class="w-full" data-test="notification-message">
              <p>
                {{ t('home.presentation.intro1') }}
                {{ t('home.presentation.intro2') }}
              </p>
              <p class="mt-4">{{ t('home.presentation.salutation') }}</p>
            </div>
          </section>
        </div>
      </div>
    </transition>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterView } from 'vue-router';

const { t } = useI18n();

const toastVisible = ref(true);

const removeToast = () => {
  toastVisible.value = false;
};
</script>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  @apply transition-all duration-400 ease-in-out;
}
.fade-up-enter-from,
.fade-up-leave-to {
  @apply opacity-0 max-h-0;
}
</style>
