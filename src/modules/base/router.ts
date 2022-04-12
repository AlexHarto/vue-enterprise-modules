import type { Router, RouteRecordName, RouteRecordRaw } from 'vue-router';

/**
 * Route names: Add module name as prefix to make them unique
 */
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

export const registerModule = (
  router: Router,
  parentName: RouteRecordName | undefined = undefined
) => {
  routes.forEach((route) => {
    if (parentName) {
      router.addRoute(parentName, route);
    } else {
      router.addRoute(route);
    }
  });
};

export const unregisterModule = (router: Router) => {
  routes.forEach((route) => {
    if (route.name) {
      router.removeRoute(route.name);
    }
  });
};
