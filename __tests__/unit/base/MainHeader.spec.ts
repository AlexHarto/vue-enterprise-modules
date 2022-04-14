import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MainHeader from '@/modules/base/presentation/components/MainHeader.vue';

import { i18n, t } from '../../utils/i18n';
import router from '@/router';
import base from '@/modules/base';

base.registerModule(router);

describe('MainHeader', () => {
  const wrapper = mount(MainHeader, {
    global: {
      plugins: [i18n, router],
      stubs: {
        RouterLink: false,
        transition: false,
      },
    },
  });

  it('Renders properly', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('[data-test="logo"]').text()).toContain(
      t('header.app')
    );
  });

  it('Shows the menu items', () => {
    const menuItems = wrapper.vm.menuItems;
    const allMenuItems = wrapper.findAll('[data-test="menu-item"]');
    expect(allMenuItems.length).toBe(menuItems.length);
    for (let i = 0; i < menuItems.length; i++) {
      expect(allMenuItems.at(i)?.text()).toContain(menuItems[i].title);
    }
  });
});
