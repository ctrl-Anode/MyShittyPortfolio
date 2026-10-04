import { MeiliSearch } from 'meilisearch';
import { config } from '../config/env.js';
import { logger } from '../config/logger.js';

export const USERS_INDEX = 'users';

export const meili = config.MEILI_ENABLED
  ? new MeiliSearch({
      host: config.MEILI_HOST,
      apiKey: config.MEILI_API_KEY || undefined
    })
  : null;

let ensurePromise = null;

export function ensureUsersIndex() {
  if (!meili) return Promise.resolve(null);
  if (ensurePromise) return ensurePromise;

  ensurePromise = (async () => {
    try {
      const index = meili.index(USERS_INDEX);
      await index.updateSettings({
        searchableAttributes: ['firstName', 'lastName', 'email'],
        filterableAttributes: ['status', 'roleNames'],
        sortableAttributes: ['createdAt']
      });
      return index;
    } catch (error) {
      logger.warn({ err: error.message }, 'meili_index_settings_failed');
      ensurePromise = null;
      return null;
    }
  })();

  return ensurePromise;
}
