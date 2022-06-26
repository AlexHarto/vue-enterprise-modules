import router from '@/router';
import type { Ref } from 'vue';
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
  const addLocales = (messages: Ref, locales: Record<string, unknown>) => {
    for (const language of Object.keys(messages.value)) {
      if (Object.keys(locales).includes(language)) {
        const key = language as keyof typeof locales;
        Object.assign(messages.value[key], {
          ...messages.value[key],
          ...(locales[key] as object),
        });
      }
    }
  };
  return { registerModule, unregisterModule, addLocales };
};

export default useModules;
