import { test, expect } from "@playwright/test";

test.describe("Alejardín - Jardín", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(4000); 
  });

  test("should navigate to garden view", async ({ page }) => {
    const gardenButton = page.getByRole("button", { name: /Visitar jardín/i });
    await gardenButton.click();

    await expect(page.getByText("Mi jardín")).toBeVisible();
    await expect(page.getByRole("button", { name: /Volver/i })).toBeVisible();
  });

  test("should display 365 day slots", async ({ page }) => {
    await page.getByRole("button", { name: /Visitar jardín/i }).click();
    await page.waitForTimeout(500);

    const daySlots = page.locator('[class*="grid"] > div');
    const count = await daySlots.count();

    expect(count).toBeGreaterThan(300); 
  });

  test("should navigate back from garden", async ({ page }) => {
    await page.getByRole("button", { name: /Visitar jardín/i }).click();
    await page.waitForTimeout(500);

    const backButton = page.getByRole("button", { name: /Volver/i });
    await backButton.click();

    await expect(
      page.getByRole("button", { name: /Abrir flor del día/i }),
    ).toBeVisible();
  });
});

test.describe("Alejardín - Milestones", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(4000);
  });

  test("should navigate to milestones view", async ({ page }) => {
    const milestonesButton = page.getByRole("button", { name: /Ver logros/i });
    await milestonesButton.click();

    await expect(page.getByText("Logros del Jardín")).toBeVisible();
    await expect(
      page.getByText(/Has desbloqueado \d+ de \d+ logros/),
    ).toBeVisible();
  });

  test("should display milestone cards", async ({ page }) => {
    await page.getByRole("button", { name: /Ver logros/i }).click();
    await page.waitForTimeout(500);

    await expect(page.getByText("Primera Semana")).toBeVisible();
    await expect(page.getByText("Un Mes Completo")).toBeVisible();
    await expect(page.getByText("Año Completo")).toBeVisible();
  });

  test("should show locked milestones with progress", async ({ page }) => {
    await page.getByRole("button", { name: /Ver logros/i }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText("🔒")).toBeVisible();
    await expect(page.getByText("Progreso")).toBeVisible();
  });

  test("should navigate back from milestones", async ({ page }) => {
    await page.getByRole("button", { name: /Ver logros/i }).click();
    await page.waitForTimeout(500);
    
    const backButton = page.getByRole("button", { name: /Volver/i });
    await backButton.click();

    await expect(
      page.getByRole("button", { name: /Abrir flor del día/i }),
    ).toBeVisible();
  });
});
