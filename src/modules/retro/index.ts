import useModules from '@/infra/composables/Modules';
import CreateSession from './presentation/components/CreateSession.vue';
import JoinSession from './presentation/components/JoinSession.vue';
import { routeNames, routes } from './router';

const { registerModule, unregisterModule } = useModules(routes);

export { routeNames as retroRouteNames };
export { JoinSession, CreateSession };

export default { registerModule, unregisterModule };
