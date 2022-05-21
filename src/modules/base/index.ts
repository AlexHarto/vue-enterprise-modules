import useModules from '@/infra/composables/Modules';
import type { Ref } from 'vue';
import { routeNames, routes } from './router';
import { useMainMenuStore } from './store';

const { registerModule, unregisterModule } = useModules(routes);

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
  addMenuItem,
  removeMenuItem,
};
