<template>
  <div class="grid gap-4 mx-auto max-w-[300px]">
    <h2 class="text-xl font-bold">Login</h2>
    <div class="p-4 my-2 text-center rounded bg-warning-bg">
      <p>
        New to this service?
        <BasLink
          :route-name="routeNames.AUTH_SIGNUP"
          label="Sign up!"
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
      <BasButton class="ml-auto bg-secondary-bg">Login</BasButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import BasButton from '@/components/BasButton.vue';
import BasInput from '@/components/BasInput.vue';
import BasLink from '@/components/BasLink.vue';
import { ref } from 'vue';
import { routeNames } from '../../router';

const email = ref('');
const password = ref('');

const handleSubmit = () => {
  console.log(email.value, password.value);
};
</script>

<style scoped></style>
