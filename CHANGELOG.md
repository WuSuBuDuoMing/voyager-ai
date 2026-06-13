# Changelog

All notable changes to Voyager AI will be documented in this file.

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
