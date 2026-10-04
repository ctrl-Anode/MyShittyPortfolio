import * as portfolioService from './portfolio.service.js';
import * as githubSync from '../../services/github.js';
import { parseInput } from './portfolio.validation.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { logger } from '../../config/logger.js';

export const getProfile = asyncHandler(async (_req, res) => {
  const row = await portfolioService.listProfile();
  res.json({ success: true, data: row });
});

const PUBLIC_LIST = {
  heroes: 'hero',
  experiences: 'experience',
  projects: 'project',
  skills: 'skill',
  certificates: 'certificate',
  github: 'github',
  testimonials: 'testimonial'
};

function listPublic(route) {
  const resource = PUBLIC_LIST[route];
  return asyncHandler(async (req, res) => {
    const { rows, total, page, limit } = await portfolioService.listResource(resource, req.query, {
      publicOnly: true
    });
    res.json({
      success: true,
      data: rows,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) }
    });
  });
}

export const listHeroes = listPublic('heroes');
export const listExperiences = listPublic('experiences');
export const listProjects = listPublic('projects');
export const listSkills = listPublic('skills');
export const listCertificates = listPublic('certificates');
export const listTestimonials = listPublic('testimonials');

async function ensureGithubSeed() {
  if (!githubSync.isGithubConfigured()) return;
  const count = await portfolioService.countResource('github');
  if (count > 0) return;
  try {
    await githubSync.syncGithubRepos();
  } catch (error) {
    logger.warn({ err: error.message }, 'github_auto_seed_failed');
  }
}

export const listGithub = asyncHandler(async (req, res) => {
  await ensureGithubSeed();
  const { rows, total, page, limit } = await portfolioService.listResource('github', req.query, {
    publicOnly: true
  });
  res.json({
    success: true,
    data: rows,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) }
  });
});

export const githubConfig = asyncHandler(async (_req, res) => {
  res.json({ success: true, data: githubSync.getGithubConfig() });
});

export const syncGithub = asyncHandler(async (_req, res) => {
  const result = await githubSync.syncGithubRepos({ force: true });
  res.json({ success: true, data: result });
});

export const createContactMessage = asyncHandler(async (req, res) => {
  const row = await portfolioService.createContactMessage(req.body);
  res.status(201).json({ success: true, data: row });
});

export const adminList = asyncHandler(async (req, res) => {
  const { rows, total, page, limit } = await portfolioService.listResource(req.params.resource, req.query);
  res.json({
    success: true,
    data: rows,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) }
  });
});

export const adminGet = asyncHandler(async (req, res) => {
  const row = await portfolioService.getResource(req.params.resource, req.params.id);
  res.json({ success: true, data: row });
});

export const adminCreate = asyncHandler(async (req, res) => {
  const data = parseInput(req.params.resource, req.body);
  const row = await portfolioService.createResource(req.params.resource, data);
  res.status(201).json({ success: true, data: row });
});

export const adminUpdate = asyncHandler(async (req, res) => {
  const data = parseInput(req.params.resource, req.body, { partial: true });
  const row = await portfolioService.updateResource(req.params.resource, req.params.id, data);
  res.json({ success: true, data: row });
});

export const adminDelete = asyncHandler(async (req, res) => {
  const result = await portfolioService.deleteResource(req.params.resource, req.params.id);
  res.json({ success: true, data: result });
});