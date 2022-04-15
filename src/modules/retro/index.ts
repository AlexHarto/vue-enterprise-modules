import useModules from '@/infra/composables/Modules';
import { routeNames, routes } from './router';

const { registerModule, unregisterModule } = useModules(routes);

export default { registerModule, unregisterModule, routeNames };
