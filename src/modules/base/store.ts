import { defineStore } from 'pinia';
import type { MenuItem } from './infra/types/MenuItem';
import { routeNames } from './router';

export const useMainMenuStore = defineStore('mainMenuStore', {
  state: () => {
    return {
      menuItems: [
        {
          routeName: routeNames.BASE_HOME,
          label: 'home.menu_label',
          isVisible: true,
        },
        {
          routeName: routeNames.BASE_ABOUT,
          label: 'about.menu_label',
          isVisible: true,
        },
      ] as MenuItem[],
    };
  },
  actions: {
    addItemToMainMenu(menuItem: MenuItem) {
      this.menuItems.push(menuItem);
    },
  },
});
