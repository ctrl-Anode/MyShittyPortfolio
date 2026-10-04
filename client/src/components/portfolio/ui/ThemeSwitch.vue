<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import { Lightbulb, LightbulbOff } from 'lucide-vue-next';
import { useUiStore } from '@/stores/ui';

const props = defineProps({
  hidden: { type: Boolean, default: false }
});

const ui = useUiStore();
const isDark = computed(() => ui.theme === 'dark');
const pulling = ref(false);

let startY = 0;
let dragged = false;

function toggle() {
  ui.toggleTheme();
}

function onPointerDown(event) {
  event.preventDefault();
  pulling.value = true;
  dragged = false;
  startY = event.clientY;
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
}

function onPointerMove(event) {
  if (!pulling.value) return;
  if (event.clientY - startY > 24) {
    dragged = true;
    toggle();
    stopPull();
  }
}

function onPointerUp() {
  stopPull();
}

function stopPull() {
  pulling.value = false;
  window.removeEventListener('pointermove', onPointerMove);
  window.removeEventListener('pointerup', onPointerUp);
}

function onStringClick() {
  if (dragged) {
    dragged = false;
    return;
  }
  toggle();
}

onBeforeUnmount(stopPull);
</script>

<template>
  <div
    class="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 flex-col items-center transition-all duration-300 lg:hidden xl:flex"
    :class="props.hidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'"
  >
    <span class="h-4 w-0.5 bg-neutral-300 dark:bg-neutral-700" aria-hidden="true" />

    <button
      type="button"
      class="grid h-9 w-9 place-items-center rounded-full transition-colors"
      :aria-label="isDark ? 'Turn lights on' : 'Turn lights off'"
      @click="toggle()"
    >
      <Lightbulb
        v-if="!isDark"
        class="h-7 w-7 rotate-180 text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]"
      />
      <LightbulbOff v-else class="h-7 w-7 rotate-180 text-neutral-400 dark:text-neutral-400" />
    </button>

    <button
      type="button"
      class="flex flex-col items-center"
      :aria-label="isDark ? 'Pull the string to turn lights on' : 'Pull the string to turn lights off'"
      @pointerdown="onPointerDown"
      @click="onStringClick()"
    >
      <span
        class="w-0.5 bg-neutral-300 transition-all duration-150 dark:bg-neutral-700"
        :class="pulling ? 'h-7' : 'h-5'"
      />
      <span
        class="h-2.5 w-2.5 rounded-full border border-neutral-300 bg-white transition-all duration-150 dark:border-neutral-600 dark:bg-neutral-800"
        :class="pulling ? 'translate-y-2' : ''"
      />
    </button>
  </div>
</template>
