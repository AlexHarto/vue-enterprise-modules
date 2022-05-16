import useModules from '@/infra/composables/Modules';
import JoinSession from './presentation/components/JoinSession.vue';
import { routeNames, routes } from './router';

const { registerModule, unregisterModule } = useModules(routes);

export { routeNames as retroRouteNames };
export { JoinSession };

export default { registerModule, unregisterModule };
