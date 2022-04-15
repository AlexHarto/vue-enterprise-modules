import router from '@/router';
import type { RouteRecordName, RouteRecordRaw } from 'vue-router';

const useModules = (routes: RouteRecordRaw[]) => {
  const registerModule = (
    parentName: RouteRecordName | undefined = undefined
  ) => {
    for (const route of routes) {
      if (parentName) {
        router.addRoute(parentName, route);
      } else {
        router.addRoute(route);
      }
    }
  };

  const unregisterModule = () => {
    for (const route of routes) {
      if (route.name) {
        router.removeRoute(route.name);
      }
    }
  };
  return { registerModule, unregisterModule };
};

export default useModules;
