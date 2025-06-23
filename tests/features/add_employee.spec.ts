import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { DashboardPage } from "../pages/dashboard";
import { EmployeeHubPage } from "../pages/employee-hub";
import { v4 as uuidv4 } from "uuid";

const username = process.env.BRIGHTHR_USER_ID as string;
const password = process.env.BRIGHTHR_USER_PASSWORD as string;
let employee = {
  firstName: uuidv4(),
  lastName: "User",
  email: "test@email.com",
  phoneNumber: "1234567890",
  jobTitle: "Test Job",
};

test.describe("Employees hub", () => {
  test("A logged in user can add an new employee via the employees hub", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login(username, password);

    await expect(page).toHaveURL("https://sandbox-app.brighthr.com/dashboard", {
      timeout: 30000,
    });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.visitNavLink();
    const employeeHub = new EmployeeHubPage(page);
    await expect(employeeHub.pageTitle).toBeVisible();
    await employeeHub.addEmployee(employee);
    await expect(employeeHub.pageTitle).toBeVisible();
    await expect(employeeHub.employeeListTitle).toBeVisible();
    await employeeHub.findEmployee(employee.firstName);
  });
});
test.afterEach(async ({ page }) => {
  const employeeHub = new EmployeeHubPage(page);
  await employeeHub.deleteEmployee(employee.firstName);
  await expect(employeeHub.pageTitle).toBeVisible();
});
