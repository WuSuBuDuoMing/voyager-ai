<div align="center">

# 🧳 Voyager AI

### AI-Powered Travel Planning Assistant

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![WeChat Mini Program](https://img.shields.io/badge/Platform-WeChat%20Mini%20Program-07C160?logo=wechat&logoColor=white)]()

**[中文文档](README.zh-CN.md)**

</div>

---

## 📖 Overview

Voyager AI is an intelligent travel planning WeChat Mini Program. Generate complete itineraries from a single sentence, track budgets, manage packing lists, and keep a travel diary — all in one app.

## ✨ Features

- 🤖 **AI Itinerary Generation** — Describe your trip in one sentence, get a full day-by-day plan
- 💰 **Budget Management** — Track expenses with overspend alerts
- 🧳 **Packing Checklist** — Smart luggage management with categories
- 📍 **Place Management** — Curate attractions and food spots
- 📝 **Travel Diary** — Record memories with photos and text
- 🌙 **Dark Mode** — Easy on the eyes for night browsing

## 🏗 Tech Stack

- WeChat Mini Program (Native)
- JavaScript ES6+
- Mock Service Layer (swappable to real backend)

## 📦 Installation

### WeChat Mini Program

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
├── pages/                           # 10 pages
├── components/                      # 10 reusable components
├── services/                        # 8 service modules
├── data/                            # Mock data
├── utils/                           # Utility functions
├── tests/                           # Test cases
└── docs/                            # Documentation
```

## 📄 License

MIT License — see [LICENSE](LICENSE)
