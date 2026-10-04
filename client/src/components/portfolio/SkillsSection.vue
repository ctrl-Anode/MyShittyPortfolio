<script setup>
import { computed } from 'vue';
import { usePortfolioList } from '@/composables/usePortfolioList';
import SectionHeading from '@/components/portfolio/ui/SectionHeading.vue';
import EmptyState from '@/components/portfolio/ui/EmptyState.vue';

const { rows: skills, loading } = usePortfolioList('skills');

const grouped = computed(() => {
  const map = new Map();
  for (const skill of skills.value) {
    const category = skill.category || 'Other';
    if (!map.has(category)) map.set(category, []);
    map.get(category).push(skill);
  }
  return Array.from(map.entries());
});
</script>

<template>
  <section id="skills" class="scroll-mt-24 bg-neutral-50/60 dark:bg-neutral-900/30">
    <div class="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <SectionHeading eyebrow="Skills" title="My toolkit" subtitle="The languages, frameworks and tools I reach for every day." />

      <div v-if="loading" class="mt-12 grid gap-8 sm:grid-cols-2">
        <div v-for="i in 2" :key="i" class="space-y-4">
          <p class="skeleton h-5 w-40" />
          <p class="skeleton h-8 w-full" />
          <p class="skeleton h-8 w-full" />
          <p class="skeleton h-8 w-3/4" />
        </div>
      </div>

      <div v-else-if="grouped.length" class="mt-12 grid gap-x-12 gap-y-12 sm:grid-cols-2">
        <div
          v-for="([category, items], index) in grouped"
          :key="category"
          v-reveal
          :class="{ 'delay-100': index % 2 === 1 }"
        >
          <h3 class="mono-label mb-5 text-accent-600 dark:text-accent-300">{{ category }}</h3>

          <ul class="space-y-4">
            <li v-for="skill in items" :key="skill.id">
              <div class="flex items-baseline justify-between gap-3">
                <span class="text-sm font-medium text-neutral-700 dark:text-neutral-200">{{ skill.name }}</span>
                <span v-if="skill.level != null" class="font-mono text-xs text-neutral-400 dark:text-neutral-500">{{ Math.min(Math.max(skill.level, 0), 100) }}%</span>
              </div>
              <div v-if="skill.level != null" class="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                <div
                  class="skill-fill h-full rounded-full bg-gradient-to-r from-accent-400 to-accent-600"
                  :style="{ '--level': `${Math.min(Math.max(skill.level, 0), 100)}%` }"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <EmptyState v-else class="mt-12" title="No skills yet" hint="Add your toolkit in the admin panel and grouped lists will appear here." />
    </div>
  </section>
</template>