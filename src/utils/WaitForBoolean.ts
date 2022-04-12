import type { Ref } from 'vue';

const waitForBooleanRef = async (
  conditionRef: Ref<boolean>,
  maxLoops = 1000
) => {
  let loops = 0;
  while (!conditionRef.value && loops < maxLoops) {
    await new Promise((resolve) => {
      loops++;
      requestAnimationFrame(resolve);
    });
  }
};

export { waitForBooleanRef };
