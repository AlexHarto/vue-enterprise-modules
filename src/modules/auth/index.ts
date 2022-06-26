import useModules from '@/infra/composables/Modules';
import base from '@/modules/base';
import { computed, type Ref } from 'vue';
import useAuth from './infra/composables/Auth';
import en from './locales/en';
import es from './locales/es';
import { routeNames, routes } from './router';

const { registerModule, unregisterModule, addLocales } = useModules(routes);
const addModuleLocales = (messages: Ref) => addLocales(messages, { en, es });

const { user, updateUserName } = useAuth();

export const userName = computed(() => user.value?.displayName || '');
export const isLoggedIn = computed(() => user.value && user.value.displayName);

export { updateUserName };
export { routeNames as authRouteNames };

export const isUser = (): boolean => {
  base.removeMenuItem(routeNames.AUTH_LOGIN);
  base.removeMenuItem(routeNames.AUTH_SIGNUP);
  base.removeMenuItem(routeNames.AUTH_LOGOUT);
  if (user.value !== null) {
    base.addMenuItem('auth.logout.menu_label', routeNames.AUTH_LOGOUT);
    return true;
  }
  base.addMenuItem('auth.login.menu_label', routeNames.AUTH_LOGIN);
  base.addMenuItem('auth.signup.menu_label', routeNames.AUTH_SIGNUP);
  return false;
};

export default {
  registerModule,
  unregisterModule,
  addModuleLocales,
};
