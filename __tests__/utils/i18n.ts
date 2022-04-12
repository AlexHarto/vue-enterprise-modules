import en from '@/locales/en';
import es from '@/locales/es';
import { createI18n } from 'vue-i18n';

export const i18n = createI18n({
  locale: 'en',
  messages: {
    en,
    es,
  },
});

export const t = i18n.global.t;
