<template>
  <div class="grid gap-4 mx-auto max-w-[300px]">
    <h2 class="text-xl font-bold">{{ t('auth.login.title') }}</h2>
    <div class="p-4 my-2 text-center rounded bg-warning-bg">
      <p>
        {{ t('auth.login.new_to_service') }}
        <BasLink
          :route-name="routeNames.AUTH_SIGNUP"
          :label="t('auth.signup.title') + '!'"
        ></BasLink>
      </p>
    </div>
    <form class="grid gap-4" @submit.prevent="handleSubmit">
      <BasInput
        v-model="email"
        name="email"
        type="email"
        label="Email:"
        label-class="text-sm"
      ></BasInput>
      <BasInput
        v-model="password"
        name="password"
        type="password"
        label="Password:"
        label-class="text-sm"
      ></BasInput>
      <BasButton class="ml-auto bg-secondary-bg">
        {{ t('auth.login.title') }}
      </BasButton>
    </form>
    <!-- TODO: Create an error list with translations -->
    <div v-if="error" class="mt-4 danger">
      <p>Something wrong happened.</p>
      <p>Please, check your email and password and try again.</p>
      <p>
        Please, make sure that you have clicked on the confirmation link sent by
        email.
      </p>
    </div>
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
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
const { t } = useI18n();
const { error, login } = useAuth();

const email = ref('');
const password = ref('');

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
