import useModules from '@/infra/composables/Modules';
import type { Ref } from 'vue';
import { routeNames, routes } from './router';
import { useMainMenuStore } from './store';

const { registerModule, unregisterModule } = useModules(routes);

const addMenuItem = (
  label: string,
  routeName: string,
  isVisible: boolean | Ref<boolean>
) => {
  const store = useMainMenuStore();
  const { addItemToMainMenu } = store;
  addItemToMainMenu({ label, routeName, isVisible });
};

export default { registerModule, unregisterModule, routeNames, addMenuItem };
