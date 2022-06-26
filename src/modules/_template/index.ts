/**
 * This is the entry point of your module and exposes the functions used in main.ts.
 * Mandatories: registerModule, unregisterModule.
 * Recommended: moduleRouteNames (for nested modules). Change 'module' for your module name.
 * Optional: addModuleLocales. Adds the module locales to i18n messages.
 */

/*
import useModules from '@/infra/composables/Modules';
import type { Ref } from 'vue';
import en from './locales/en'; // with module locales
import es from './locales/es'; // with module locales
import { routeNames, routes } from './router';

// const { registerModule, unregisterModule } = useModules(routes); // without module locales

const { registerModule, unregisterModule, addLocales } = useModules(routes); // with module locales
const addModuleLocales = (messages: Ref) => addLocales(messages, { en, es }); // with module locales

export { routeNames as moduleRouteNames }

// export default { registerModule, unregisterModule }; // without module locales
export default { registerModule, unregisterModule, addModuleLocales }; // with module locales
*/

// REMOVE THIS LINE:
export default {};
