<template>
  <a
    :href="href"
    :target="newWindow ? '_blank' : '_self'"
    rel="noreferrer"
    class="interactive"
  >
    {{ label || href }}
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
  href: string;
  newWindow?: boolean;
}>();
</script>

<style scoped>
a {
  @apply border-b-2 border-primary-border;
}

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  a {
    @apply hover:border-primary-bg-hover;
  }
}
</style>
