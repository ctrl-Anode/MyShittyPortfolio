<script setup>
import { computed } from 'vue';
import { StarIcon } from '@heroicons/vue/24/solid';
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline';
import { useProfile } from '@/composables/useProfile';
import { usePortfolioList } from '@/composables/usePortfolioList';
import { arrayFromJson } from '@/utils/format';
import SectionHeading from '@/components/portfolio/ui/SectionHeading.vue';
import EmptyState from '@/components/portfolio/ui/EmptyState.vue';

const { profile } = useProfile();
const { rows: repos, loading } = usePortfolioList('github');

const githubUrl = computed(() => profile.value?.socials?.github);

function formatCount(value) {
  const n = Number(value) || 0;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(n);
}
</script>

<template>
  <section id="github" class="scroll-mt-24 bg-neutral-50/60 dark:bg-neutral-900/30">
    <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="GitHub" title="Activity in the open" subtitle="Code I keep in the open — libraries, side projects and experiments." />
        <a
          v-if="githubUrl"
          :href="githubUrl"
          target="_blank"
          rel="noopener"
          class="link-underline mb-1 font-mono text-sm text-accent-600 hover:text-accent-500 dark:text-accent-300"
          :aria-label="`View @${githubUrl.split('/').filter(Boolean).pop()} on GitHub`"
        >
          @{{ githubUrl.split('/').filter(Boolean).pop() }} on GitHub →
        </a>
      </div>

      <div v-if="loading" class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 3" :key="i" class="skeleton h-44 rounded-xl" />
      </div>

      <div v-else-if="repos.length" class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="(repo, index) in repos"
          :key="repo.id"
          v-reveal
          :href="repo.url"
          target="_blank"
          rel="noopener"
          class="group flex flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-500/40 hover:shadow-lift dark:border-neutral-800 dark:bg-neutral-900"
          :class="{ 'delay-100': index % 3 === 1, 'delay-200': index % 3 === 2 }"
        >
          <div class="flex items-center justify-between gap-3">
            <h3 class="truncate font-mono text-sm font-bold text-neutral-900 transition-colors group-hover:text-accent-600 dark:text-neutral-100 dark:group-hover:text-accent-300">
              {{ repo.name }}
            </h3>
            <span v-if="repo.stars" class="flex shrink-0 items-center gap-1 font-mono text-xs text-neutral-500 dark:text-neutral-400">
              <StarIcon class="h-3.5 w-3.5 text-mustard-400" />
              {{ formatCount(repo.stars) }}
            </span>
          </div>

          <p class="mt-3 flex-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">{{ repo.description || 'No description provided.' }}</p>

          <div class="mt-5 flex flex-wrap items-center gap-3 border-t border-neutral-200/70 pt-4 dark:border-neutral-800">
            <span v-if="repo.language" class="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-500 dark:text-neutral-400">
              <span class="h-2 w-2 rounded-full bg-accent-500" aria-hidden="true" />
              {{ repo.language }}
            </span>
            <span
              v-for="topic in arrayFromJson(repo.topics).slice(0, 2)"
              :key="topic"
              class="font-mono text-[11px] text-neutral-400 dark:text-neutral-500"
            >
              #{{ topic }}
            </span>
            <span class="ml-auto text-neutral-400 transition-colors group-hover:text-accent-500 dark:text-neutral-500 dark:group-hover:text-accent-300">
              <ArrowTopRightOnSquareIcon class="h-4 w-4" />
            </span>
          </div>
        </a>
      </div>

      <EmptyState v-else class="mt-12" title="No repositories yet" hint="Connect GITHUB_USERNAME in the server env and sync from the admin panel." />
    </div>
  </section>
</template>