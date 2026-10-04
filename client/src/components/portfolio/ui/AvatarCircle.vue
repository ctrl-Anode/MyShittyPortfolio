<script setup>
defineProps({
  src: { type: String, default: '' },
  name: { type: String, default: '' }
});
</script>

<template>
  <span class="h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-neutral-200 shadow-sm lg:h-24 lg:w-24 dark:ring-neutral-700">
    <img v-if="src" :src="src" :alt="name" class="h-full w-full object-cover">
    <span v-else class="grid h-full w-full place-items-center bg-accent-600 font-mono text-xl font-bold text-white lg:text-3xl dark:bg-accent-400 dark:text-neutral-950">
      {{ (name || 'A').slice(0, 1) }}
    </span>
  </span>
</template>
