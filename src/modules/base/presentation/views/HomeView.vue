<template>
  <div>
    <div v-if="!roomId">
      <h1 class="text-xl font-bold">
        {{ t('home.presentation.title') }}
      </h1>
      <p class="mt-1">
        {{ t('home.presentation.text') }}
      </p>
      <h2 class="mt-8 text-lg font-bold">
        {{ t('home.join_session.title') }}
      </h2>
      <p class="mt-0.5">
        {{ t('home.join_session.text') }}
      </p>

      <!-- JOIN SESSION FROM RETRO -->
      <div class="my-4 border-2 p-6 rounded w-min border-primary-bg">
        <JoinSession></JoinSession>
      </div>

      <h2 class="mt-8 text-lg font-bold">
        {{ t('home.create_session.title') }}
      </h2>
      <!-- USER AND CREATE SESSION FROM RETRO -->
      <div
        v-if="isLoggedIn"
        class="my-4 border-2 p-6 rounded w-min border-primary-bg"
      >
        <CreateSession></CreateSession>
      </div>
      <div v-else>
        <p class="mt-0.5">
          {{ t('home.create_session.text1') }}
        </p>
        <p class="mt-1">
          {{ t('home.create_session.text2') }}
          <BasLink
            :route-name="authRouteNames.AUTH_LOGIN"
            :label="t('auth.login.menu_label')"
          ></BasLink>
          {{ t('home.create_session.text3') }}
          <BasLink
            :route-name="authRouteNames.AUTH_SIGNUP"
            :label="t('auth.signup.menu_label')"
          ></BasLink>
          {{ t('home.create_session.text4') }}
        </p>
      </div>
      <h2 class="mt-8 text-lg font-bold">{{ t('home.disclaimer.title') }}</h2>
      <p class="mt-0.5">
        {{ t('home.disclaimer.text1') }}
        {{ t('home.disclaimer.text2') }}
        <BasLink
          href="https://github.com/AlexHarto/vue-enterprise-modules"
          new-window
          :label="t('home.disclaimer.text3')"
        ></BasLink>
        {{ t('home.disclaimer.text4') }}
      </p>

      <p class="mt-8 mb-8">
        {{ t('home.salutation') }}
      </p>
    </div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import BasLink from '@/components/BasLink.vue';
import { authRouteNames, isLoggedIn } from '@/modules/auth';
import { CreateSession, JoinSession } from '@/modules/retro';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterView, useRoute } from 'vue-router';

const { t } = useI18n();
const route = useRoute();

const roomId = computed(() => route.params.roomId);
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
