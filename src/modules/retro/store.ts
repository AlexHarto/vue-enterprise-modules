import { defineStore } from 'pinia';
import { RetroType, type RetroSectionData } from './infra/types/Section';

export const useRetroStore = defineStore('retroStore', {
  state: () => {
    return {
      sections: [
        {
          title: 'Things we should continue doing...',
          type: RetroType.CONTINUE,
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
          title: 'Things we should stop doing...',
          type: RetroType.STOP,
          messages: [
            {
              label: 'So many meetings...',
            },
            {
              label: 'No time for coding :-[',
            },
          ],
        },
        {
          title: 'May be we could try...',
          type: RetroType.TRY,
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
          title: 'Kudos...',
          type: RetroType.KUDOS,
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
