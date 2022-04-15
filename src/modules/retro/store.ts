import { defineStore } from 'pinia';
import { RetroType, type RetroSectionData } from './infra/types/Section';

export const useRetroStore = defineStore('retroStore', {
  state: () => {
    return {
      sections: [
        {
          type: RetroType.CONTINUE,
          title: 'retro.titles.continue',
          messages: [
            {
              label: 'We are a great team',
            },
            {
              label: 'Always available',
            },
          ],
        },
        {
          type: RetroType.STOP,
          title: 'retro.titles.stop',
          messages: [
            {
              label: 'Too many meetings...',
            },
            {
              label: 'No time for coding :-[',
            },
          ],
        },
        {
          type: RetroType.TRY,
          title: 'retro.titles.try',
          messages: [
            {
              label: 'Morning excersises O_o',
            },
            {
              label: "A component's library",
            },
          ],
        },
        {
          type: RetroType.KUDOS,
          title: 'retro.titles.kudos',
          messages: [
            {
              label: 'Thank you all!!!',
            },
          ],
        },
      ] as RetroSectionData[],
    };
  },
});
