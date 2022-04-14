import { NotificationType, type Notification } from '@/modules/notifications';
import NotificationModal from '@/modules/notifications/presentation/components/NotificationModal.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('NotificationModal', () => {
  const notification: Notification = {
    id: 'test',
    title: 'Notification title',
    message: 'Notification message',
    type: NotificationType.INFO,
    icon: true,
    closable: true,
  };
  const wrapper = mount(NotificationModal, {
    props: {
      notification,
    },
    slots: {
      content_test: 'Notification slot',
    },
  });

  it('Renders properly and contains all parts', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('[data-test="notification-title"]').text()).toContain(
      notification.title
    );
    expect(
      wrapper.find('[data-test="notification-close"]').exists()
    ).toBeTruthy();
    expect(
      wrapper.find('[data-test="notification-close-icon"]').exists()
    ).toBeTruthy();
    expect(
      wrapper.find('[data-test="notification-icon"]').exists()
    ).toBeTruthy();
    expect(wrapper.find('[data-test="notification-message"]').text()).toContain(
      notification.message
    );
    expect(wrapper.find('[data-test="notification-message"]').text()).toContain(
      'Notification slot'
    );
  });
});
