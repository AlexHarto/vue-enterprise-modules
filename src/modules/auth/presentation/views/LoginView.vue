<template>
  <div class="mx-auto max-w-[300px] grid gap-4">
    <h2 class="font-bold text-xl">{{ t('auth.login.title') }}</h2>
    <div class="my-1 text-center">
      {{ t('auth.login.new_to_service') }}
      <BasLink
        :route-name="routeNames.AUTH_SIGNUP"
        :label="t('auth.signup.title') + '!'"
      ></BasLink>
    </div>
    <form class="grid gap-1" @submit.prevent="handleSubmit">
      <BasInput
        v-model="email"
        name="email"
        type="email"
        label="Email:"
        :error="emailNotFound"
      >
        <template #message>
          <transition name="fade" mode="out-in">
            <span v-if="emailNotFound">
              {{ t(`errors.${errorCode}`) }}
            </span>
          </transition>
        </template>
      </BasInput>
      <BasInput
        v-model="password"
        name="password"
        type="password"
        label="Password:"
        :error="wrongPassword"
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
      <BasButton class="bg-secondary-bg ml-auto mt-2">
        {{ t('auth.login.title') }}
      </BasButton>
    </form>
    <transition name="fade" mode="out-in">
      <div
        v-if="
          errorCode &&
          !['auth/user-not-found', 'auth/invalid-password'].includes(errorCode)
        "
        class="my-2 text-$color-error text-center p-4 colorize"
      >
        <p>
          {{ t(`errors.${errorCode}`) }}
        </p>
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
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { getError } from '../../infra/utils/ErrorUtils';

const router = useRouter();
const { t } = useI18n();
const { error, login } = useAuth();

const email = ref('');
const password = ref('');

const errorCode = computed(() => getError(error.value));
const emailNotFound = computed(() => errorCode.value === 'auth/user-not-found');
const wrongPassword = computed(
  () => errorCode.value === 'auth/invalid-password'
);

const handleSubmit = async () => {
  await login(email.value, password.value);
  if (!error.value && isUser()) {
    router.push({ name: baseRouteNames.BASE_HOME });
  }
};

// Auto-Login
onMounted(() => {
  if (isUser()) {
    router.push({ name: baseRouteNames.BASE_HOME });
  }
});
</script>

<style scoped></style>
