/**
 * Create a regular routes array.
 * Recommended:
 * Create an enum with the routeNames so we can refer to them in the code
 * and when registering the module, in case we need nested modules.
 */

/*
import type { RouteRecordRaw } from 'vue-router';
// Route names: Add module name as prefix to make them unique
export enum routeNames {
  BASE_ROOT = 'BASE_ROOT',
  BASE_HOME = 'BASE_HOME',
  BASE_ABOUT = 'BASE_ABOUT',
}

const BaseLayout = () => import('./presentation/layouts/BaseLayout.vue');
const HomeView = () => import('./presentation/views/HomeView.vue');
const AboutView = () => import('./presentation/views/AboutView.vue');

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: routeNames.BASE_ROOT,
    component: BaseLayout,
    children: [
      {
        path: '',
        name: routeNames.BASE_HOME,
        component: HomeView,
      },
      {
        path: 'about',
        name: routeNames.BASE_ABOUT,
        component: AboutView,
      },
    ],
  },
];
*/

// REMOVE THIS LINE:
export default {};
