import BasIcon from '@/components/BasIcon.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('BasIcon', () => {
  // Icons to check:
  const icons = ['close', 'error', 'info', 'warning'];
  const path = import.meta.env.VITE_ICONS_PATH || './icons/';

  it('renders properly', async () => {
    const wrapper = mount(BasIcon, {
      props: {
        icon: 'close',
      },
    });
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('[data-test="svg"]').exists()).toBeTruthy();
  });

  for (const icon of icons) {
    it(`Contains svg with use for ${icon}.svg`, async () => {
      const wrapper = mount(BasIcon, {
        props: {
          icon,
        },
      });
      await new Promise((r) => setTimeout(r, 100));
      expect(wrapper.find('svg').exists()).toBeTruthy();
      expect(wrapper.find('use').exists()).toBeTruthy();
      expect(wrapper.find('use').html()).toMatch(
        `href="${path}${icon}.svg#${icon}"`
      );
    });
  }
});
