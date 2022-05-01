<template>
  <div class="grid gap-4 mx-auto max-w-[300px]">
    <h2 class="text-xl font-bold">Sign up</h2>
    <p class="p-4 my-2 text-center rounded bg-warning-bg">
      Already registered?
      <BasLink :route-name="routeNames.AUTH_LOGIN" label="Login"></BasLink>
    </p>
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
      <BasInput
        v-model="passwordConfirmation"
        name="passwordConfirmation"
        type="password"
        label="Confirm password:"
        label-class="text-sm"
      ></BasInput>
      <BasButton class="ml-auto bg-secondary-bg">Sign up</BasButton>
    </form>
    <div class="my-4 text-center">
      <p>Do you want to know more about the advantages of having an account?</p>
      <p class="mt-2">
        Learn more about it
        <BasLink :route-name="baseRouteNames.BASE_ABOUT">here</BasLink>.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasButton from '@/components/BasButton.vue';
import BasInput from '@/components/BasInput.vue';
import BasLink from '@/components/BasLink.vue';
import { routeNames as baseRouteNames } from '@/modules/base/router';
import { ref } from 'vue';
import { routeNames } from '../../router';

const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');

const handleSubmit = () => {
  console.log(email.value, password.value, passwordConfirmation.value);
};
</script>

<style scoped></style>
