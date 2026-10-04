<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  align: { type: String, default: 'left' }
});
</script>

<template>
  <div
    v-reveal
    class="max-w-2xl"
    :class="align === 'center' ? 'mx-auto text-center' : ''"
  >
    <p
      v-if="eyebrow"
      class="mono-label inline-flex items-center gap-2.5 text-accent-600 dark:text-accent-300"
      :class="align === 'center' ? 'justify-center' : ''"
    >
      <span class="inline-block h-px w-6 bg-accent-500/70" aria-hidden="true" />
      {{ eyebrow }}
    </p>
    <h2 class="mt-4 font-display text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-4 text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
      {{ subtitle }}
    </p>
  </div>
</template>