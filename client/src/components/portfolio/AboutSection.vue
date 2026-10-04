<script setup>
import { computed } from 'vue';
import { useProfile } from '@/composables/useProfile';
import SectionHeading from '@/components/portfolio/ui/SectionHeading.vue';

const { profile, loading } = useProfile();

const paragraphs = computed(() =>
  (profile.value?.bio || '')
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean)
);

// const email = computed(() => profile.value?.socials?.email || '');
const status = computed(() => profile.value?.status || 'Open to opportunities');
const myLocation = computed(() => profile.value?.myLocation || '');
const myDegree = computed(() => profile.value?.myDegree || '');
const myDegreeDetails = computed(() => profile.value?.myDegreeDetails || '');
</script>

<template>
  <section id="about" class="scroll-mt-24">
    <div class="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div class="grid gap-14 lg:grid-cols-[1fr_340px]">
        <div>
          <SectionHeading eyebrow="About" title="About me" />

          <div v-if="loading" class="mt-10 space-y-4">
            <p class="skeleton h-5 w-full" />
            <p class="skeleton h-5 w-11/12" />
            <p class="skeleton h-5 w-4/5" />
          </div>

          <div v-else class="mt-10 max-w-2xl">
            <p
              v-for="(paragraph, index) in paragraphs"
              :key="index"
              v-reveal
              class="text-base leading-relaxed text-neutral-600 first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-5xl first-letter:font-bold first-letter:leading-[0.85] first-letter:text-accent-600 dark:text-neutral-300 dark:first-letter:text-accent-400"
              :class="index > 0 ? 'mt-6' : ''"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>

        <div v-reveal="'right'" class="flex flex-col">
          <div class="flex flex-wrap gap-x-10 gap-y-5">
            <div v-if="status" class="min-w-32 flex-1">
              <p class="mono-label flex items-center gap-2 text-neutral-400 dark:text-neutral-500">
                <span class="relative flex h-2 w-2">
                  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Currently
              </p>
              <p class="mt-3 font-display text-base font-semibold text-emerald-600 dark:text-emerald-400">{{ status }}</p>
            </div>

            <div v-if="myLocation" class="min-w-32 flex-1">
              <p class="mono-label text-neutral-400 dark:text-neutral-500">Location</p>
              <p class="mt-3 text-sm text-neutral-700 dark:text-neutral-200">{{ myLocation }}</p>
            </div>
          </div>

          <hr v-if="(status || myLocation) && (myDegree || myDegreeDetails || profile?.resumeUrl)" class="my-5 border-neutral-200 dark:border-neutral-800">

          <div v-if="myDegree || myDegreeDetails">
            <p class="mono-label text-neutral-400 dark:text-neutral-500">Degree</p>
            <p v-if="myDegree" class="mt-3 text-sm font-medium text-neutral-700 dark:text-neutral-200">{{ myDegree }}</p>
            <p v-if="myDegreeDetails" class="mt-2 whitespace-pre-line text-sm text-neutral-600 dark:text-neutral-300">{{ myDegreeDetails }}</p>
          </div>

          <hr v-if="(myDegree || myDegreeDetails) && profile?.resumeUrl" class="my-5 border-neutral-200 dark:border-neutral-800">

          <a v-if="profile?.resumeUrl" :href="profile.resumeUrl" target="_blank" rel="noopener" class="group flex items-center justify-between">
            <span class="font-mono text-sm text-neutral-700 dark:text-neutral-200">Resume</span>
            <span class="font-mono text-xs uppercase tracking-widest text-accent-600 transition-transform group-hover:translate-x-0.5 dark:text-accent-300">↗</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
