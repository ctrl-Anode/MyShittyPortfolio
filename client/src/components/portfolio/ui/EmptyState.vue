<script setup>
defineProps({
  title: { type: String, required: true },
  hint: { type: String, default: '' }
});
</script>

<template>
  <div
    v-reveal
    class="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/60 px-8 py-14 text-center dark:border-neutral-700 dark:bg-neutral-900/40"
  >
    <span class="mono-label grid h-12 w-12 place-items-center rounded-full border border-accent-500/30 bg-accent-500/10 text-accent-600 dark:text-accent-300" aria-hidden="true">
      ?
    </span>
    <p class="font-medium text-neutral-700 dark:text-neutral-300">{{ title }}</p>
    <p v-if="hint" class="max-w-sm text-sm text-neutral-500 dark:text-neutral-400">{{ hint }}</p>
  </div>
</template>