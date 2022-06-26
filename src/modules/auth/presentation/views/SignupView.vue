<template>
  <div class="mx-auto max-w-[300px] grid gap-4">
    <h2 class="font-bold text-xl">{{ t('auth.signup.title') }}</h2>
    <p class="my-1 text-center">
      {{ t('auth.signup.already_registered') }}
      <BasLink
        :route-name="routeNames.AUTH_LOGIN"
        :label="t('auth.login.title')"
      ></BasLink>
    </p>
    <form class="grid gap-1" @submit.prevent="handleSubmit">
      <BasInput
        v-model="displayName"
        name="displayName"
        type="text"
        :label="t('auth.form.name')"
        :error="submitted && displayName.length < 1"
      >
        <template #message>
          <transition name="fade" mode="out-in">
            <span v-if="submitted && displayName.length < 1">
              {{ t('errors.required') }}
            </span>
          </transition>
        </template>
      </BasInput>
      <BasInput
        v-model="email"
        name="email"
        type="email"
        :label="t('auth.form.email')"
        :error="errorCode"
      >
        <template #message>
          <transition name="fade" mode="out-in">
            <span
              v-if="
                [
                  'auth/email-already-in-use',
                  'auth/invalid-email',
                  'auth/operation-not-allowed',
                  'auth/weak-password',
                ].includes(errorCode)
              "
            >
              {{ t(`errors.${errorCode}`) }}
            </span>
          </transition>
        </template>
      </BasInput>
      <BasInput
        v-model="password"
        name="password"
        type="password"
        :label="t('auth.form.password')"
      ></BasInput>
      <BasInput
        v-model="passwordConfirmation"
        name="passwordConfirmation"
        type="password"
        :error="!passwordsMatch"
        :label="t('auth.form.confirm_password')"
      >
        <template #message>
          <transition name="fade" mode="out-in">
            <span v-if="!passwordsMatch">
              {{ t('errors.password_confirmation_doesnt_match') }}
            </span>
          </transition>
        </template>
      </BasInput>
      <BasButton class="bg-secondary-bg ml-auto mt-2">
        {{ t('auth.form.submit') }}
      </BasButton>
    </form>
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
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { getError } from '../../infra/utils/ErrorUtils';

const router = useRouter();
const { t } = useI18n();
const { error, signup } = useAuth();

const displayName = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const submitted = ref(false);

const errorCode = computed(() => getError(error.value));
const passwordsMatch = computed(
  () =>
    !submitted.value ||
    (submitted.value && password.value === passwordConfirmation.value)
);

const handleSubmit = async () => {
  let hasErrors = false;
  submitted.value = true;
  if (password.value !== passwordConfirmation.value) {
    hasErrors = true;
  }
  if (displayName.value.length < 1) {
    hasErrors = true;
  }
  if (!hasErrors) {
    await signup(displayName.value, email.value, password.value);
    // TODO: Email confirmation page
    if (!error.value && isUser()) {
      router.push({ name: baseRouteNames.BASE_HOME });
    }
  }
};
</script>

<style scoped></style>
