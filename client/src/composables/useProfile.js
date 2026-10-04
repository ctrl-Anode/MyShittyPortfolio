import { onMounted, ref } from 'vue';
import { portfolioApi } from '@/api/portfolio';

export function useProfile() {
  const profile = ref(null);
  const loading = ref(true);

  onMounted(async () => {
    try {
      profile.value = await portfolioApi.profile();
    } catch {
      profile.value = null;
    } finally {
      loading.value = false;
    }
  });

  return { profile, loading };
}

export default useProfile;