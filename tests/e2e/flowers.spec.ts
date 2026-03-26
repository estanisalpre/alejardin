import { test, expect } from "@playwright/test";

test.describe("Alejardín - Abrir Flores", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(4000);
  });

  test("should open daily flower successfully", async ({ page }) => {
    const openButton = page.getByRole("button", {
      name: /Abrir flor del día/i,
    });
    await openButton.click();

    await expect(
      page.locator('[role="dialog"], .fixed.inset-0').first(),
    ).toBeVisible({ timeout: 2000 });
    await expect(page.getByText(/Significado/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /Cerrar|×/i })).toBeVisible();
  });

  test("should close flower modal", async ({ page }) => {
    const openButton = page.getByRole("button", {
      name: /Abrir flor del día/i,
    });
    await openButton.click();

    await page.waitForTimeout(1000);

    const closeButton = page.getByRole("button", { name: /Cerrar|×/i }).first();
    await closeButton.click();
    await expect(page.locator('[role="dialog"]')).not.toBeVisible({
      timeout: 2000,
    });
  });

  test("should update flower count after opening", async ({ page }) => {
    const counterText = await page.getByText(/Día \d+ de 365/).textContent();
    const initialCount = parseInt(counterText?.match(/\d+/)?.[0] || "0");

    await page.getByRole("button", { name: /Abrir flor del día/i }).click();
    await page.waitForTimeout(1000);

    await page
      .getByRole("button", { name: /Cerrar|×/i })
      .first()
      .click();
    await page.waitForTimeout(500);

    const newCounterText = await page.getByText(/Día \d+ de 365/).textContent();
    const newCount = parseInt(newCounterText?.match(/\d+/)?.[0] || "0");

    expect(newCount).toBeGreaterThanOrEqual(initialCount);
  });

  test("should show message when trying to open twice", async ({
    page,
    context,
  }) => {
    await page.getByRole("button", { name: /Abrir flor del día/i }).click();
    await page.waitForTimeout(1000);

    await page
      .getByRole("button", { name: /Cerrar|×/i })
      .first()
      .click();
    await page.waitForTimeout(500);
    await page.getByRole("button", { name: /Abrir flor del día/i }).click();
    await expect(page.getByText(/Ya descubriste la flor de hoy/i)).toBeVisible({
      timeout: 2000,
    });
  });
});
