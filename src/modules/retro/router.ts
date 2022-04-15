import type { RouteRecordRaw } from 'vue-router';

/**
 * Route names: Add module name as prefix to make them unique
 */
export enum routeNames {
  RETRO_ROOT = 'RETRO_ROOT',
}

const RetroView = () => import('./presentation/views/RetroView.vue');

export const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: routeNames.RETRO_ROOT,
    component: RetroView,
  },
];
