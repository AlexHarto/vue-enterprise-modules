<template>
  <form class="min-w-80 grid w-1/4" @submit.prevent="createSessionClickHandler">
    <BasInput
      v-model="retroStore.userName"
      name="userName"
      disabled
      :label="t('retro.session.name')"
      :placeholder="t('retro.session.name_placeholder')"
    ></BasInput>
    <BasInput
      v-model="sessionCode"
      name="sessionCode"
      :label="t('retro.session.code')"
      :placeholder="t('retro.session.create_code_placeholder')"
    >
      <template #message>
        <p v-if="createSessionClicked && sessionCode === ''" class="danger">
          {{ t('retro.session.code_error') }}
        </p>
      </template>
    </BasInput>
    <BasButton class="ml-auto mt-2">
      {{ t('retro.session.create_session_btn') }}
    </BasButton>
  </form>
</template>

<script setup lang="ts">
import BasButton from '@/components/BasButton.vue';
import BasInput from '@/components/BasInput.vue';
import { retroRouteNames } from '@/modules/retro';
import { useRetroStore } from '@/modules/retro/store';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();

const router = useRouter();
const retroStore = useRetroStore();

const sessionCode = ref('');
const createSessionClicked = ref(false);

const createSessionClickHandler = () => {
  createSessionClicked.value = true;
  if (sessionCode.value.length > 0) {
    const encodedRoomId = encodeURI(sessionCode.value);
    router.push({
      name: retroRouteNames.RETRO_ROOT,
      params: { roomId: encodedRoomId },
    });
  }
};
</script>

<style scoped></style>
