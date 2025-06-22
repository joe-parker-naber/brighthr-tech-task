import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { DashboardPage } from "../pages/dashboard";
import { EmployeeHubPage } from "../pages/emplyee-hub";

const username = process.env.BRIGHTHR_USER_ID as string;
const password = process.env.BRIGHTHR_USER_PASSWORD as string;

test.describe("Employees hub", () => {
  test("A logged in user can add an new employee via the employees hub", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login(username, password);

    await expect(page).toHaveURL("https://sandbox-app.brighthr.com/dashboard", {
      timeout: 20000,
    });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.visitNavLink();
    const employeeHub = new EmployeeHubPage(page);
    await expect(employeeHub.pageTitle).toBeVisible();
    await employeeHub.addEmployee();
    await expect(employeeHub.pageTitle).toBeVisible();
    await expect(employeeHub.employeeListTitle).toBeVisible();
    await expect(employeeHub.employeeListTitle).toContainText("(2)");
    // await employeeHub.deleteEmployee();
    // await expect(employeeHub.pageTitle).toBeVisible();
  });
});
test.afterEach(async ({ page }) => {
  const employeeHub = new EmployeeHubPage(page);
  //   await employeeHub.goto();
  await employeeHub.deleteEmployee();
  await expect(employeeHub.pageTitle).toBeVisible();
});
