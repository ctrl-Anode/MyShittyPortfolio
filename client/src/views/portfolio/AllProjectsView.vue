<script setup>
import { computed } from 'vue';
import { useProfile } from '@/composables/useProfile';
import { usePortfolioList } from '@/composables/usePortfolioList';
import SiteHeader from '@/components/portfolio/SiteHeader.vue';
import SiteFooter from '@/components/portfolio/SiteFooter.vue';
import ProjectCard from '@/components/portfolio/ui/ProjectCard.vue';
import EmptyState from '@/components/portfolio/ui/EmptyState.vue';

const { profile } = useProfile();
const { rows: projects, loading } = usePortfolioList('projects');

const name = computed(() => profile.value?.name || '');
const initials = computed(() =>
  name.value
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
);
</script>

<template>
  <div class="min-h-full">
    <SiteHeader :name="name" :initials="initials" />

    <main class="mx-auto max-w-7xl px-4 pb-28 pt-32 sm:px-6 lg:px-8">
      <router-link to="/" class="link-underline font-mono text-xs uppercase tracking-widest text-neutral-500 hover:text-accent-600 dark:text-neutral-400 dark:hover:text-accent-300">
        ← Back to home
      </router-link>

      <div class="mt-6">
        <p v-reveal class="mono-label inline-flex items-center gap-2.5 text-accent-600 dark:text-accent-300">
          <span class="inline-block h-px w-6 bg-accent-500/70" aria-hidden="true" />
          Index
        </p>
        <h1 class="mt-4 font-display text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl">All projects</h1>
        <p class="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
          Everything I've shipped — systems, tools and experiments, in one place.
        </p>
      </div>

      <div v-if="loading" class="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 6" :key="i" class="skeleton h-80 rounded-xl" />
      </div>

      <div v-else-if="projects.length" class="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard v-for="(project, index) in projects" :key="project.id" :project="project" :index="index" />
      </div>

      <EmptyState v-else class="mt-14" title="No projects yet" hint="Projects added in the admin panel appear here once published." />
    </main>

    <SiteFooter :name="name" :initials="initials" :socials="profile?.socials || {}" />
  </div>
</template>