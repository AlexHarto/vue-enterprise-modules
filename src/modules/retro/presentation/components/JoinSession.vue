<template>
  <form
    class="w-1/4 min-w-80 grid gap-4"
    @submit.prevent="joinSessionClickHandler"
  >
    <BasInput
      v-model="userId"
      name="userId"
      :label="t('retro.join_session.name')"
      :placeholder="t('retro.join_session.name_placeholder')"
    ></BasInput>
    <transition name="fade" mode="out-in">
      <p v-if="joinSessionClicked && userId === ''" class="-mt-4 danger">
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
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useRetroStore } from '../../store';

const { t } = useI18n();

const router = useRouter();
const store = useRetroStore();

const sessionCode = computed({
  get: () => store.roomId,
  set: (newRoomId: string) => {
    store.roomId = newRoomId;
  },
});
const userId = computed({
  get: () => store.userId,
  set: (newuserId: string) => {
    store.userId = newuserId;
  },
});
const joinSessionClicked = ref(false);

const joinSessionClickHandler = () => {
  joinSessionClicked.value = true;
  if (sessionCode.value.length > 0 && userId.value.length > 0) {
    const encodedRoomId = encodeURI(sessionCode.value);
    const encodedName = encodeURI(userId.value);
    store.userId = encodedName;
    router.push({
      name: retroRouteNames.RETRO_ROOT,
      params: { roomId: encodedRoomId },
    });
  }
};
</script>

<style scoped></style>
