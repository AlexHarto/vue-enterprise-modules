<template>
  <form
    class="w-1/4 min-w-80 grid gap-4"
    @submit.prevent="joinSessionClickHandler"
  >
    <BasInput
      v-model="userName"
      name="userName"
      :label="t('retro.join_session.name')"
      :placeholder="t('retro.join_session.name_placeholder')"
    ></BasInput>
    <transition name="fade" mode="out-in">
      <p v-if="joinSessionClicked && userName === ''" class="-mt-4 danger">
        {{ t('retro.join_session.name_error') }}
      </p>
    </transition>
    <BasInput
      v-model="sessionCode"
      name="sessionCode"
      :label="t('retro.join_session.code')"
      :placeholder="t('retro.join_session.code_placeholder')"
    ></BasInput>
    <transition name="fade" mode="out-in">
      <p v-if="joinSessionClicked && sessionCode === ''" class="-mt-4 danger">
        {{ t('retro.join_session.code_error') }}
      </p>
    </transition>
    <BasButton class="ml-auto mt-2 w-min bg-secondary-bg">
      {{ t('retro.join_session.submit') }}
    </BasButton>
  </form>
</template>

<script setup lang="ts">
import BasButton from '@/components/BasButton.vue';
import BasInput from '@/components/BasInput.vue';
import { retroRouteNames } from '@/modules/retro';
import { useRetroStore } from '@/modules/retro/store';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();

const router = useRouter();
const retroStore = useRetroStore();

const sessionCode = ref();
const userName = ref();
const joinSessionClicked = ref(false);

const joinSessionClickHandler = () => {
  joinSessionClicked.value = true;
  if (sessionCode.value.length > 0 && userName.value.length > 0) {
    const encodedRoomId = encodeURI(sessionCode.value);
    retroStore.changeUserName(userName.value);
    router.push({
      name: retroRouteNames.RETRO_ROOT,
      params: { roomId: encodedRoomId },
    });
  }
};

watch(
  () => retroStore.roomId,
  () => {
    sessionCode.value = retroStore.roomId;
  },
  { immediate: true }
);

watch(
  () => retroStore.userName,
  () => {
    userName.value = retroStore.userName;
  },
  { immediate: true }
);
</script>

<style scoped></style>
