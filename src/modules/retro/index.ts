import useModules from '@/infra/composables/Modules';
import type { Ref } from 'vue';
import en from './locales/en';
import es from './locales/es';
import CreateSession from './presentation/components/CreateSession.vue';
import JoinSession from './presentation/components/JoinSession.vue';
import { routeNames, routes } from './router';

const { registerModule, unregisterModule, addLocales } = useModules(routes);
const addModuleLocales = (messages: Ref) => addLocales(messages, { en, es });

export { routeNames as retroRouteNames };
export { JoinSession, CreateSession };

export default { registerModule, unregisterModule, addModuleLocales };
