# Frontend Security Policy

## Scope

This security policy applies to the frontend client used for Vitaforge resume and cover-letter workflows. It covers browser-side rendering, user input handling, local persistence, and import/export flows.

## Key Security Considerations

- XSS risks from resume or cover-letter content rendered into the DOM
- Malicious JSON import payloads passed through the Import JSON flow
- Unsafe handling of user-controlled strings in preview or export output
- LocalStorage usage for draft data and exported profile bundles

## Best Practices

- Sanitize any imported content before rendering it in the UI
- Avoid using `dangerouslySetInnerHTML` for user-generated content unless it has been sanitized
- Validate imported JSON structure before applying it to the editor state
- Keep browser-only personal data limited to local, non-sensitive draft content
- Prefer explicit escaping for text that may include HTML or script-like content

## Reporting a Vulnerability

Please do not disclose security issues through public issues or pull requests.

Send a private report to: **srikanthfernando3@gmail.com**

Include:

1. A description of the issue and its potential impact
2. Steps to reproduce or a proof of concept
3. Affected version or commit hash
4. Suggested remediation, if known

We will acknowledge valid reports within 72 hours and prioritise fixes for the next release.
