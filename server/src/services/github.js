import { config } from '../config/env.js';
import { logger } from '../config/logger.js';
import { prisma } from '../lib/prisma.js';
import { redis } from '../lib/redis.js';
import { ApiError } from '../utils/ApiError.js';

const SYNC_KEY = 'portfolio:github:synced';
const SYNC_TTL_SECONDS = 60 * 60;
const GITHUB_API = 'https://api.github.com';
const DEFAULT_REPO_COUNT = 6;

export function isGithubConfigured() {
  return Boolean(config.GITHUB_USERNAME);
}

async function fetchRepos() {
  const url = `${GITHUB_API}/users/${encodeURIComponent(config.GITHUB_USERNAME)}/repos?type=owner&sort=pushed&per_page=${DEFAULT_REPO_COUNT}`;
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'enterprise-boilerplate'
  };
  if (config.GITHUB_TOKEN) headers.Authorization = `Bearer ${config.GITHUB_TOKEN}`;

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status}`);
  }
  const payload = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error('GitHub API returned an unexpected payload');
  }

  return payload
    .filter((repo) => !repo.fork)
    .map((repo) => ({
      name: repo.name,
      description: repo.description ?? null,
      url: repo.html_url,
      language: repo.language ?? null,
      stars: repo.stargazers_count ?? 0,
      topics: Array.isArray(repo.topics) ? repo.topics : []
    }));
}

export async function syncGithubRepos({ force = false } = {}) {
  if (!isGithubConfigured()) {
    throw ApiError.badRequest('GITHUB_USERNAME is not configured');
  }

  if (!force) {
    try {
      const synced = await redis.get(SYNC_KEY);
      if (synced) return { synced: 0, cached: true };
    } catch (error) {
      logger.warn({ err: error.message }, 'redis_cache_read_failed');
    }
  }

  const repos = await fetchRepos();

  await prisma.$transaction(async (tx) => {
    for (const repo of repos) {
      const existing = await tx.githubRepo.findFirst({ where: { url: repo.url } });
      if (existing) {
        await tx.githubRepo.update({ where: { id: existing.id }, data: repo });
      } else {
        await tx.githubRepo.create({ data: repo });
      }
    }
  });

  await redis.set(SYNC_KEY, JSON.stringify({ at: new Date().toISOString() }), 'EX', SYNC_TTL_SECONDS);
  return { synced: repos.length, cached: false };
}

export function getGithubConfig() {
  return {
    username: config.GITHUB_USERNAME || null,
    configured: isGithubConfigured()
  };
}