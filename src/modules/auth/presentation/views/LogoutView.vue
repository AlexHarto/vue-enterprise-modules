<template>
  <div></div>
</template>

<script setup lang="ts">
import { authRouteNames } from '@/modules/auth';
import useAuth from '@/modules/auth/infra/composables/Auth';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { logout } = useAuth();

onMounted(async () => {
  await logout();
  router.push({ name: authRouteNames.AUTH_LOGIN });
});
</script>

<style scoped></style>
