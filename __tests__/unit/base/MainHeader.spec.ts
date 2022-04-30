import MainHeader from '@/modules/base/presentation/components/MainHeader.vue';
import { routes } from '@/modules/base/router';
import { createTestingPinia } from '@pinia/testing';
import { mount, RouterLinkStub } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { i18n, t } from '../../utils/i18n';

describe('MainHeader', () => {
  const mockRouter = createRouter({
    history: createWebHistory(),
    routes: routes,
  });
  const wrapper = mount(MainHeader, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
        i18n,
        mockRouter,
      ],
      stubs: {
        RouterLink: RouterLinkStub,
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
      expect(allMenuItems.at(i)?.text()).toContain(t(menuItems[i].label));
    }
  });
});
