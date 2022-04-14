import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import LanguageSelector from '@/modules/base/presentation/components/LanguageSelector.vue';

import { i18n, t } from '../../utils/i18n';
import { nextTick } from 'vue';

describe('LanguageSelector', () => {
  const wrapper = mount(LanguageSelector, {
    global: {
      plugins: [i18n],
      stubs: {
        RouterLink: false,
        transition: false,
      },
    },
  });

  it('Renders properly', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('Shows the correct language', async () => {
    for (const locale of i18n.global.availableLocales) {
      i18n.global.locale = locale;
      await nextTick();
      expect(wrapper.text()).toContain(locale);
    }
  });

  it('Contains all available languages', async () => {
    for (const locale of i18n.global.availableLocales) {
      const label = t(`header.language_${locale}`);
      const found = wrapper.vm.languageOptions.find(
        (x: { label: string }) => x.label === label
      );
      expect(found.label).toContain(label);
    }
  });
});
