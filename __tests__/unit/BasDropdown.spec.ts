import BasDropdown from '@/components/BasDropdown.vue';
import type { DropdownOption } from '@/infra/types/DropdownOption';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

let message = '';
const optionClicked = (i: number) => {
  message = `Option ${i} clicked`;
};

describe('BasDropdown', () => {
  const wrapper = mount(BasDropdown, {
    global: {
      stubs: {
        transition: false,
      },
    },
    props: {
      id: 'id',
      label: 'my label',
    },
    slots: {
      default: '<h1>my slot</h1>',
    },
  });

  const button = wrapper.find('button');
  const icon = button.find('[data-test="svg"]');
  const options = wrapper.find('[data-test="options"]');

  it('Renders properly', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(button.exists()).toBeTruthy();
    expect(icon.exists()).toBeTruthy();
    expect(options.exists()).toBeFalsy();
  });

  it('Assigns id and shows label', async () => {
    expect(button.attributes('id')).toBe('dropdown_id');
    expect(button.find('span').text()).toContain('my label');
    await wrapper.setProps({ ...wrapper.props, label: 'my other label' });
    expect(button.find('span').text()).toContain('my other label');
  });

  it('Shows default slot', () => {
    expect(button.html()).toContain('<h1>my slot</h1>');
  });

  it('Shows options when clicked', async () => {
    const propOptions: DropdownOption[] = [
      {
        label: 'Option 0',
        onClick: () => optionClicked(0),
      },
      {
        label: 'Option 1',
        onClick: () => optionClicked(1),
      },
      {
        label: 'Option 2',
        onClick: () => optionClicked(2),
      },
      {
        label: 'Option 3',
        onClick: () => optionClicked(3),
      },
    ];
    await wrapper.setProps({ ...wrapper.props, options: propOptions });
    await button.trigger('click');
    expect(wrapper.find('[data-test="options"]').exists()).toBeTruthy();
    const allOptions = wrapper.find('[data-test="options"]').findAll('li a');
    expect(allOptions.length).toBe(propOptions.length);
    let i = 0;
    for (const opt of allOptions) {
      expect(opt.text()).toBe(`Option ${i}`);
      await opt.trigger('click');
      expect(message).toBe(`Option ${i++} clicked`);
      expect(wrapper.vm.optionsVisible).toBeFalsy();
      await button.trigger('click');
    }
    await button.trigger('click');
    expect(wrapper.vm.optionsVisible).toBeFalsy();
  });

  // TODO: Test click outside
  // it('Hides options when click outside', async () => {
  //   const propOptions: DropdownOption[] = [
  //     {
  //       label: 'Option 1',
  //     },
  //   ];
  //   await wrapper.setProps({ ...wrapper.props, options: propOptions });
  //   await button.trigger('click');
  //   const options = wrapper.find('[data-test="options"]');
  //   expect(options.exists()).toBeTruthy();
  // });
});
