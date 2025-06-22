## Overview

This repository houses a small test suite that will assert a logged-in user is able to add and remove employees to be managed in the BrightHR web application.

## Setup

The pre-created users' login details are stored in GitHub Secrets and will be used in CI. However, to run locally you will need to:

1. Register a user manually.
2. Save the credentials into a `.env` file at the root.

There is a `.env.example` file in the root that provides the required keys. For ease:

- Copy this file.
- Rename it by removing `.example`.
- Update the values with the credentials of your created user.

## Structure

- **tests/**: Contains all files relating to the Playwright tests.
- **features/**: Contains all the spec files with specific specs for test flows.
- **pages/**: Contains all the page models currently being used by test specs.

### Spec Structure

- Specs will contain a `describe`, which itself will contain a `test`.
- `describe` blocks should be given a descriptive name identifying the specific area being tested in the spec.
- Each `test` should have a descriptive name that identifies the particular user flow or test case being tested.

### Page Files

- These pages define the selectors, then locators, and finally any functions for specific actions that happen on that page alone.
- If this suite becomes more sophisticated and contains more specs and pages, some actions (like sidebar or header interactions) may be used in multiple places. At that point, it would be better to make these global and move them out of specific pages for ease of use and to be more easily found when working on tests.

## Running Tests

To run the tests locally, use the following commands:

- `npx playwright test`  
   Run all the current specs in your terminal (ensure your `.env` file is complete).

- `npx playwright test --ui`  
   Opens the Playwright UI, allowing you to run specific specs and facilitate more robust debugging. The tests are rendered, and you can step through steps to better understand what is happening in the DOM at each step.

## Notes

- This test suite was built to test thr following scenario:

1. Navigate to the employee tab on the left-hand side of the panel and add an employee by filling in all the fields, including optional ones.

2. Add another employee.

3. Navigate to the employee tab and verify that both employees are displayed.

4. Integrate this build so tests can run in the CI setup of your choice.

Typically it is best practice to ensure that tests written for playwright are stateless, currently the test to assert employee addition is brittle as if the test fails before the user is deleted further test runs will always fail. This is mitigated with an afterEach hook which deletes the created employee after each test.

One way to handle this brittleness would be to seed the test data at the start of every test run and have specific users for specific tests (IE we create the user for the test on every run), the downside to which would be that test data would start to build up as these users would be created on every single and could not be reused. OR more ideally we would intercept the request to write the user and mock the response data back.

As we are testing that the UI is behaving properly based on the correct data being present, we do not specifically care about the API response itself in this test, just that a request is made and that the application responds to correct data being returned and the user flow is correct and functional. This is however predicated on there being sufficient integration and unit tests closer to the code that assert that the APIs are functioning as expected (Contract testing is another avenue to explore)

at a basic level at the moment though, the brittleness is being handled and there should be little to no risk in this case due to the simple nature of the test.

## Feedback and further discussion points

### Test Case Observations

While the core test case is straightforward and quick to implement, a few challenges were encountered:

#### Selector and Element ID Issues

- Many interactive elements in the frontend lack consistent `data-testid`, `id`, or `name` attributes. Some use `data-testid` or `data-e2e`, others have `aria-labels`, and some have only a class with no identifier at all.
- This inconsistency makes defining reliable selectors and locators difficult, slowing down test development.
- For robust testing, all interactive or key informational elements should have a unique test ID. This avoids relying on button or header text, which can change and make tests brittle.
- While using roles for selectors is acceptable, many elements lack proper roles, and the semantic HTML structure is sometimes inconsistent (e.g., `h3` tags following `h1` without an `h2`).

#### Performance and Reliability

- Site performance was occasionally slow during testing, leading to the need for explicit timeouts and waits—generally not best practice.
- Frequent 429 errors and unresolved callbacks were observed, likely due to the sandbox environment. These issues can cause flaky tests and increase overall test suite runtime.
- intercepting and Mocking network requests could help mitigate these issues, but this would require more context about the application and test structure and access to the API endpoints being called.

#### General Impressions

- The application's navigation is intuitive, and the UI is clean and user-friendly.
- The performance issues mainly affected automated testing speed, not the user experience. Automation often exposes timing issues that are less noticeable to end users.

## Overall, improving selector consistency and addressing performance bottlenecks would make automated testing more efficient and reliable.

## Troubleshooting

If you encounter issues running the tests, consider the following:

- Ensure your `.env` file is correctly configured and contains valid credentials.
- Check that all dependencies are installed by running `npm install`.
- If tests are failing due to selectors, inspect the application and update the selectors in your page models as needed.
- For network-related errors or timeouts, verify your internet connection and consider increasing Playwright's timeout settings.
- Review Playwright's [documentation](https://playwright.dev/docs/intro) for further guidance.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have suggestions or improvements.

---
