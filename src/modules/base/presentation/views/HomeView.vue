<template>
  <div>
    <h1 class="mb-4 text-lg font-bold">{{ t('home.presentation.title') }}</h1>
    <p>{{ t('home.presentation.intro1') }}</p>
    <p>{{ t('home.presentation.intro2') }}</p>
    <p class="mt-4">{{ t('home.presentation.salutation') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
