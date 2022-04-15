<template>
  <div class="grid grid-cols-2 gap-6 mt-6">
    <RetroSection
      v-for="(section, sectionIndex) in sections"
      :key="`section_${sectionIndex}`"
      :data="section"
      :global-checks="globalChecks"
      :global-sort="globalSort"
      @update:global-checks="updateGlobalChecks"
      @update:global-sort="updateGlobalSort"
    ></RetroSection>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRetroStore } from '../../store';
import RetroSection from '../components/RetroSection.vue';

const { sections } = useRetroStore();

const globalChecks = ref(false);
const globalSort = ref(false);

const updateGlobalChecks = (val: boolean) => {
  globalChecks.value = val;
};

const updateGlobalSort = (val: boolean) => {
  globalSort.value = val;
};
</script>

<style scoped></style>
