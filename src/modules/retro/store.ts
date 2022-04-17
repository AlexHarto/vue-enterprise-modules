import { defineStore } from 'pinia';
import { RetroType, type RetroSectionData } from './infra/types/Section';

export const useRetroStore = defineStore('retroStore', {
  state: () => {
    return {
      sections: [
        {
          type: RetroType.CONTINUE,
          title: 'retro.titles.continue',
          messages: [],
        },
        {
          type: RetroType.STOP,
          title: 'retro.titles.stop',
          messages: [],
        },
        {
          type: RetroType.TRY,
          title: 'retro.titles.try',
          messages: [],
        },
        {
          type: RetroType.KUDOS,
          title: 'retro.titles.kudos',
          messages: [],
        },
      ] as RetroSectionData[],
      mockDataAdded: false,
    };
  },
  actions: {
    addMockData() {
      if (!this.mockDataAdded) {
        this.addMessage(RetroType.CONTINUE, 'We are a great team', '0');
        this.addMessage(RetroType.CONTINUE, 'Always available', '0');
        this.addMessage(RetroType.STOP, 'Too many meetings...', '0');
        this.addMessage(RetroType.STOP, 'No time for coding :-[', '0');
        this.addMessage(RetroType.TRY, 'Morning excersises O_o', '0');
        this.addMessage(RetroType.TRY, "A component's library", '0');
        this.addMessage(RetroType.KUDOS, 'Thank you all!!!', '0');
        this.mockDataAdded = true;
      }
    },
    // TODO: Add current userId as the default value for authorId
    addMessage(type: RetroType, label: string, authorId = '0') {
      const section = this.sections.find((s) => s.type === type);
      if (section) {
        const id = `${type}_${section.messages.length}`;
        section.messages.push({ id, authorId, label, userLikedIt: false });
      }
    },
    editMessage(type: RetroType, id: string, label: string) {
      const section = this.sections.find((s) => s.type === type);
      if (section) {
        const message = section.messages.find((m) => m.id === id);
        if (message) {
          message.label = label;
        }
      }
    },
    changeMessageLikes(type: RetroType, id: string, amount = 1) {
      const section = this.sections.find((s) => s.type === type);
      if (section) {
        const message = section.messages.find((m) => m.id === id);
        if (message) {
          const likes = message.likes || 0;
          message.likes = likes + amount;
          message.userLikedIt = amount > 0;
        }
      }
    },
  },
});
