<template>
  <div>
    <div v-if="retroStore.roomId" class="flex items-center justify-between">
      <div>
        <strong>{{ retroStore.userName }}</strong>
      </div>
      <BasExpandable :title="t('retro.controls.title')">
        <div class="grid gap-4 w-100 bg-white p-4">
          <transition name="fade" mode="out-in">
            <form class="flex gap-4 items-end" @submit.prevent="changeName">
              <BasInput
                v-model="userName"
                name="userName"
                :label="t('retro.controls.change_name')"
              ></BasInput>
              <BasButton class="w-min bg-secondary-bg">
                {{ t('retro.controls.apply_btn') }}
              </BasButton>
            </form>
          </transition>
          <transition name="fade" mode="out-in">
            <p v-show="nameChanged">
              {{ t('retro.controls.name_changed_to') }}
              {{ retroStore.userName }}
            </p>
          </transition>
          <div class="mt-4 flex justify-between">
            <BasButton class="w-min bg-red-700" @click="deleteRoomClickHandler">
              {{ t('retro.controls.delete_session.button') }}
            </BasButton>
            <BasButton
              class="w-min bg-secondary-bg"
              @click="toggleControlsClickHandler"
            >
              <span v-if="retroStore.showControls">
                {{ t('retro.controls.advanced_controls.hide') }}
              </span>
              <span v-else>
                {{ t('retro.controls.advanced_controls.show') }}
              </span>
              &nbsp;{{ t('retro.controls.advanced_controls.ticks') }}
            </BasButton>
          </div>
        </div>
      </BasExpandable>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="retroStore.dataAdded" class="grid lg:grid-cols-2 gap-6 my-6">
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
      <div v-else-if="isRoomLoading">
        {{ t('retro.loading') }}
      </div>
    </transition>
  </div>
  <BasModal
    v-if="!retroStore.userName || !retroStore.roomId"
    :open="isModalOpen"
    :title="t('retro.join_session.title')"
  >
    <JoinSession></JoinSession>
  </BasModal>
</template>

<script setup lang="ts">
import BasButton from '@/components/BasButton.vue';
import BasExpandable from '@/components/BasExpandable.vue';
import BasInput from '@/components/BasInput.vue';
import BasModal from '@/components/BasModal.vue';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useRetroStore } from '../../store';
import JoinSession from '../components/JoinSession.vue';
import RetroSection from '../components/RetroSection.vue';

const { t } = useI18n();
const route = useRoute();
const retroStore = useRetroStore();
const { sections } = storeToRefs(retroStore);

const userName = ref('');
const isChangingName = ref(false);
const nameChanged = ref(false);
const globalChecks = ref(false);
const globalSort = ref(false);
const isModalOpen = ref(false);
const isRoomLoading = ref(false);
let nameChangedTimeout: unknown = undefined;

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
  retroStore.deleteRoom();
};

const toggleControlsClickHandler = () => {
  retroStore.showControls = !retroStore.showControls;
};

const changeName = () => {
  isChangingName.value = false;
  retroStore.changeUserName(userName.value);
  nameChanged.value = true;
  nameChangedTimeout = setTimeout(() => {
    nameChanged.value = false;
  }, 3000);
};

onMounted(() => {
  if (route.params.roomId) {
    retroStore.loadRoomData(route.params.roomId as string);
    isRoomLoading.value = true;
  }
  if (!retroStore.userName) {
    openModal();
  } else {
    userName.value = retroStore.userName;
  }
});

onUnmounted(() => {
  if (nameChangedTimeout) {
    clearTimeout(nameChangedTimeout as number);
    nameChangedTimeout = undefined;
  }
});
</script>
