import App from '@/App.vue';
import en from '@/locales/en';
import es from '@/locales/es';
import base from '@/modules/base';
import router from '@/router';
import { createPinia } from 'pinia';
import 'virtual:windi.css';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import './styles/main.css';

const app = createApp(App);

const i18n = createI18n({
  locale: 'en',
  messages: {
    en,
    es,
  },
});
app.use(i18n);

app.use(createPinia());

base.registerModule(router);

app.use(router);
app.mount('#app');
