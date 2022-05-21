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
      ] as MenuItem[],
    };
  },
  actions: {
    addItemToMainMenu(menuItem: MenuItem) {
      const menuItemIndex = this.menuItems.findIndex(
        (x) => x.routeName === menuItem.routeName
      );
      if (menuItemIndex >= 0) {
        this.menuItems[menuItemIndex] = menuItem;
      } else {
        this.menuItems.push(menuItem);
      }
    },
    removeItemFromMainMenu(routeName: string) {
      this.menuItems = this.menuItems.filter(
        (mi) => mi.routeName !== routeName
      );
    },
  },
});
