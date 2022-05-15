<template>
  <transition name="fade" mode="out-in">
    <div v-if="store.dataAdded" class="grid lg:grid-cols-2 gap-6 my-6">
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
    <div v-else-if="isRoomLoading" class="grid lg:grid-cols-2 gap-6 my-6">
      Loading...
    </div>
  </transition>
  <BasModal :open="isModalOpen" title="Name">
    <template #message>
      <p>Please, enter your name to join the room.</p>
      <p class="mt-2">We need a name to identify your ideas and likes.</p>
    </template>
    <form
      class="flex items-end gap-2 mt-4"
      method="dialog"
      @submit="userIdFormSubmitHandler"
    >
      <BasInput
        v-model="userId"
        name="userId"
        placeholder="Enter your name"
      ></BasInput>
      <BasButton label="Submit" class="max-h-max bg-base-dark"></BasButton>
    </form>
  </BasModal>
</template>

<script setup lang="ts">
import BasButton from '@/components/BasButton.vue';
import BasInput from '@/components/BasInput.vue';
import BasModal from '@/components/BasModal.vue';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRetroStore } from '../../store';
import RetroSection from '../components/RetroSection.vue';

const route = useRoute();
const store = useRetroStore();
const { sections } = storeToRefs(store);
const { loadRoomData } = store;

const globalChecks = ref(false);
const globalSort = ref(false);
const isModalOpen = ref(false);
const userId = ref('');
const isRoomLoading = ref(false);

const updateGlobalChecks = (val: boolean) => {
  globalChecks.value = val;
};

const updateGlobalSort = (val: boolean) => {
  globalSort.value = val;
};

const userIdFormSubmitHandler = () => {
  if (userId.value) {
    store.userId = encodeURI(userId.value);
    if (route.params.roomId) {
      loadRoomData(route.params.roomId as string);
      isRoomLoading.value = true;
    }
  }
};

const openModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

onMounted(() => {
  openModal();
});
</script>
