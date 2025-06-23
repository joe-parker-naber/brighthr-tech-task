import { Page, Locator, expect } from "@playwright/test";
import { Employee } from "../types/employee";

export class EmployeeHubPage {
  readonly page: Page;
  readonly addEmployeeButton: Locator;
  readonly searchInput: Locator;
  readonly employeeEdit: Locator;
  readonly pageTitle: Locator;
  readonly employeeListTitle: Locator;
  readonly employeeListItem: Locator;
  readonly addEmployeeForm: Locator;
  readonly addEmployeeFormFirstName: Locator;
  readonly addEmployeeFormLastName: Locator;
  readonly addEmployeeFormEmail: Locator;
  readonly addEmployeeFormPhone: Locator;
  readonly addEmployeeFormStart: Locator;
  readonly addEmployeeFormToday: Locator;
  readonly addEmployeeFormJobTitle: Locator;
  readonly addEmployeeFormSave: Locator;
  readonly addEmployeeSuccess: Locator;
  readonly closeModal: Locator;
  readonly employeeDeleteLink: Locator;
  readonly deleteCheckbox: Locator;
  readonly employeeDeleteButton: Locator;
  readonly returnToHubButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addEmployeeButton = page.locator("button", {
      hasText: "Add employee",
    });
    this.searchInput = page.locator('input[data-test="employee-search"]');
    this.employeeEdit = page.getByTestId("EditButton");
    this.pageTitle = page.locator("h1", { hasText: "Employee hub" });
    this.employeeListTitle = page.locator("h3", {
      hasText: "Employees",
    });
    this.employeeListItem =
      // the following element requires a test ID, this locator is work around until one can be added
      this.addEmployeeForm = page.locator(
        "div.flex.flex-col.relative.m-4.h-auto.transition-all.bg-white.shadow.rounded-lg.max-h-\\[90\\%\\].w-\\[900px\\].overflow-x-hidden.overflow-y-auto"
      );
    // the following element requires a test ID, this locator is work around until one can be added
    this.addEmployeeSuccess = page.locator("h1", {
      hasText: "Success! New employee added",
    });
    this.addEmployeeFormFirstName = this.addEmployeeForm.locator(
      'input[name="firstName"]'
    );
    this.addEmployeeFormLastName = this.addEmployeeForm.locator(
      'input[name="lastName"]'
    );
    this.addEmployeeFormEmail = this.addEmployeeForm.locator(
      'input[name="email"]'
    );
    this.addEmployeeFormPhone = this.addEmployeeForm.locator(
      'input[name="phoneNumber"]'
    );
    this.addEmployeeFormStart = page.getByTestId("input-selector");
    this.addEmployeeFormToday = this.addEmployeeForm.locator(
      ".DayPicker-Day.DayPicker-Day--today"
    );
    this.addEmployeeFormJobTitle = this.addEmployeeForm.locator(
      'input[name="jobTitle"]'
    );
    this.addEmployeeFormSave = this.addEmployeeForm.locator(
      'button[type="submit"]'
    );
    this.closeModal = page.locator('button[aria-label="Close modal"]');
    this.employeeDeleteLink = page.locator("a", {
      hasText: "Delete employee record",
    });
    this.deleteCheckbox = page.getByTestId("checkboxLabel");
    this.employeeDeleteButton = page.getByRole("button", { name: /delete/i });
    this.returnToHubButton = page.getByRole("button", {
      name: "Return to employee hub",
    });
  }
  async findEmployee(uuid: string): Promise<Locator> {
    const employee = this.page.locator("h1", { hasText: uuid });
    await expect(employee).toBeVisible();
    return employee;
  }

  async goto() {
    await this.page.goto("/employee-hub");
  }

  async addEmployee(employee: Employee) {
    await this.addEmployeeButton.click();
    await this.addEmployeeForm.waitFor({ state: "visible" });
    await this.addEmployeeFormFirstName.fill(employee.firstName);
    await this.addEmployeeFormLastName.fill(employee.lastName);
    await this.addEmployeeFormEmail.fill(employee.email);
    await this.addEmployeeFormPhone.fill("1234567890");
    await this.addEmployeeFormStart.click();
    await this.addEmployeeFormToday.click();
    await this.addEmployeeFormJobTitle.fill("Software Engineer");
    await this.addEmployeeFormSave.click();
    await expect(this.addEmployeeSuccess).toBeVisible();
    await this.closeModal.click();
    await this.page.waitForTimeout(2000);
  }

  async deleteEmployee(uuid) {
    await this.findEmployee(uuid);
    await this.employeeEdit.nth(1).click();
    await this.employeeDeleteLink.click();
    await this.deleteCheckbox.click();
    await this.employeeDeleteButton.click();
    await expect(this.returnToHubButton).toBeVisible();
    await this.returnToHubButton.click();
    await expect(this.pageTitle).toBeVisible();
  }
}
