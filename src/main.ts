import App from '@/App.vue';
import en from '@/locales/en';
import es from '@/locales/es';
import base, { baseRouteNames } from '@/modules/base';
import retro from '@/modules/retro';
import router from '@/router';
import { createPinia } from 'pinia';
import 'virtual:windi.css';
import { createApp, ref } from 'vue';
import { createI18n } from 'vue-i18n';
import auth from './modules/auth';
import './styles/main.css';

const app = createApp(App);

const messages = ref({ en, es });

const i18n = createI18n({
  locale: 'en',
  messages: messages.value,
});
app.use(i18n);

app.use(createPinia());

base.registerModule();
base.addModuleLocales(messages);

// Register Auth module
auth.registerModule(baseRouteNames.BASE_ROOT);
auth.addModuleLocales(messages);

// Register Retro module inside HOME
retro.registerModule(baseRouteNames.BASE_HOME);
retro.addModuleLocales(messages);

app.use(router);
app.mount('#app');
