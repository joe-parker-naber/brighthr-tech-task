import { Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly sidebar: Locator;
  readonly employeesHubLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = page.getByTestId("sidebar");
    this.employeesHubLink = page.locator('[data-e2e="employees"]');
  }

  async goto() {
    await this.page.goto("/dashboard");
  }

  async visitNavLink() {
    await this.employeesHubLink.click();
    await this.page.waitForURL("**/employee-hub", { timeout: 20000 });
  }
}
