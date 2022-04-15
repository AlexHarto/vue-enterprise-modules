<template>
  <div class="grid grid-cols-2 gap-6 mt-4">
    <RetroSection
      v-for="(section, sectionIndex) in sections"
      :key="`section_${sectionIndex}`"
      :data="section"
    ></RetroSection>
  </div>
</template>

<script setup lang="ts">
import { useRetroStore } from '../../store';
import RetroSection from '../components/RetroSection.vue';

const { sections } = useRetroStore();
</script>

<style scoped></style>
