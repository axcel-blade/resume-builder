import { test, expect } from "@playwright/test";

test.describe("career tools", () => {
  test("resume builder loads and persists profile edits", async ({ page }) => {
    await page.goto("/apps/resume-builder");
    await expect(page.getByRole("heading", { name: "Resume Builder" })).toBeVisible();

    const nameInput = page.getByLabel("Full Name");
    await nameInput.fill("E2E Candidate");
    await expect(nameInput).toHaveValue("E2E Candidate");
    await expect(page.getByText("Resume Preview (A4 Pages)")).toBeVisible();
  });

  test("cover letter writer loads and shows editor and preview", async ({ page }) => {
    await page.goto("/apps/cover-letter");
    await expect(page.getByRole("heading", { name: "Cover Letter Writer" })).toBeVisible();
    await expect(page.getByText("Your Details")).toBeVisible();
    await expect(page.getByText("Cover Letter Preview (A4)")).toBeVisible();
  });
});
