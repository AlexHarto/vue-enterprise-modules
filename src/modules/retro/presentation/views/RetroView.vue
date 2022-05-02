<template>
  <div class="grid lg:grid-cols-2 gap-6 my-6">
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
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRetroStore } from '../../store';
import RetroSection from '../components/RetroSection.vue';

const store = useRetroStore();
const { sections } = storeToRefs(store);
const { loadRoomData } = store;

const globalChecks = ref(false);
const globalSort = ref(false);

const updateGlobalChecks = (val: boolean) => {
  globalChecks.value = val;
};

const updateGlobalSort = (val: boolean) => {
  globalSort.value = val;
};

// TODO: Remove mock data
onMounted(() => {
  loadRoomData('O2JgLQvYsTRPNT58yAkS');
});
</script>
