<div align="center">

# 🧳 Voyager AI

### AI-Powered Travel Planning Assistant

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![WeChat Mini Program](https://img.shields.io/badge/Platform-WeChat%20Mini%20Program-07C160?logo=wechat&logoColor=white)]()
[![Version](https://img.shields.io/badge/Version-v1.1.0-blue.svg)]()

**[中文文档](README.zh-CN.md)**

</div>

---

## 📖 Overview

Voyager AI is an intelligent travel planning WeChat Mini Program. Generate complete itineraries from a single sentence, track budgets, manage packing lists, and keep a travel diary — all in one app.

## ✨ Features

- 🤖 **AI Itinerary Generation** — Describe your trip in one sentence, get a full day-by-day plan
- 💰 **Budget Management** — Track expenses with overspend alerts and category breakdowns
- 🧳 **Packing Checklist** — Smart luggage management with categories and progress tracking
- 📍 **Place Management** — Curate attractions with favorites and visited status
- 🍜 **Food Guide** — Discover local cuisine with ratings, reviews, and wishlists
- 📝 **Travel Diary** — Record memories with mood, weather, photos, and step count
- 🌙 **Dark Mode** — Easy on the eyes with light/dark/system-follow modes
- 📊 **Dashboard** — At-a-glance stats, countdowns, and quick actions

## 🏗 Tech Stack

- WeChat Mini Program (Native)
- JavaScript ES6+
- CSS Variables (theming)
- Mock Service Layer (swappable to real backend)

## 📦 Installation

1. Download [WeChat DevTools](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. Clone the repository:
   ```bash
   git clone https://github.com/WuSuBuDuoMing/voyager-ai.git
   ```
3. Open WeChat DevTools → Import Project → Select the folder
4. Run in simulator

## 📁 Project Structure

```
voyager-ai/
├── app.js / app.json / app.wxss    # Entry point and config
├── pages/                           # 11 pages
├── components/                      # 11 reusable components
├── services/                        # 8 service modules
├── data/                            # Mock data (9 files)
├── utils/                           # 6 utility modules
├── tests/                           # Test cases
└── docs/                            # Documentation
```

## 🔧 Service Layer

| Service | Methods | Description |
|---------|---------|-------------|
| `trip-service` | `getAllTrips`, `getTripById`, `createTrip`, `updateTrip`, `deleteTrip`, `searchTrips`, `filterTripsByStatus`, `updateTripBudget` | Trip CRUD |
| `itinerary-service` | `getItineraryByTripId`, `getDayPlan`, `createDayPlan`, `updateDayPlan`, `deleteDayPlan`, `generateMockItinerary` | Daily itinerary CRUD + AI generation |
| `budget-service` | `getBudgetOverview`, `getExpenses`, `addExpense`, `deleteExpense`, `getCategories` | Budget tracking |
| `packing-service` | `getPackingList`, `addItem`, `toggleItem`, `deleteItem`, `getCategories` | Luggage checklist |
| `diary-service` | `getDiariesByTripId`, `getDiaryById`, `getAllDiaries`, `createDiary`, `updateDiary`, `deleteDiary`, `getMoodOptions`, `getWeatherOptions` | Travel diary |
| `food-service` | `getFoodByTripId`, `getFoodById`, `toggleFavorite`, `toggleEaten`, `addFoodReview`, `getFavoriteFoods` | Food guide |
| `place-service` | `getPlaces`, `addPlace`, `updatePlace`, `deletePlace`, `toggleFavorite`, `toggleVisited` | Place management |
| `mock-ai-service` | `generateTripPlan`, `generateRecommendations`, `generateMemoryText` | AI simulation |

## 📊 Data Model

### Trip
```js
{ id, destination, startDate, endDate, totalBudget, spentBudget, style, pace, peopleCount, notes, coverImage, status, packingProgress, diaryCount, placeCount, foodCount, createdAt }
```

### Itinerary Day
```js
{ id, tripId, dayIndex, date, title, morning[], afternoon[], evening[], estimatedCost, actualCost, transport, tips[], backupPlan }
```

### Expense
```js
{ id, tripId, category, description, amount, date }
```

### Packing Item
```js
{ id, tripId, name, category, quantity, checked }
```

### Diary
```js
{ id, tripId, title, content, date, mood, weather, cost, steps, photos[] }
```

### Food
```js
{ id, tripId, name, type, image, rating, priceRange, favorite, eaten, tags[], address, description, tips, reviews[] }
```

### Place
```js
{ id, tripId, name, type, image, rating, price, favorite, visited, address, description }
```

## 📄 License

MIT License — see [LICENSE](LICENSE)
