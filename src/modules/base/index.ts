import useModules from '@/infra/composables/Modules';
import type { Ref } from 'vue';
import en from './locales/en';
import es from './locales/es';
import { routeNames, routes } from './router';
import { useMainMenuStore } from './store';

const { registerModule, unregisterModule, addLocales } = useModules(routes);
const addModuleLocales = (messages: Ref) => addLocales(messages, { en, es });

const addMenuItem = (
  label: string,
  routeName: string,
  isVisible: boolean | Ref<boolean> = true
) => {
  const { addItemToMainMenu } = useMainMenuStore();

  addItemToMainMenu({
    label,
    routeName,
    isVisible: typeof isVisible === 'boolean' ? isVisible : isVisible.value,
  });
};

const removeMenuItem = (routeName: string) => {
  const { removeItemFromMainMenu } = useMainMenuStore();

  removeItemFromMainMenu(routeName);
};

export { routeNames as baseRouteNames };

export default {
  registerModule,
  unregisterModule,
  addModuleLocales,
  addMenuItem,
  removeMenuItem,
};
