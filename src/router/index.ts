import {
  createRouter,
  createWebHistory,
  type RouteRecordName,
} from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [],
});

export const getRoutePath = (name: RouteRecordName) => {
  if (router.hasRoute(name)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return router.getRoutes().find((r) => r.name === name)!.path;
  }
  return '';
};

export default router;
