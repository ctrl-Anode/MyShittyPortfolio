<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
// import { useAuthStore } from '@/stores/auth';
import { scrollToSection } from '@/utils/sectionScroll';
import ThemeSwitch from '@/components/portfolio/ui/ThemeSwitch.vue';

const props = defineProps({
  links: { type: Array, default: () => [] },
  activeSection: { type: String, default: '' },
  name: { type: String, default: '' },
  initials: { type: String, default: '' },
  showProgress: { type: Boolean, default: true }
});

// const auth = useAuthStore();

const progress = ref(0);
const scrolled = ref(false);

function onScroll() {
  const el = document.documentElement;
  const max = el.scrollHeight - el.clientHeight;
  progress.value = max > 0 ? Math.min((el.scrollTop / max) * 100, 100) : 0;
  scrolled.value = el.scrollTop > 24;
}

onMounted(() => {
  if (props.showProgress) {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <div>
    <div v-if="showProgress" class="fixed inset-x-0 top-0 z-[60] h-0.5 bg-neutral-200 dark:bg-neutral-800" aria-hidden="true">
      <div class="h-full origin-left bg-accent-500 transition-[width] duration-150 ease-out dark:bg-accent-400" :style="{ width: `${progress}%` }" />
    </div>

    <header class="fixed inset-x-0 top-0 z-50">
      <ThemeSwitch :hidden="scrolled" />
      <div class="flex h-[3.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <router-link to="/" class="group flex items-center gap-3">
          <span
            v-if="initials"
            class="grid h-8 w-8 place-items-center rounded-md bg-accent-600 font-mono text-xs font-bold tracking-tight text-white shadow-sm transition-colors group-hover:bg-accent-700 dark:bg-accent-400 dark:text-neutral-950"
          >
            {{ initials }}
          </span>
          <span v-else class="mono-label grid h-8 w-8 place-items-center rounded-md bg-accent-600 text-white dark:bg-accent-400 dark:text-neutral-950">{{ 'A' }}</span>
          <span class="brand-name hidden text-sm text-neutral-900 transition-colors group-hover:text-accent-600 sm:block dark:text-neutral-100 dark:group-hover:text-accent-300">
            {{ name || 'Portfolio' }}
          </span>
        </router-link>

        <nav v-if="links.length" class="hidden items-center gap-6 lg:flex xl:hidden" aria-label="Primary">
          <a
            v-for="link in links"
            :key="link.key"
            :href="`#${link.key}`"
            class="mono-label link-underline uppercase tracking-[0.15em] transition-colors"
            :class="activeSection === link.key ? 'is-active text-accent-600 dark:text-accent-300' : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'"
            @click.prevent="scrollToSection(link.key)"
          >
            {{ link.label }}
          </a>
        </nav>

        <div class="flex items-center gap-2">
          <!-- <router-link
            :to="auth.isAuthenticated ? '/dashboard' : '/login'"
            class="font-mono text-xs uppercase tracking-widest text-neutral-500 transition-colors hover:text-accent-600 dark:text-neutral-400 dark:hover:text-accent-300"
          >
            {{ auth.isAuthenticated ? 'Dashboard' : 'Admin' }}
          </router-link> -->
        </div>
      </div>
    </header>
  </div>
</template>
