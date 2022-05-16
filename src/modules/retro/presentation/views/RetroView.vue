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
      {{ t('retro.loading') }}
    </div>
  </transition>
  <div v-if="store.roomId" class="flex">
    <BasButton outline class="w-min" @click="toggleControlsClickHandler">
      Toggle controls
    </BasButton>
    <transition name="fade" mode="out-in">
      <BasButton
        v-if="store.showControls"
        outline
        class="ml-6 w-min danger"
        @click="deleteRoomClickHandler"
      >
        Delete room
      </BasButton>
    </transition>
  </div>
  <BasModal
    v-if="store.userId === '' || store.roomId === ''"
    :open="isModalOpen"
    :title="t('retro.join_session.title')"
  >
    <JoinSession></JoinSession>
  </BasModal>
</template>

<script setup lang="ts">
import BasButton from '@/components/BasButton.vue';
import BasModal from '@/components/BasModal.vue';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useRetroStore } from '../../store';
import JoinSession from '../components/JoinSession.vue';
import RetroSection from '../components/RetroSection.vue';

const { t } = useI18n();
const route = useRoute();
const store = useRetroStore();
const { sections } = storeToRefs(store);
const { loadRoomData } = store;

const globalChecks = ref(false);
const globalSort = ref(false);
const isModalOpen = ref(false);
const isRoomLoading = ref(false);

const updateGlobalChecks = (val: boolean) => {
  globalChecks.value = val;
};

const updateGlobalSort = (val: boolean) => {
  globalSort.value = val;
};

const openModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const deleteRoomClickHandler = () => {
  store.deleteRoom();
};

const toggleControlsClickHandler = () => {
  store.showControls = !store.showControls;
};

onMounted(() => {
  if (route.params.roomId) {
    loadRoomData(route.params.roomId as string);
    isRoomLoading.value = true;
  }
  if (store.userId === '') {
    openModal();
  }
});
</script>
