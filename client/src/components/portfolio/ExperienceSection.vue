<script setup>
import { formatMonthYear } from '@/utils/format';
import { usePortfolioList } from '@/composables/usePortfolioList';
import SectionHeading from '@/components/portfolio/ui/SectionHeading.vue';
import EmptyState from '@/components/portfolio/ui/EmptyState.vue';

const { rows: experiences, loading } = usePortfolioList('experiences');

function period(item) {
  const start = formatMonthYear(item.startDate);
  const end = item.current ? 'Present' : formatMonthYear(item.endDate);
  if (!start && !end) return '';
  return `${start || '—'} – ${end || '—'}`;
}
</script>

<template>
  <section id="experience" class="scroll-mt-24 bg-neutral-50/60 dark:bg-neutral-900/30">
    <div class="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <SectionHeading eyebrow="Experience" title="Where I've worked" />

      <div v-if="loading" class="mt-12 space-y-8">
        <div v-for="i in 3" :key="i" class="flex gap-6">
          <p class="skeleton h-12 w-12 shrink-0 rounded-full" />
          <div class="flex-1 space-y-3">
            <p class="skeleton h-5 w-1/2" />
            <p class="skeleton h-4 w-1/3" />
          </div>
        </div>
      </div>

      <ol v-else-if="experiences.length" class="relative mt-12 space-y-10 border-l border-neutral-200 pl-8 dark:border-neutral-800">
        <li
          v-for="(item, index) in experiences"
          :key="item.id"
          v-reveal
          class="relative"
          :class="{ 'delay-100': index % 2 === 1 }"
        >
          <span class="absolute -left-[2.375rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent-600 bg-[color:var(--paper)] dark:border-accent-300" aria-hidden="true" />
          <p class="mono-label text-accent-600 dark:text-accent-300">{{ period(item) }}</p>
          <h3 class="mt-2 font-display text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            {{ item.role }} <span class="text-accent-600 dark:text-accent-300">@ {{ item.company }}</span>
          </h3>
          <p v-if="item.location" class="mt-1 font-mono text-xs text-neutral-400 dark:text-neutral-500">{{ item.location }}</p>
          <p class="mt-3 max-w-2xl whitespace-pre-line leading-relaxed text-neutral-600 dark:text-neutral-300">{{ item.description }}</p>
        </li>
      </ol>

      <EmptyState v-else class="mt-12" title="No experience yet" hint="This section will light up once the profile is filled in." />
    </div>
  </section>
</template>