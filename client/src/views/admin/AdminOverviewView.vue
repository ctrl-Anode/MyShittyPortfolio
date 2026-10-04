<script setup>
import { onMounted, ref } from 'vue';
import { UserCircleIcon, BriefcaseIcon, CodeBracketIcon, BoltIcon, AcademicCapIcon, FolderIcon, StarIcon, ChatBubbleLeftRightIcon, ArrowRightIcon, SparklesIcon } from '@heroicons/vue/24/outline';
import { RESOURCES } from '@/config/portfolioResources';
import { portfolioApi } from '@/api/portfolio';
import PageHeader from '@/components/ui/PageHeader.vue';

const icons = {
  profile: UserCircleIcon,
  hero: SparklesIcon,
  experience: BriefcaseIcon,
  project: CodeBracketIcon,
  skill: BoltIcon,
  certificate: AcademicCapIcon,
  github: FolderIcon,
  testimonial: StarIcon,
  contact: ChatBubbleLeftRightIcon
};

const counts = ref({});

onMounted(async () => {
  await Promise.all(
    RESOURCES.map(async (resource) => {
      try {
        const result = await portfolioApi.admin.list(resource.resource, { limit: 1 });
        counts.value[resource.resource] = result.meta.total;
      } catch {
        counts.value[resource.resource] = null;
      }
    })
  );
});
</script>

<template>
  <div>
    <PageHeader title="Portfolio Admin" subtitle="Manage every section of your public portfolio site">
      <template #actions>
        <a href="/" target="_blank" class="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-500 dark:text-brand-400">
          View public site
          <ArrowRightIcon class="h-4 w-4" />
        </a>
      </template>
    </PageHeader>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <router-link
        v-for="resource in RESOURCES"
        :key="resource.resource"
        :to="`/admin/${resource.resource}`"
        class="group rounded-xl bg-white p-5 shadow-card ring-1 ring-gray-200/70 transition-shadow hover:shadow-md dark:bg-gray-900 dark:ring-gray-800"
      >
        <div class="flex items-start justify-between">
          <component :is="icons[resource.resource]" class="h-8 w-8 text-brand-600 dark:text-brand-400" />
          <span class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ counts[resource.resource] ?? '…' }}
          </span>
        </div>
        <h3 class="mt-4 font-semibold text-gray-900 dark:text-white">{{ resource.labelPlural }}</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ resource.description }}</p>
      </router-link>
    </div>
  </div>
</template>