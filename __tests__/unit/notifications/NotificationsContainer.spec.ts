import {
  NotificationType,
  useNotifications,
  type Notification,
} from '@/modules/notifications';
import NotificationsContainer from '@/modules/notifications/presentation/components/NotificationsContainer.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';

const { addNotification, removeNotification, removeAllNotifications } =
  useNotifications();

describe('NotificationsContainer', () => {
  const wrapper = mount(NotificationsContainer, {
    global: {
      stubs: {
        NotificationModal: false,
        transition: false,
      },
    },
  });

  const notification1: Notification = {
    id: 'test1',
    title: 'Notification 1 title',
    message: 'Notification 1 message',
    type: NotificationType.INFO,
    icon: true,
    closable: true,
  };

  const notification2: Notification = {
    id: 'test2',
    title: 'Notification 2 title',
    message: 'Notification 2 message',
    type: NotificationType.WARNING,
    icon: false,
    closable: true,
  };

  const notification3: Notification = {
    id: 'test3',
    title: 'Notification 3 title',
    message: 'Notification 3 message',
    type: NotificationType.ERROR,
    icon: false,
    closable: false,
    closeAfterMs: 100,
  };

  it('Renders properly', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(
      wrapper.find('[data-test="notifications-container"]').exists()
    ).toBeTruthy();
  });

  it('Shows notifications', async () => {
    expect(wrapper.findAll('[data-test="notification"]').length).toBe(0);
    addNotification(notification1);
    await nextTick();
    expect(wrapper.findAll('[data-test="notification"]').length).toBe(1);
    // Adding a notification with the same id has no effect
    addNotification(notification1);
    await nextTick();
    expect(wrapper.findAll('[data-test="notification"]').length).toBe(1);
    addNotification(notification2);
    await nextTick();
    expect(wrapper.findAll('[data-test="notification"]').length).toBe(2);
    addNotification(notification3);
    await nextTick();
    expect(wrapper.findAll('[data-test="notification"]').length).toBe(3);
  });

  it('Removes notifications', async () => {
    // Removing notifications
    removeNotification(notification1.id);
    await nextTick();
    expect(wrapper.findAll('[data-test="notification"]').length).toBe(2);
    removeNotification(notification2.id);
    await nextTick();
    expect(wrapper.findAll('[data-test="notification"]').length).toBe(1);
    removeAllNotifications();
    await nextTick();
    expect(wrapper.findAll('[data-test="notification"]').length).toBe(0);
  });

  it('Removes autoclose notifications', async () => {
    // Removing notifications
    addNotification(notification3);
    await nextTick();
    expect(wrapper.findAll('[data-test="notification"]').length).toBe(1);
    // Wait for 550ms and check again (animation is 400ms, autoclose is 100ms)
    await new Promise((r) => setTimeout(r, 550));
    expect(wrapper.findAll('[data-test="notification"]').length).toBe(0);
  });
});
