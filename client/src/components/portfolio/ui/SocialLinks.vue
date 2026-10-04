<script setup>
import { computed } from 'vue';

const ICONS = {
  github: {
    label: 'GitHub',
    path: 'M12 2A10 10 0 0 0 8.84 21.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.55 9.55 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z'
  },
  linkedin: {
    label: 'LinkedIn',
    path: 'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.21.79 24 1.77 24h20.45c.98 0 1.78-.79 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z'
  },
  email: {
    label: 'Email',
    path: 'M2.75 4h18.5A1.75 1.75 0 0 1 23 5.75v12.5A1.75 1.75 0 0 1 21.25 20H2.75A1.75 1.75 0 0 1 1 18.25V5.75A1.75 1.75 0 0 1 2.75 4Zm.28 2.28L12 13.68l8.97-7.4a.75.75 0 1 0-.98-1.14L12 11.9 3.73 5.14a.75.75 0 1 0-.7 1.14Z'
  },
  twitter: {
    label: 'X',
    path: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z'
  },
  facebook: {
    label: 'Facebook',
    path: 'M24 12.073C24 5.406 18.627 0 12 0S0 5.406 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.026 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.971h-1.513c-1.491 0-1.956.931-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z'
  },
  instagram: {
    label: 'Instagram',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z'
  }
};

const props = defineProps({
  socials: { type: Object, default: () => ({}) },
  size: { type: String, default: 'h-5 w-5' },
  invert: { type: Boolean, default: false }
});

const links = computed(() =>
  Object.entries(props.socials)
    .filter(([, value]) => value)
    .map(([key, value]) => ({
      key,
      href: key === 'email' ? `mailto:${value}` : value,
      label: ICONS[key]?.label || key,
      icon: ICONS[key]
    }))
);
</script>

<template>
  <div class="flex flex-wrap items-center gap-1.5">
    <a
      v-for="link in links"
      :key="link.key"
      :href="link.href"
      :title="link.label"
      target="_blank"
      rel="noopener"
      class="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors"
      :class="
        invert
          ? 'text-neutral-400 hover:bg-neutral-800 hover:text-accent-400'
          : 'text-neutral-500 hover:bg-neutral-100 hover:text-accent-600 dark:hover:bg-neutral-800 dark:hover:text-accent-400'
      "
    >
      <svg v-if="link.icon" :class="size" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path :d="link.icon.path" />
      </svg>
      <span v-else class="font-mono text-sm font-semibold uppercase">{{ link.label.slice(0, 1) }}</span>
      <span class="sr-only">{{ link.label }}</span>
    </a>
  </div>
</template>