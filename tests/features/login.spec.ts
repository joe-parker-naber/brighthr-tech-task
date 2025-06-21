import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";

test.describe("Login Page", () => {
  test("should log the user in with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const username = process.env.BRIGHTHR_USER_ID as string;
    const password = process.env.BRIGHTHR_USER_PASSWORD as string;

    await loginPage.login(username, password);

    await expect(page).toHaveURL("https://sandbox-app.brighthr.com/dashboard", {
      timeout: 20000,
    });
  });
});
