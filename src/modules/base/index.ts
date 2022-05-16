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
  const store = useMainMenuStore();
  const { addItemToMainMenu } = store;

  addItemToMainMenu({
    label,
    routeName,
    isVisible: typeof isVisible === 'boolean' ? isVisible : isVisible.value,
  });
};

export { routeNames as baseRouteNames };

export default { registerModule, unregisterModule, addMenuItem };
