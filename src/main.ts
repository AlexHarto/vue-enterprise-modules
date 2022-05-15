import App from '@/App.vue';
import en from '@/locales/en';
import es from '@/locales/es';
import base, { baseRouteNames } from '@/modules/base';
import retro from '@/modules/retro';
import router from '@/router';
import { createPinia } from 'pinia';
import 'virtual:windi.css';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import auth, { authRouteNames } from './modules/auth';
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

base.registerModule();

// Register Auth module
auth.registerModule(baseRouteNames.BASE_ROOT);
// Add Login and SignUp to the main menu
base.addMenuItem('auth.login.menu_label', authRouteNames.AUTH_LOGIN, true);

// Register Retro module inside HOME
retro.registerModule(baseRouteNames.BASE_HOME);

app.use(router);
app.mount('#app');
