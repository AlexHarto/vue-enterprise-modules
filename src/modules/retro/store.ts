import { db } from '@/infra/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { defineStore } from 'pinia';
import {
  RetroType,
  type RetroSectionData,
  type RetroSectionMessage,
} from './infra/types/Section';

export const useRetroStore = defineStore('retroStore', {
  state: () => {
    return {
      userIndex: -1,
      sections: [
        {
          type: RetroType.CONTINUE,
          name: 'continue',
          title: 'retro.titles.continue',
        },
        {
          type: RetroType.STOP,
          name: 'stop',
          title: 'retro.titles.stop',
        },
        {
          type: RetroType.TRY,
          name: 'try',
          title: 'retro.titles.try',
        },
        {
          type: RetroType.KUDOS,
          name: 'kudos',
          title: 'retro.titles.kudos',
        },
      ] as RetroSectionData[],
      messages: [] as RetroSectionMessage[],
      dataAdded: false,
    };
  },
  getters: {
    sortedMessages: (state) => (type: RetroType) => {
      const sectionMessages = state.messages.filter((m) => m.type === type);
      if (sectionMessages) {
        return [...sectionMessages].sort(
          (a, b) => (b.likes.length || 0) - (a.likes.length || 0)
        );
      }
      return [];
    },
  },
  actions: {
    loadRoomData(roomId: string) {
      if (!this.dataAdded) {
        try {
          const colRef = doc(db, 'rooms', roomId);
          getDoc(colRef)
            .then((doc) => {
              const data = doc.data();
              if (data && data.messages) {
                for (let i = 0; i < data.messages.length; i++) {
                  this.messages.push({ index: i, ...data.messages[i] });
                }
              }
            })
            .finally(() => {
              this.dataAdded = true;
            });
        } catch (error) {
          // TODO: Complete logic
          console.log('No room found with that id');
        }
      }
    },
    updateMessage(modifiedMessage: RetroSectionMessage) {
      const message = this.messages.find(
        (m) => m.index === modifiedMessage.index
      );
      Object.assign(message, modifiedMessage);
      // TODO: Update message in the database
    },
    addNewMessage(message: RetroSectionMessage) {
      this.messages.push(message);
    },
    editMessage(modifiedMessage: RetroSectionMessage) {
      if (modifiedMessage.author === this.userIndex) {
        this.updateMessage(modifiedMessage);
      }
    },
    addLikeToMessage(message: RetroSectionMessage) {
      if (message.likes.indexOf(this.userIndex) < 0) {
        const modifiedMessage = { ...message };
        modifiedMessage.likes.push(this.userIndex);
        this.updateMessage(modifiedMessage);
      }
    },
    removeLikeFromMessage(message: RetroSectionMessage) {
      const i = message.likes.indexOf(this.userIndex);
      if (i > -1) {
        const modifiedMessage = { ...message };
        modifiedMessage.likes.splice(i, 1);
        this.updateMessage(modifiedMessage);
      }
    },
  },
});
