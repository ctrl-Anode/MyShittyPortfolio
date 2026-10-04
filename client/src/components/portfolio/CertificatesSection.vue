<script setup>
import { usePortfolioList } from '@/composables/usePortfolioList';
import SectionHeading from '@/components/portfolio/ui/SectionHeading.vue';
import EmptyState from '@/components/portfolio/ui/EmptyState.vue';
import CertificateCard from '@/components/portfolio/ui/CertificateCard.vue';

const { rows: certificates, loading } = usePortfolioList('certificates');
</script>

<template>
  <section id="certificates" class="scroll-mt-24">
    <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Certifications" title="Credentials & badges" subtitle="Certifications, courses and credentials I've earned along the way." />
        <router-link to="/certificates" class="link-underline mb-1 font-mono text-sm text-accent-600 hover:text-accent-500 dark:text-accent-300">
          View all certificates →
        </router-link>
      </div>

      <div v-if="loading" class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 3" :key="i" class="skeleton h-44 rounded-xl" />
      </div>

      <div v-else-if="certificates.length" class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <CertificateCard v-for="cert in certificates" :key="cert.id" :certificate="cert" />
      </div>

      <EmptyState v-else class="mt-12" title="No certificates yet" hint="Share your credentials here by adding them in the admin panel." />
    </div>
  </section>
</template>