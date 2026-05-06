import { expect, test } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Elius Niwamanya/)
  })

  test('should display hero section', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.hero')).toBeVisible()
    await expect(page.locator('h1')).toContainText('Elius Niwamanya')
  })

  test('should have navigation', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('nav')).toBeVisible()
  })

  test('should navigate to sections via anchor links', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="#experience"]')
    await expect(page.locator('#experience')).toBeVisible()
  })

  test('should toggle theme', async ({ page }) => {
    await page.goto('/')
    const themeToggle = page.locator('[aria-label*="theme"]')
    await themeToggle.click()
    await expect(page.locator('body')).toHaveClass(/theme-light/)
  })
})

test.describe('Hero Section', () => {
  test('should display profile image', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.hero__image')).toBeVisible()
  })

  test('should cycle profile images on hover', async ({ page }) => {
    await page.goto('/')
    const profileContainer = page.locator('.hero__image-container')
    await profileContainer.hover()
    await page.waitForTimeout(1500)
    await expect(profileContainer).toBeVisible()
  })

  test('should display contact buttons', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('a[href*="wa.me"]')).toBeVisible()
    await expect(page.locator('a[href="#projects"]')).toBeVisible()
  })
})

test.describe('Experience Section', () => {
  test('should display experience timeline', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="#experience"]')
    await expect(page.locator('#experience')).toBeVisible()
    await expect(page.locator('.timeline')).toBeVisible()
  })

  test('should display company logos', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="#experience"]')
    await expect(page.locator('img[alt*="Trojan"]')).toBeVisible()
  })
})

test.describe('MiniGame', () => {
  test('should display game section', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="#minigame"]')
    await expect(page.locator('#minigame')).toBeVisible()
  })

  test('should start game on button click', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="#minigame"]')
    const startButton = page.locator('button:has-text("Start")')
    await startButton.click()
    await expect(page.locator('.game-grid')).toBeVisible()
  })

  test('should toggle sound', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="#minigame"]')
    const soundToggle = page.locator('button[aria-label*="sound"]')
    await soundToggle.click()
    await expect(soundToggle).toHaveAttribute('aria-pressed', 'true')
  })
})
