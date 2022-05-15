import useModules from '@/infra/composables/Modules';
import { routeNames, routes } from './router';

const { registerModule, unregisterModule } = useModules(routes);

export { routeNames as retroRouteNames };

export default { registerModule, unregisterModule };
