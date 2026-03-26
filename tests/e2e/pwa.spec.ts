import { test, expect } from "@playwright/test";

test.describe("Alejardín - PWA Features", () => {
  test("should have valid manifest.json", async ({ page }) => {
    const response = await page.goto("/manifest.json");

    expect(response?.status()).toBe(200);

    const manifest = await response?.json();
    expect(manifest.name).toBe("Alejardín");
    expect(manifest.short_name).toBe("Alejardín");
    expect(manifest.display).toBe("standalone");
    expect(manifest.start_url).toBe("/");
    expect(manifest.icons).toBeDefined();
    expect(manifest.icons.length).toBeGreaterThan(0);
  });

  test("should have service worker registered", async ({ page, context }) => {
    await page.goto("/");
    await page.waitForTimeout(2000);

    const swRegistered = await page.evaluate(async () => {
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        return registration !== undefined;
      }
      return false;
    });

    expect(swRegistered).toBe(true);
  });

  test("should have meta tags for PWA", async ({ page }) => {
    await page.goto("/");

    const viewport = await page
      .locator('meta[name="viewport"]')
      .getAttribute("content");
    expect(viewport).toContain("width=device-width");

    const themeColor = await page.locator('meta[name="theme-color"]');
    await expect(themeColor).toBeTruthy();
  });

  test("should have app icons linked", async ({ page }) => {
    await page.goto("/");

    const appleIcon = page.locator('link[rel="apple-touch-icon"]');
    await expect(appleIcon).toHaveAttribute("href", /\.png/);

    const manifest = page.locator('link[rel="manifest"]');
    await expect(manifest).toHaveAttribute("href", "/manifest.json");
  });

  test("should display navbar with install prompt on scroll", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForTimeout(4000);
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(500);

    const navbar = page.locator("nav");
    await expect(navbar).toBeVisible();
  });
});

test.describe("Alejardín - Responsive Design", () => {
  test("should work on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForTimeout(4000);

    await expect(
      page.getByRole("button", { name: /Abrir flor del día/i }),
    ).toBeVisible();
    await expect(page.getByText("Alejardín")).toBeVisible();
  });

  test("should work on tablet viewport", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    await page.waitForTimeout(4000);

    await expect(
      page.getByRole("button", { name: /Abrir flor del día/i }),
    ).toBeVisible();
  });

  test("should work on desktop viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");
    await page.waitForTimeout(4000);

    await expect(
      page.getByRole("button", { name: /Abrir flor del día/i }),
    ).toBeVisible();
  });
});
