import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";

test.describe("Login Page", () => {
  test("should log the user in with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Replace with valid test credentials
    const username = process.env.BRIGHTHR_USER_ID as string;
    const password = process.env.BRIGHTHR_USER_PASSWORD as string;

    await loginPage.login(username, password);

    // Example assertion: check for a successful login indicator
    await expect(page).toHaveURL("https://sandbox-app.brighthr.com/dashboard");
  });
});
