import { db } from '@/infra/firebase/config';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from '@firebase/firestore';
import { defineStore } from 'pinia';
import { watchEffect } from 'vue';
import {
  RetroType,
  type RetroSectionData,
  type RetroSectionMessage,
} from './infra/types/Section';

export const useRetroStore = defineStore('retroStore', {
  state: () => {
    return {
      roomId: '',
      userId: self.crypto.randomUUID(),
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
      if (roomId !== this.roomId) {
        this.roomId = roomId;
        this.dataAdded = false;
      }
      if (!this.dataAdded) {
        try {
          const colRef = collection(db, this.roomId);
          // Subscription for the snapshot
          const unsubscribe = onSnapshot(colRef, (snapshot) => {
            this.messages.length = 0;
            for (const doc of snapshot.docs) {
              const message = {
                id: doc.id,
                ...doc.data(),
              } as RetroSectionMessage;
              this.messages.push(message);
            }
            this.dataAdded = true;
          });
          // Unsubscribe when the invoker components unmounts
          watchEffect((onInvalidate) => {
            onInvalidate(() => unsubscribe());
          });
        } catch (error) {
          // TODO: Complete logic
          console.log(`Room with id='${roomId}' was not found.`);
        }
      }
    },
    async updateMessage(id: string, obj: Partial<unknown>) {
      const docRef = doc(db, this.roomId, id);
      await updateDoc(docRef, obj);
    },
    async addNewMessage(type: RetroType, label: string) {
      const message: RetroSectionMessage = {
        type,
        author: this.userId,
        label,
        likes: [],
      };
      const colRef = collection(db, this.roomId);
      const docRef = await addDoc(colRef, message);
      message.id = docRef.id;
    },
    editMessage(id: string, label: string) {
      this.updateMessage(id, { label });
    },
    addLikeToMessage(id: string) {
      const message = this.messages.find((m) => m.id === id);
      if (message && message.likes.indexOf(this.userId) < 0) {
        this.updateMessage(id, { likes: arrayUnion(this.userId) });
      }
    },
    removeLikeFromMessage(id: string) {
      const message = this.messages.find((m) => m.id === id);
      if (message && message.likes.indexOf(this.userId) > -1) {
        this.updateMessage(id, { likes: arrayRemove(this.userId) });
      }
    },
  },
});
