<template>
  <RouterView v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <component
        :is="Component"
        :key="route.path"
        class="px-4 mx-auto mt-8 max-w-7xl"
      />
    </transition>
  </RouterView>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style scoped></style>
