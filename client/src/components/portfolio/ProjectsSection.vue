<script setup>
import { usePortfolioList } from '@/composables/usePortfolioList';
import SectionHeading from '@/components/portfolio/ui/SectionHeading.vue';
import EmptyState from '@/components/portfolio/ui/EmptyState.vue';
import ProjectCard from '@/components/portfolio/ui/ProjectCard.vue';

const { rows: projects, loading } = usePortfolioList('projects');
</script>

<template>
  <section id="projects" class="scroll-mt-24">
    <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Projects" title="Systems I've built" subtitle="From practical systems to playful apps — each project turns an idea into something useful." />
        <router-link to="/projects" class="link-underline mb-1 font-mono text-sm text-accent-600 hover:text-accent-500 dark:text-accent-300">
          View all projects →
        </router-link>
      </div>

      <div v-if="loading" class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 3" :key="i" class="skeleton h-80 rounded-xl" />
      </div>

      <div v-else-if="projects.length" class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard v-for="(project, index) in projects" :key="project.id" :project="project" :index="index" />
      </div>

      <EmptyState v-else class="mt-12" title="No projects yet" hint="Projects added in the admin panel appear here once published." />
    </div>
  </section>
</template>