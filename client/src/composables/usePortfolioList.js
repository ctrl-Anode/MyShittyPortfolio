import { onMounted, ref } from 'vue';
import { portfolioApi } from '@/api/portfolio';

export function usePortfolioList(section, params = {}) {
  const rows = ref([]);
  const loading = ref(true);
  const error = ref(false);
  const meta = ref(null);

  async function load() {
    loading.value = true;
    error.value = false;
    try {
      const result = await portfolioApi.list(section, params);
      rows.value = result.data || [];
      meta.value = result.meta || null;
    } catch {
      error.value = true;
    } finally {
      loading.value = false;
    }
  }

  onMounted(load);

  return { rows, loading, error, meta, load };
}