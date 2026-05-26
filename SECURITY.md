# Security Policy

## Supported Versions

Only the latest release of Vita Forge receives security fixes.

| Version | Supported |
|---------|-----------|
| Latest  | Yes       |
| Older   | No        |

---

## Scope

Vita Forge is a client-side web application. All resume and cover letter data is stored exclusively in the user's browser (`localStorage`). No user data is transmitted to or stored on any server, with the following exception:

- **AI summary generation** (`api/generate_summary.js`): an optional serverless function that proxies a request to the Anthropic API. It requires a valid API key and does not persist any data.

Security concerns relevant to this project include:

- Cross-site scripting (XSS) in rendered resume or cover letter content
- Malicious JSON imported via the Import JSON feature
- Vulnerabilities in the serverless API handler

---

## Reporting a Vulnerability

**Do not report security vulnerabilities through public GitHub issues.**

Send a private report to: **srikanthfernando3@gmail.com**

Include:

1. A description of the vulnerability and its potential impact
2. Steps to reproduce or a proof of concept
3. The affected version or commit hash
4. Any suggested fix, if you have one

You will receive an acknowledgement within **72 hours**. If the vulnerability is confirmed, a fix will be prioritised for the next release. You will be credited in the release notes unless you prefer to remain anonymous.
