<template>
  <BasDropdown id="language" :options="languageOptions" class="ml-5">
    <span class="uppercase">{{ locale }}</span>
  </BasDropdown>
</template>

<script setup lang="ts">
import BasDropdown from '@/components/BasDropdown.vue';
import type { DropdownOption } from '@/infra/types/DropdownOption';
import { useI18n } from 'vue-i18n';

const { t, locale, availableLocales } = useI18n();

const languageOptions: DropdownOption[] = [];

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
