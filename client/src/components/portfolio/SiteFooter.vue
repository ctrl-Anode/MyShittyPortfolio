<script setup>
import { ArrowUpIcon } from '@heroicons/vue/24/outline';
// import SocialLinks from '@/components/portfolio/ui/SocialLinks.vue';

defineProps({
  name: { type: String, default: '' },
  initials: { type: String, default: '' },
  socials: { type: Object, default: () => ({}) }
});

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <footer class="border-t border-neutral-200 px-4 py-6 dark:border-neutral-800 sm:px-6 lg:px-8">
    <div class="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
      <!-- <div class="flex flex-col items-center gap-2.5">
        <span class="grid h-10 w-10 place-items-center rounded-lg bg-accent-600 font-mono text-sm font-bold text-white dark:bg-accent-400 dark:text-neutral-950">
          {{ initials || 'A' }}
        </span>
        <p class="brand-name text-sm text-neutral-900 dark:text-neutral-100">{{ name || 'Portfolio' }}</p>
      </div> -->

      <!-- <SocialLinks :socials="socials" /> -->

      <div class="flex flex-col items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
        <p>© {{ new Date().getFullYear() }} {{ name || 'Portfolio' }}. All rights reserved.</p>
        <button type="button" class="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-neutral-500 transition-colors hover:text-accent-600 dark:text-neutral-400 dark:hover:text-accent-300" @click="scrollTop">
          Back to top
          <ArrowUpIcon class="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  </footer>
</template>
