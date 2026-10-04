<script setup>
import { usePortfolioList } from '@/composables/usePortfolioList';
import SectionHeading from '@/components/portfolio/ui/SectionHeading.vue';
import EmptyState from '@/components/portfolio/ui/EmptyState.vue';

const { rows: testimonials, loading } = usePortfolioList('testimonials');
</script>

<template>
  <section id="testimonials" class="scroll-mt-24">
    <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <SectionHeading eyebrow="Testimonials" title="What people say" subtitle="Kind words from colleagues, clients and collaborators." />

      <div v-if="loading" class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 3" :key="i" class="skeleton h-52 rounded-xl" />
      </div>

      <div v-else-if="testimonials.length" class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <figure
          v-for="(item, index) in testimonials"
          :key="item.id"
          v-reveal
          class="relative flex flex-col rounded-xl border border-neutral-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lift dark:border-neutral-800 dark:bg-neutral-900"
          :class="{ 'delay-100': index % 3 === 1, 'delay-200': index % 3 === 2 }"
        >
          <span class="font-display text-5xl font-bold italic leading-none text-accent-500/25 dark:text-accent-300/25" aria-hidden="true">"</span>
          <blockquote class="mt-2 flex-1 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
            {{ item.quote }}
          </blockquote>
          <figcaption class="mt-6 flex items-center gap-3 border-t border-neutral-200/70 pt-5 dark:border-neutral-800">
            <span class="relative inline-flex shrink-0">
              <img v-if="item.avatarUrl" :src="item.avatarUrl" :alt="item.author" class="h-11 w-11 rounded-full object-cover ring-2 ring-accent-500/40">
              <span v-else class="grid h-11 w-11 place-items-center rounded-full border border-neutral-200 bg-neutral-50 font-mono text-sm font-bold text-accent-600 ring-2 ring-accent-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-accent-300">
                {{ item.author?.slice(0, 1).toUpperCase() || 'A' }}
              </span>
              <span class="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-accent-500 dark:border-neutral-900" aria-hidden="true" />
            </span>
            <div>
              <p class="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{{ item.author }}</p>
              <p v-if="item.role" class="font-mono text-xs text-neutral-400 dark:text-neutral-500">{{ item.role }}</p>
            </div>
          </figcaption>
        </figure>
      </div>

      <EmptyState v-else class="mt-12" title="No testimonials yet" hint="Recommendations will appear here once added." />
    </div>
  </section>
</template>