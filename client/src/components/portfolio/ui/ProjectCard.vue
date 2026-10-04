<script setup>
import { ref } from 'vue';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/vue/24/outline';
import { Play } from 'lucide-vue-next';
import { arrayFromJson } from '@/utils/format';

defineProps({
  project: { type: Object, required: true },
  index: { type: Number, default: 0 }
});

const videoRef = ref(null);
const teaserActive = ref(false);

function isTouchDevice() {
  return typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
}

function playTeaser() {
  videoRef.value?.play().catch(() => {});
}

function stopTeaser() {
  const video = videoRef.value;
  if (!video) return;
  video.pause();
  video.currentTime = 0;
}

function onMediaClick() {
  if (!isTouchDevice() || !videoRef.value) return;
  if (teaserActive.value) {
    teaserActive.value = false;
    stopTeaser();
  } else {
    teaserActive.value = true;
    playTeaser();
  }
}
</script>

<template>
  <article
    v-reveal
    class="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-500/40 hover:shadow-lift dark:border-neutral-800 dark:bg-neutral-900"
    :class="{ 'delay-100': index % 3 === 1, 'delay-200': index % 3 === 2 }"
    @mouseenter="playTeaser"
    @mouseleave="stopTeaser"
  >
    <div v-if="project.imageUrl || project.videoUrl" class="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800" @click="onMediaClick">
      <img v-if="project.imageUrl" :src="project.imageUrl" :alt="project.title" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105">
      <video
        v-if="project.videoUrl"
        ref="videoRef"
        :src="project.videoUrl"
        class="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        :class="teaserActive ? 'opacity-100' : ''"
        muted
        loop
        playsinline
        preload="metadata"
      />
      <span
        v-if="project.videoUrl"
        class="mono-label pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-neutral-950/60 px-2.5 py-1 text-[10px] text-white transition-opacity duration-300 group-hover:opacity-0"
        :class="teaserActive ? 'opacity-0' : ''"
      >
        <Play class="h-3 w-3" />
        Teaser
      </span>
      <div class="absolute inset-0 flex items-end justify-end gap-2 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" rel="noopener" class="rounded-full bg-white/95 p-2 text-neutral-900 shadow-sm transition-transform hover:scale-110" :aria-label="`Open live demo of ${project.title}`" @click.stop>
          <ArrowTopRightOnSquareIcon class="h-5 w-5" />
        </a>
        <a v-if="project.repoUrl" :href="project.repoUrl" target="_blank" rel="noopener" class="rounded-full bg-white/95 p-2 text-neutral-900 shadow-sm transition-transform hover:scale-110" :aria-label="`View source of ${project.title}`" @click.stop>
          <CodeBracketIcon class="h-5 w-5" />
        </a>
      </div>
    </div>
    <div v-else class="relative flex aspect-video items-center justify-center overflow-hidden border-b border-neutral-200 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:border-neutral-800 dark:from-neutral-800 dark:to-neutral-950">
      <span class="mono-label text-5xl font-bold text-neutral-400/70 transition-transform duration-300 group-hover:scale-110 dark:text-neutral-500/50">{{ project.title.slice(0, 1) }}</span>
      <span class="mono-label absolute bottom-3 right-4 text-neutral-400 dark:text-neutral-500">0{{ index + 1 }}</span>
    </div>

    <div class="flex flex-1 flex-col p-6">
      <div class="flex items-center justify-between gap-3">
        <h3 class="truncate font-display text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">{{ project.title }}</h3>
        <span v-if="project.featured" class="mono-label shrink-0 rounded-full bg-mustard-400/15 px-2.5 py-1 text-mustard-700 dark:bg-mustard-400/20 dark:text-mustard-300">
          Featured
        </span>
      </div>
      <p class="mt-2 flex-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">{{ project.description }}</p>

      <div v-if="arrayFromJson(project.techStack).length" class="mt-4 flex flex-wrap gap-1.5">
        <span
          v-for="tech in arrayFromJson(project.techStack)"
          :key="tech"
          class="font-mono text-[11px] text-neutral-500 dark:text-neutral-400"
        >
          #{{ tech }}
        </span>
      </div>

      <div v-if="project.demoUrl || project.repoUrl" class="mt-5 flex items-center gap-5 border-t border-neutral-200/70 pt-4 dark:border-neutral-800">
        <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" rel="noopener" class="link-underline font-mono text-sm text-accent-600 hover:text-accent-500 dark:text-accent-400">
          Live demo
        </a>
        <a v-if="project.repoUrl" :href="project.repoUrl" target="_blank" rel="noopener" class="link-underline font-mono text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
          Source
        </a>
      </div>
    </div>
  </article>
</template>