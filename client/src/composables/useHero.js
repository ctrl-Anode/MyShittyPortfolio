import { onMounted, ref } from 'vue';
import { portfolioApi } from '@/api/portfolio';

export function useHero() {
  const hero = ref(null);
  const loading = ref(true);

  onMounted(async () => {
    try {
      hero.value = await portfolioApi.hero({ published: 'true' });
    } catch {
      hero.value = null;
    } finally {
      loading.value = false;
    }
  });

  return { hero, loading };
}

export default useHero;
