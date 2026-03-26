import { test, expect } from "@playwright/test";

test.describe("Alejardín - Página Principal", () => {
  test("should load home page successfully", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Alejardín/);
    await expect(page.locator("h1")).toContainText("Alejardín");
  });

  test("should display main elements", async ({ page }) => {
    await page.goto("/");

    await page.waitForTimeout(4000);

    await expect(
      page.getByText("Una flor nueva cada día para ti"),
    ).toBeVisible();
    await expect(page.getByText(/Día \d+ de 365/)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Abrir flor del día/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Visitar jardín/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Ver logros/i }),
    ).toBeVisible();
  });

  test("should show loading screen initially", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Cargando tus flores...")).toBeVisible();

    await expect(page.getByText("Cargando tus flores...")).not.toBeVisible({
      timeout: 5000,
    });
  });

  test("should have footer", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(4000);

    await expect(page.getByText(/Con mucho 💗 para Alejandra/)).toBeVisible();
  });
});
