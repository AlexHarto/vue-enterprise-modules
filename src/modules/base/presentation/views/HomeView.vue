<template>
  <div class="relative">
    <h1 class="mb-2 text-xl font-bold">{{ t('home.presentation.title') }}</h1>
    <p>
      {{ t('home.presentation.text') }}
    </p>
    <form
      class="my-8 mx-auto border-2 p-6 rounded w-1/4 min-w-80 grid gap-4 border-primary-bg"
      @submit.prevent
    >
      <h2 class="pb-1 mb-2 text-lg font-bold border-b-2 border-primary-bg">
        {{ t('home.join_session.title') }}
      </h2>
      <BasInput
        v-model="sessionCode"
        name="sessionCode"
        :label="t('home.join_session.code')"
        :placeholder="t('home.join_session.code_placeholder')"
      ></BasInput>
      <BasInput
        v-model="userName"
        name="userName"
        :label="t('home.join_session.name')"
        :placeholder="t('home.join_session.name_placeholder')"
      ></BasInput>
      <BasButton
        class="ml-auto mt-2 w-min bg-secondary-bg"
        @click="joinSessionClickHandler"
      >
        {{ t('home.join_session.submit') }}
      </BasButton>
    </form>
    <h2 class="text-lg font-bold">{{ t('home.create_session.title') }}</h2>
    <p class="mt-2">
      {{ t('home.create_session.text1') }}
    </p>
    <p class="mt-2">
      {{ t('home.create_session.text2') }}
      <RouterLink :to="{ name: authRouteNames.AUTH_LOGIN }">
        {{ t('auth.login.title') }}
      </RouterLink>
      <a href="" class="underline"></a>
      {{ t('home.create_session.text3') }}
      <RouterLink :to="{ name: authRouteNames.AUTH_SIGNUP }">
        {{ t('auth.signup.title') }}
      </RouterLink>
      {{ t('home.create_session.text4') }}
    </p>
    <h2 class="mt-8 text-lg font-bold">{{ t('home.disclaimer.title') }}</h2>
    <p class="mt-2">
      {{ t('home.disclaimer.text1') }}
    </p>
    <p class="mt-2">
      {{ t('home.disclaimer.text2') }}
      <a
        href="https://github.com/AlexHarto/vue-enterprise-modules"
        target="_blank"
        class="underline"
      >
        {{ t('home.disclaimer.text3') }}
      </a>
      {{ t('home.disclaimer.text4') }}
    </p>

    <p class="mt-8 mb-8">
      {{ t('home.salutation') }}
    </p>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import BasButton from '@/components/BasButton.vue';
import BasInput from '@/components/BasInput.vue';
import { authRouteNames } from '@/modules/auth';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink, RouterView } from 'vue-router';

const { t } = useI18n();

const sessionCode = ref('');
const userName = ref('');

const joinSessionClickHandler = () => {
  // Join session
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
