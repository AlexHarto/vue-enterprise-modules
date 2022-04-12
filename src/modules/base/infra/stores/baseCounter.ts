import { defineStore } from 'pinia';

export const useBaseCounterStore = defineStore({
  id: 'baseCounter',
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
