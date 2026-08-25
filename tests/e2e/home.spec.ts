import { expect, test } from "@playwright/test";

test("Next home page renders the design system entry point", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Design System Starter");
  await expect(
    page.getByRole("heading", { name: "Tokens that scale with the interface." }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Explore components" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Read the docs" })).toBeVisible();
});
