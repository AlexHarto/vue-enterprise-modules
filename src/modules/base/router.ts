import type { RouteRecordRaw } from 'vue-router';
/**
 * Route names: Add module name as prefix to make them unique
 */
export enum routeNames {
  BASE_ROOT = 'BASE_ROOT',
  BASE_HOME = 'BASE_HOME',
  BASE_ROOMS = 'BASE_ROOMS',
}

const BaseLayout = () => import('./presentation/layouts/BaseLayout.vue');
const HomeView = () => import('./presentation/views/HomeView.vue');
const RoomsView = () => import('./presentation/views/RoomsView.vue');

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
        path: 'rooms',
        name: routeNames.BASE_ROOMS,
        component: RoomsView,
      },
    ],
  },
];
