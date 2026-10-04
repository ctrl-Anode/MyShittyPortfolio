<script setup>
import { onBeforeUnmount, onMounted } from 'vue';
import { ChevronLeft, ChevronRight, User, Briefcase, Code, Zap, GraduationCap, Github, Mail } from 'lucide-vue-next';
import { scrollToSection } from '@/utils/sectionScroll';
import { useUiStore } from '@/stores/ui';

defineProps({
  links: { type: Array, default: () => [] },
  activeSection: { type: String, default: '' }
});

const ui = useUiStore();

const ICONS = {
  about: User,
  experience: Briefcase,
  projects: Code,
  skills: Zap,
  certificates: GraduationCap,
  github: Github,
  contact: Mail
};

function iconFor(key) {
  return ICONS[key] || User;
}

let closeTimer = null;

function onSelect(key) {
  ui.toggleSidebar(false);
  if (closeTimer) window.clearTimeout(closeTimer);
  closeTimer = window.setTimeout(() => scrollToSection(key), 250);
}

function onScroll() {
  if (ui.sidebarOpen) ui.toggleSidebar(false);
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
  if (closeTimer) window.clearTimeout(closeTimer);
});
</script>

<template>
  <aside
    v-if="links.length"
    class="fixed left-0 top-[4.25rem] z-40 flex h-[calc(100svh-4.25rem)] w-20 flex-col items-center justify-center gap-2 px-2 transition-transform duration-200 xl:w-24 xl:gap-2.5 xl:px-3"
    :class="ui.sidebarOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'"
  >
    <a
      v-for="link in links"
      :key="link.key"
      :href="`#${link.key}`"
      class="group relative flex h-11 w-11 items-center justify-center rounded-lg transition-colors xl:h-12 xl:w-12 xl:rounded-xl"
      :class="
        activeSection === link.key
          ? 'bg-accent-500/10 text-accent-600 max-xl:bg-accent-600 max-xl:text-white max-xl:shadow-lift dark:text-accent-300 dark:max-xl:bg-accent-400 dark:max-xl:text-neutral-950'
          : 'text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 max-xl:bg-white max-xl:text-neutral-700 max-xl:shadow-sm max-xl:ring-1 max-xl:ring-neutral-200 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 dark:max-xl:bg-neutral-800 dark:max-xl:text-neutral-200 dark:max-xl:ring-neutral-700'
      "
      :aria-label="link.label"
      @click.prevent="onSelect(link.key)"
    >
      <component :is="iconFor(link.key)" class="h-5 w-5 xl:h-6 xl:w-6" />
      <span
        class="pointer-events-none absolute left-full z-50 ml-2 whitespace-nowrap rounded-lg border border-neutral-200 bg-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-700 opacity-0 shadow-lift transition-all duration-150 group-hover:ml-3 group-hover:opacity-100 group-focus-visible:ml-3 group-focus-visible:opacity-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
      >
        {{ link.label }}
      </span>
      <span class="sr-only">{{ link.label }}</span>
    </a>
  </aside>

  <button
    v-if="links.length"
    type="button"
    class="fixed top-1/2 z-50 grid h-12 w-8 -translate-y-1/2 place-items-center rounded-r-full bg-accent-600 text-white shadow-lift transition-[left] duration-200 hover:bg-accent-700 lg:hidden dark:bg-accent-400 dark:text-neutral-950 dark:hover:bg-accent-300"
    :class="ui.sidebarOpen ? 'left-[72px]' : 'left-0'"
    :aria-label="ui.sidebarOpen ? 'Hide section menu' : 'Show section menu'"
    :aria-expanded="ui.sidebarOpen"
    @click="ui.toggleSidebar()"
  >
    <ChevronLeft v-if="ui.sidebarOpen" class="h-5 w-5" />
    <ChevronRight v-else class="h-5 w-5" />
  </button>
</template>
