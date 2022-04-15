<template>
  <div class="grid grid-cols-2 gap-4 mt-4">
    <RetroSection
      v-for="(section, sectionIndex) in sections"
      :key="`section_${sectionIndex}`"
      :data="section"
    ></RetroSection>
  </div>
</template>

<script setup lang="ts">
import { RetroType, type RetroSectionData } from '../../infra/types/Section';
import RetroSection from '../components/RetroSection.vue';

const sections: RetroSectionData[] = [
  {
    title: 'Things we should continue doing...',
    type: RetroType.CONTINUE,
    messages: [
      {
        label: 'We are a great team',
      },
      {
        label: 'Always available',
      },
    ],
  },
  {
    title: 'Things we should stop doing...',
    type: RetroType.STOP,
    messages: [
      {
        label: 'So many meetings...',
      },
      {
        label: 'No time for coding :-[',
      },
    ],
  },
  {
    title: 'May be we could try...',
    type: RetroType.TRY,
    messages: [
      {
        label: 'Morning excersises O_o',
      },
      {
        label: "A component's library",
      },
    ],
  },
  {
    title: 'Kudos...',
    type: RetroType.KUDOS,
    messages: [
      {
        label: 'Thank you all!!!',
      },
    ],
  },
];
</script>

<style scoped></style>
