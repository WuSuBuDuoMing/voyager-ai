# Contributing to Voyager AI

Thank you for your interest in contributing to Voyager AI! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Message Convention](#commit-message-convention)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to WuSuBuDuoMing@users.noreply.github.com.

## Getting Started

### Prerequisites

- [WeChat DevTools](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html) (>= 1.06.2301010)
- Basic knowledge of WeChat Mini Program development (WXML, WXSS, JS)
- A GitHub account

### Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/voyager-ai.git
   ```
3. Open the project in WeChat DevTools
4. Create a new branch for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## How to Contribute

### Reporting Bugs

- Check [existing issues](https://github.com/WuSuBuDuoMing/voyager-ai/issues) first
- Use the Bug Report template
- Include reproduction steps, expected behavior, and screenshots if applicable

### Suggesting Features

- Open a new issue using the Feature Request template
- Clearly describe the use case and expected behavior
- Wait for discussion before starting implementation

### Submitting Code

1. **Bug Fixes** -- Fix an existing issue or address a reported bug
2. **New Features** -- Add functionality (discuss in an issue first)
3. **Documentation** -- Improve README, comments, or docs
4. **Tests** -- Add or improve test coverage

## Development Workflow

1. Ensure your fork is up to date:
   ```bash
   git remote add upstream https://github.com/WuSuBuDuoMing/voyager-ai.git
   git fetch upstream
   git rebase upstream/main
   ```

2. Create a feature branch:
   ```bash
   git checkout -b feature/my-feature
   # or for bug fixes:
   git checkout -b fix/my-bugfix
   ```

3. Make your changes, following the coding standards below

4. Test your changes in WeChat DevTools simulator

5. Commit and push:
   ```bash
   git add -A
   git commit -m "feat: describe your change"
   git push origin feature/my-feature
   ```

6. Open a Pull Request on GitHub

## Coding Standards

### JavaScript (ES6+)

- Use `const` by default; use `let` only when reassignment is needed
- Prefer arrow functions for callbacks
- Use template literals over string concatenation
- Use destructuring for objects and arrays
- Always use strict equality (`===` / `!==`)

### Naming Conventions

- **Files**: `kebab-case` (e.g., `trip-service.js`, `date-utils.js`)
- **Variables/Functions**: `camelCase` (e.g., `getTripById`, `formatMoney`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `STORAGE_KEY`, `MOCK_TRIPS`)
- **Components**: `kebab-case` directories with matching file names

### WeChat Mini Program Conventions

- Each component must have all 4 files: `.js`, `.json`, `.wxml`, `.wxss`
- Use Behaviors for shared logic (e.g., `theme-behavior`)
- Keep pages lightweight; move reusable logic to services or components

### Documentation

- All public functions must have JSDoc comments
- Include `@param`, `@returns`, and `@module` tags
- Add inline comments for complex logic

## Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Code style (formatting, missing semicolons, etc.) |
| `refactor` | Code refactoring without behavior change |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `chore` | Build process, tooling, or dependencies |
| `ci` | CI/CD configuration |

### Examples

```
feat(budget): add multi-currency support
fix(food-service): correct getFoodByTripId filtering
docs(readme): update installation instructions
chore: bump version to v1.9.0
```

## Pull Request Process

1. Ensure your branch is rebased on the latest `main`
2. Update documentation if your change affects the public API
3. Add or update tests if applicable
4. Fill out the PR template completely
5. Link the related issue (if any)
6. Wait for CI checks to pass
7. Request review from a maintainer

### PR Checklist

- [ ] Code follows the project's coding standards
- [ ] JSDoc comments added for new public functions
- [ ] Tested in WeChat DevTools simulator
- [ ] CHANGELOG.md updated (for user-facing changes)
- [ ] No console errors or warnings

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Thank you for making Voyager AI better!
