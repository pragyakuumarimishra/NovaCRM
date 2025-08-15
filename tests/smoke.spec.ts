import { test, expect } from "@playwright/test";

test("dashboard loads and shows KPIs", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.getByText("Payrolls Cost")).toBeVisible();
  await expect(page.getByText("Sales Performance")).toBeVisible();
});