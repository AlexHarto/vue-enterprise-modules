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
        v-model="displayName"
        name="displayName"
        type="text"
        :label="t('auth.form.name')"
        label-class="text-sm"
      ></BasInput>
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
    <!-- TODO: Create an error list with translations -->
    <transition name="fade" mode="out-in">
      <div v-if="!passwordsMatch" class="mt-4 danger">
        <p>The password confirmation doesn't match.</p>
        <p>Please, check password and try again.</p>
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <div v-if="error" class="mt-4 danger">
        <p>{{ error }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import BasButton from '@/components/BasButton.vue';
import BasInput from '@/components/BasInput.vue';
import BasLink from '@/components/BasLink.vue';
import { isUser } from '@/modules/auth';
import useAuth from '@/modules/auth/infra/composables/Auth';
import { routeNames } from '@/modules/auth/router';
import { baseRouteNames } from '@/modules/base';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
const { t } = useI18n();
const { error, signup } = useAuth();

const displayName = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const passwordsMatch = ref(true);

const handleSubmit = async () => {
  if (password.value !== passwordConfirmation.value) {
    passwordsMatch.value = false;
  } else {
    passwordsMatch.value = true;
    await signup(displayName.value, email.value, password.value);
    // TODO: Email confirmation page
    if (!error.value && isUser()) {
      router.push({ name: baseRouteNames.BASE_HOME });
    }
  }
};
</script>

<style scoped></style>
