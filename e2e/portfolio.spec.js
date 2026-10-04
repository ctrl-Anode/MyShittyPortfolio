import { expect, test } from '@playwright/test';

test.describe('public portfolio', () => {
  test('home renders the public profile sections', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('#home')).toBeVisible();
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.locator('#skills')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('admin area is locked behind authentication', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/login/);
    const url = new URL(page.url());
    expect(url.searchParams.get('redirect')).toBe('/admin');
  });

  test('projects index page renders', async ({ page }) => {
    await page.goto('/projects');
    await expect(page.getByRole('heading', { name: 'All projects' })).toBeVisible();
    await expect(page.locator('a:has-text("Back to home")')).toBeVisible();
  });

  test('contact form validation blocks an empty submission', async ({ page }) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.locator('#contact')).toContainText('Name is required');
  });
});