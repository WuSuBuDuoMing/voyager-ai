# Changelog

All notable changes to Voyager AI will be documented in this file.

## [1.9.0] - 2026-06-18

### Added
- CONTRIBUTING.md with comprehensive contribution guidelines (workflow, coding standards, commit conventions)
- Enhanced README.md as English-first documentation with complete Table of Contents, Features, Installation, Usage, Contributing, Security, and License sections
- Enhanced JSDoc comments with @fileoverview, @module, @version, @license, and @author tags in app.js
- CI workflow now validates project structure (services, utils, components directories) and checks for documentation files
- CI workflow includes Node.js setup step for consistency

### Changed
- Version bumped to v1.9.0 in app.js and project.config.json
- README badge now shows v1.9.0 and includes CI status badge
- Inline comments in app.js improved from Chinese-only to English JSDoc for international readability

## [1.8.0] - 2026-06-17

### Added
- Full JSDoc coverage for all 8 service modules (trip, itinerary, budget, packing, diary, food, place, mock-ai)
- Full JSDoc coverage for all 6 utility modules (date-utils, money-utils, trip-utils, storage-utils, mock-utils, theme-behavior)
- @module, @param, @returns, @private, @type tags on all public and private functions

### Changed
- Improved code documentation consistency across the entire codebase

## [1.7.0] - 2026-06-17

### Added
- SECURITY.md improvements with clearer vulnerability reporting instructions
- CODE_OF_CONDUCT.md based on Contributor Covenant v2.1

### Changed
- README.md project structure section updated with accurate file counts
- Service layer documentation refined with better descriptions

## [1.6.0] - 2026-06-16

### Changed
- Added CODE_OF_CONDUCT.md, FUNDING.yml, CODEOWNERS, enhanced Issue/PR templates

## [1.4.0] - 2026-06-14

### Changed
- Security policy, documentation enhancements, open-source best practices

## [1.2.0] - 2026-06-14

### Changed
- Local optimization and performance improvements
- Documentation enhancement across project
- Open-source infrastructure updates

## [1.1.0] - 2026-06-11

### Fixed
- Fixed `foodService.getFoods()` call in food page — now correctly calls `getFoodByTripId()`
- Fixed `diaryService.getDiaries()` call in diary page — now correctly calls `getDiariesByTripId()` / `getAllDiaries()`
- Fixed `diaryService.addDiary()` call in diary page — now correctly calls `createDiary()`
- Fixed corrupted character in itinerary-service.js Kyoto food template (`�的寿司` → `新鲜寿司`)
- Moved inline `require('../data/mock-trips')` in budget-service.js to top-level import

### Added
- Comprehensive JSDoc comments for all public functions in services/ and utils/
- Unit tests for itinerary generation, budget tracking, and luggage checklist services
- CHANGELOG.md for version tracking
- Travel planning data model documentation in README

### Changed
- Updated README.md with accurate page count (11 pages), service count (8 services), and complete service API documentation
- Updated README.zh-CN.md with complete service layer documentation and data model section
- Bumped version to v1.1.0 in app.js and project.config.json

## [1.0.0] - 2026-06-10

### Added
- Initial open-source release
- 11 pages: dashboard, trip management, itinerary, budget, packing, food, diary, places, profile
- 11 reusable components
- 8 service modules with mock data
- 6 utility modules
- Dark mode support (light/dark/auto)
- Comprehensive test suite
- Full documentation (PRD, architecture, mock data design)
