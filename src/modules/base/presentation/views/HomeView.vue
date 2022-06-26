<template>
  <div>
    <div v-if="!roomId">
      <h1 class="font-bold text-xl">
        {{ t('home.presentation.title') }}
      </h1>
      <p class="mt-1">
        {{ t('home.presentation.text') }}
      </p>
      <h2 class="font-bold mt-8 text-lg">
        {{ t('home.join_session.title') }}
      </h2>
      <p class="mt-0.5">
        {{ t('home.join_session.text') }}
      </p>

      <!-- JOIN SESSION FROM RETRO -->
      <div class="border-primary-bg rounded border-2 my-4 w-min p-6">
        <JoinSession></JoinSession>
      </div>

      <h2 class="font-bold mt-8 text-lg">
        {{ t('home.create_session.title') }}
      </h2>
      <!-- USER AND CREATE SESSION FROM RETRO -->
      <div
        v-if="isLoggedIn"
        class="border-primary-bg rounded border-2 my-4 w-min p-6"
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
      <h2 class="font-bold mt-8 text-lg">{{ t('home.disclaimer.title') }}</h2>
      <p class="mt-0.5">
        {{ t('home.disclaimer.text1') }}
        {{ t('home.disclaimer.text2') }}
        <BasLink
          href="https://github.com/AlexHarto/vue-enterprise-modules"
          new-window
          :label="t('home.disclaimer.text3')"
        ></BasLink
        >{{ t('home.disclaimer.text4') }}
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

<style scoped></style>
