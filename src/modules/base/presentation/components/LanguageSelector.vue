<template>
  <DropDown id="language" :options="languageOptions" class="ml-5">
    <span class="uppercase">{{ locale }}</span>
  </DropDown>
</template>

<script setup lang="ts">
import DropDown from '@/components/DropDown.vue';
import type { DropDownOption } from '@/infra/types/DropDownOption';
import { useI18n } from 'vue-i18n';

const { t, locale, availableLocales } = useI18n();

const languageOptions: DropDownOption[] = [];

availableLocales.forEach((availableLocale) => {
  languageOptions.push({
    label: t(`header.language_${availableLocale}`),
    onClick: () => setLocale(availableLocale),
  });
});

const setLocale = (loc: typeof locale.value) => {
  locale.value = loc;
};
</script>
