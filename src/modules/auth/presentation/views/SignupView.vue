<template>
  <div class="grid gap-4 mx-auto max-w-[300px]">
    <h2 class="text-xl font-bold">{{ t('auth.signup.title') }}</h2>
    <p class="p-4 my-2 text-center rounded bg-warning-bg">
      {{ t('auth.signup.already_registered') }}
      <BasLink
        :route-name="routeNames.AUTH_LOGIN"
        :label="t('auth.login.title')"
      ></BasLink>
    </p>
    <form class="grid gap-4" @submit.prevent="handleSubmit">
      <BasInput
        v-model="email"
        name="email"
        type="email"
        :label="t('auth.form.email')"
        label-class="text-sm"
      ></BasInput>
      <BasInput
        v-model="password"
        name="password"
        type="password"
        :label="t('auth.form.password')"
        label-class="text-sm"
      ></BasInput>
      <BasInput
        v-model="passwordConfirmation"
        name="passwordConfirmation"
        type="password"
        :label="t('auth.form.confirm_password')"
        label-class="text-sm"
      ></BasInput>
      <BasButton class="ml-auto bg-secondary-bg">
        {{ t('auth.form.submit') }}
      </BasButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import BasButton from '@/components/BasButton.vue';
import BasInput from '@/components/BasInput.vue';
import BasLink from '@/components/BasLink.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { routeNames } from '../../router';

const { t } = useI18n();

const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');

const handleSubmit = () => {
  console.log(email.value, password.value, passwordConfirmation.value);
};
</script>

<style scoped></style>
