<template>
  <div class="flex flex-col w-full h-full max-h-full overflow-hidden">
    <MainHeader />
    <main class="relative w-full h-full overflow-auto scroll-smooth">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component
            :is="Component"
            :key="route.path"
            class="px-4 mx-auto mt-8 max-w-7xl"
          />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import MainHeader from '../components/MainHeader.vue';
</script>

<style scoped></style>
