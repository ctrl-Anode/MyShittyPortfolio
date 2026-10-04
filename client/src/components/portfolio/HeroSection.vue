<script setup>
import { computed } from 'vue';
import { ArrowDownIcon } from '@heroicons/vue/24/outline';
import { FileDown } from 'lucide-vue-next';
import { useProfile } from '@/composables/useProfile';
import { useHero } from '@/composables/useHero';
import SocialLinks from '@/components/portfolio/ui/SocialLinks.vue';
import AvatarCircle from '@/components/portfolio/ui/AvatarCircle.vue';
import { isExternalTarget, scrollToSection } from '@/utils/sectionScroll';

const { profile, loading } = useProfile();
const { hero } = useHero();

const socials = computed(() => profile.value?.socials || {});
const resumeUrl = computed(() => profile.value?.resumeUrl || '');
const avatarUrl = computed(() => profile.value?.avatarUrl || '');
const displayName = computed(() => profile.value?.name || 'Your Name');
const primaryTarget = computed(() => hero.value?.primaryButtonUrl || 'projects');
const secondaryTarget = computed(() => hero.value?.secondaryButtonUrl || 'contact');

function targetHref(target) {
  return isExternalTarget(target) ? target : `#${String(target).replace(/^#/, '')}`;
}

function onTargetClick(event, target) {
  if (isExternalTarget(target)) return;
  event.preventDefault();
  scrollToSection(target);
}
</script>

<template>
  <section id="home" class="relative overflow-hidden">
    <div class="mx-auto flex min-h-[calc(100svh-4.25rem)] max-w-3xl flex-col justify-center px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center text-center">
        <div class="flex w-fit flex-col items-start">
          <div class="relative flex w-full min-h-16 items-end pb-1 lg:min-h-24">
            <p v-reveal class="mono-label text-neutral-500 dark:text-neutral-400">
              Hey! I'm
            </p>
            <AvatarCircle
              class="absolute right-0 top-1/2 grid -translate-y-1/2"
              :src="avatarUrl"
              :name="displayName"
            />
          </div>

          <h1 v-reveal class="mt-1 flex flex-wrap items-center font-display text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-6xl lg:text-7xl">
            <span v-if="loading" class="skeleton inline-block h-14 w-72 align-middle" />
            <template v-else>
              <span>{{ displayName }}<span class="text-accent-500 dark:text-accent-400">.</span></span>
            </template>
          </h1>
        </div>

        <p v-reveal class="mt-6 max-w-xl text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
          {{ hero?.heroBio || 'Full stack developer building useful, playful things.' }}
        </p>

        <div v-reveal class="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            :href="targetHref(primaryTarget)"
            class="group inline-flex items-center gap-2 rounded-full bg-accent-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-700 hover:shadow-lift dark:bg-accent-400 dark:text-neutral-950"
            @click="onTargetClick($event, primaryTarget)"
          >
            {{ hero?.primaryButtonText || 'View work' }}
            <ArrowDownIcon class="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            :href="targetHref(secondaryTarget)"
            class="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-7 py-3 text-sm font-semibold text-neutral-700 transition-all hover:-translate-y-0.5 hover:border-accent-500 hover:text-accent-600 dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-accent-300"
            @click="onTargetClick($event, secondaryTarget)"
          >
            {{ hero?.secondaryButtonText || 'Contact me' }}
          </a>
          <a
            v-if="resumeUrl"
            :href="resumeUrl"
            target="_blank"
            rel="noopener"
            class="inline-flex shrink-0 items-center gap-2 rounded-full border border-dashed border-neutral-300 px-7 py-3 text-sm font-semibold text-neutral-700 transition-all hover:-translate-y-0.5 hover:border-accent-500 hover:text-accent-600 dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-accent-300"
          >
            Resume
            <FileDown class="h-4 w-4" />
          </a>
        </div>

        <div v-reveal class="mt-10">
          <SocialLinks :socials="socials" />
        </div>
      </div>
    </div>
  </section>
</template>
