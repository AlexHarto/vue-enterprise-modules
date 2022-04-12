import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SvgIcon from '@/components/SvgIcon.vue';

describe('SvgIcon', () => {
  // Icons to check:
  const icons = ['close', 'error', 'info', 'warning'];

  it('renders properly', async () => {
    const wrapper = mount(SvgIcon, {
      props: {
        icon: 'close',
      },
    });
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('[data-test="svg"]').exists()).toBeTruthy();
  });

  for (const icon of icons) {
    it(`Contains svg with use for ${icon}.svg`, async () => {
      const wrapper = mount(SvgIcon, {
        props: {
          icon,
        },
      });
      await new Promise((r) => setTimeout(r, 100));
      expect(wrapper.find('svg').exists()).toBeTruthy();
      expect(wrapper.find('use').exists()).toBeTruthy();
      expect(wrapper.find('use').html()).toMatch(
        `xlink:href="/assets/icons/${icon}.svg#${icon}"`
      );
    });
  }
});
