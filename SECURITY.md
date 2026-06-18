# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.9.x   | :white_check_mark: |
| 1.6.x   | :white_check_mark: |
| < 1.6   | :x:                |

## Reporting a Vulnerability

The Voyager AI team takes security seriously. If you discover a security vulnerability, please report it responsibly.

### How to Report

1. **DO NOT** open a public GitHub issue for security vulnerabilities
2. Use [GitHub's private vulnerability reporting](https://github.com/WuSuBuDuoMing/voyager-ai/security/advisories/new) (preferred)
3. Alternatively, email the maintainer at WuSuBuDuoMing@users.noreply.github.com

### What to Include

- A clear description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Suggested fix (if you have one)

### Response Timeline

| Severity | Initial Response | Resolution Target |
|----------|-----------------|-------------------|
| Critical | 24 hours        | 48 hours          |
| High     | 48 hours        | 7 days            |
| Medium   | 3 days          | 14 days           |
| Low      | 7 days          | 30 days           |

### What to Expect

- Acknowledgment of your report within the timeline above
- Regular updates on the progress of the fix
- Credit in the release notes (unless you prefer to remain anonymous)
- A CVE will be requested for critical vulnerabilities

## Security Best Practices for Contributors

- Never commit API keys, tokens, or credentials
- Use environment variables for sensitive configuration
- Validate all user inputs in service functions
- Follow the principle of least privilege
- Keep dependencies up to date

Thank you for helping keep Voyager AI and its users safe!
