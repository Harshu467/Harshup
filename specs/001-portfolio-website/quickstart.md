# Quickstart: Validate the Portfolio Feature

## Prerequisites

- A local static file server or equivalent hosting environment
- Internet access to resolve external fonts and social links
- Optional backend service for contact form processing if the site is deployed with message delivery enabled

## Local Validation

1. Open a terminal in the repository root.
2. Start a local static server:

```bash
cd /workspaces/Harshup
python3 -m http.server 8000
```

3. Open http://localhost:8000 in a browser.
4. Confirm the page loads with the main portfolio sections visible.

## Smoke Tests

### Portfolio Discovery

- Confirm the About section is visible by default.
- Check that Resume, Projects, and Contact navigation links move between sections.
- Verify that the layout remains readable on narrow screens.

### Content Validation

- Ensure the profile summary clearly communicates the candidate’s role and focus.
- Review the roles, education, and skills sections for readability.
- Check that projects are grouped into clear categories.

### Contact Workflow

- Submit a valid contact form with name, email, and message.
- Confirm the form passes validation and shows clear success confirmation.
- Submit an incomplete form and confirm the required-field error messaging is clear.

## Expected Outcome

The portfolio should provide a polished, accessible, and understandable overview of the candidate, with clear project and contact information and a working contact submission experience for valid user input.
