# ✈️ AI 旅行计划助手

> **一句话生成完美旅行，从行程到预算到行李，全智能规划。**

一款基于微信小程序的智能旅行规划应用，帮助用户轻松创建、管理和执行旅行计划。支持 AI 智能行程生成、预算管理、行李清单、美食攻略、旅行日记等功能，并提供完整的暗黑模式体验。

---

## ✨ 功能特性

### 🗂️ 旅行管理
- 📝 创建和编辑旅行计划（目的地、日期、人数、风格、预算）
- 📋 旅行列表查看，支持状态筛选（规划中 / 即将出发 / 行程中 / 已结束）
- 🔍 按目的地名称搜索旅行
- 🗑️ 删除旅行计划（二次确认）

### 🤖 AI 智能行程
- ✨ 一句话描述需求，自动生成每日行程安排
- 📅 每日行程卡片展示（上午 / 下午 / 晚间 三时段）
- 💰 预估每日费用和交通方式
- 🔄 支持重新生成行程

### 💰 预算管理
- 📊 预算总览，已花 / 总计 / 剩余一目了然
- ➕ 添加预算消费记录（分类：交通、住宿、餐饮、门票等）
- 🏷️ 9 大消费分类，带 emoji 图标
- ⚠️ 预算超支提醒（70% 警告 / 90% 危险 / 超支红色提示）
- 📈 预算进度条可视化

### 🧳 行李清单
- ✅ 预置分类行李清单（衣物、洗漱、电子设备、证件等）
- ☑️ 勾选已打包 / 取消勾选
- ➕ 添加自定义行李项
- 🗑️ 删除行李项
- 📊 打包进度百分比展示（环形进度条）

### 🍜 美食攻略
- 🍽️ 美食列表展示（名称、图片、价格、评分）
- ❤️ 收藏 / 取消收藏美食
- ✅ 标记已吃 / 未吃
- 🏷️ 美食标签筛选

### 📍 景点管理
- 🏛️ 景点卡片展示（图片、名称、类型、评分、票价）
- ❤️ 收藏 / 取消收藏景点
- ✅ 标记已去 / 未去
- ⭐ 五星评分可视化

### 📔 旅行日记
- ✏️ 撰写旅行日记（文字内容、心情标签）
- 🎭 8 种心情选择（兴奋、开心、放松、惊喜等）
- 📝 编辑已写日记
- 🗑️ 删除日记

### 🌙 暗黑模式
- 🌓 支持浅色 / 深色 / 跟随系统三种模式
- 🎨 CSS Variables 全局主题切换，无需刷新
- 💾 用户偏好本地持久化

### 🏠 首页仪表盘
- 👋 个性化问候和日期展示
- 📊 旅行统计卡片（总旅行数、总天数、已访景点、总预算）
- ⏰ 即将出发旅行倒计时
- 📋 今日行程速览
- ✈️ 最近旅行列表
- 💰 预算概览
- 📦 打包进度展示
- ⚡ 快捷操作网格

---

## 📸 截图

> 截图将在后续版本中补充，敬请期待。
>
> 预期展示：首页仪表盘、旅行列表、AI 行程生成、预算管理、行李清单、暗黑模式对比等页面。

---

## 🛠️ 技术栈

| 技术 | 说明 |
|------|------|
| **微信小程序原生框架** | 使用 WXML / WXSS / JS 原生开发，无第三方 UI 框架依赖 |
| **ES6+** | 使用 let/const、箭头函数、解构赋值、async/await、模板字符串等现代语法 |
| **CSS Variables** | 通过 CSS 自定义属性实现全局暗黑模式主题切换 |
| **Behavior** | 使用微信小程序 Behavior 机制实现跨组件逻辑复用（如 theme-behavior） |
| **Mock 数据层** | 完整的模拟数据体系，支持开发调试和演示展示 |
| **LocalStorage** | 基于 wx.setStorageSync / wx.getStorageSync 的本地数据持久化 |

---

## 📁 项目结构

```
ai-travel-assistant/
├── app.js                          # 应用入口，全局初始化（主题、存储、系统信息）
├── app.json                        # 应用配置（页面路由、tabBar、窗口样式）
├── app.wxss                        # 全局样式（CSS Variables、通用组件样式、动画）
├── project.config.json             # 微信开发者工具项目配置
├── sitemap.json                    # 小程序搜索配置
│
├── assets/
│   └── icons/                      # tabBar 图标资源
│
├── components/                     # 自定义组件
│   ├── ai-suggestion-card/         # AI 建议卡片组件
│   ├── budget-card/                # 预算卡片组件
│   ├── day-plan-card/              # 每日行程卡片组件
│   │   ├── day-plan-card.js        # 组件逻辑（时间段展示、点击事件）
│   │   ├── day-plan-card.json      # 组件配置
│   │   ├── day-plan-card.wxml      # 组件模板（早/中/晚三时段布局）
│   │   └── day-plan-card.wxss      # 组件样式
│   ├── diary-card/                 # 旅行日记卡片组件
│   ├── empty-state/                # 空状态占位组件
│   ├── food-item/                  # 美食列表项组件
│   ├── loading-state/              # 加载状态组件
│   ├── packing-item/               # 行李清单项组件
│   ├── place-card/                 # 景点卡片组件
│   │   ├── place-card.js           # 组件逻辑（评分星星、收藏/访问事件）
│   │   ├── place-card.json         # 组件配置
│   │   └── place-card.wxml         # 组件模板
│   ├── progress-ring/              # 环形进度条组件
│   └── trip-card/                  # 旅行卡片组件
│       ├── trip-card.js            # 组件逻辑（预算百分比、状态映射）
│       ├── trip-card.json          # 组件配置
│       ├── trip-card.wxml          # 组件模板（封面图、预算进度、打包进度）
│       └── trip-card.wxss          # 组件样式
│
├── data/
│   └── mock-trips.js               # 15 条模拟行程数据（覆盖多种目的地和状态）
│
├── docs/                           # 项目文档
│
├── pages/                          # 页面
│   ├── index/                      # 首页（仪表盘、统计、倒计时、快捷操作）
│   ├── create-trip/                # 创建旅行页
│   ├── trips/                      # 旅行列表页
│   ├── trip-detail/                # 旅行详情页
│   ├── day-plan/                   # 每日行程页
│   ├── places/                     # 景点管理页
│   ├── budget/                     # 预算管理页
│   ├── packing/                    # 行李清单页
│   ├── food/                       # 美食攻略页
│   ├── diary/                      # 旅行日记页
│   └── profile/                    # 个人中心页
│
├── services/
│   └── place-service.js            # 景点服务（CRUD、收藏、访问状态管理）
│
├── tests/                          # 测试文件
│   └── test-cases.js               # 自动化测试用例
│
└── utils/                          # 工具模块
    ├── date-utils.js               # 日期工具（格式化、计算、倒计时、状态判断）
    ├── money-utils.js              # 金额工具（格式化、预算状态、超支判断）
    ├── trip-utils.js               # 行程工具（进度计算、标签映射、摘要生成）
    ├── storage-utils.js            # 存储工具（封装 wx.Storage API）
    ├── mock-utils.js               # 模拟工具（ID 生成、随机数、深拷贝、延迟）
    └── theme-behavior.js           # 主题 Behavior（暗黑模式状态同步）
```

---

## 🚀 快速开始

### 环境要求

- **微信开发者工具** >= 1.06.2301010
- **基础库版本** >= 3.3.4

### 安装运行

```bash
# 1. 克隆项目
git clone https://github.com/your-username/ai-travel-assistant.git

# 2. 打开微信开发者工具

# 3. 导入项目
#    - 选择「导入项目」
#    - 目录选择：ai-travel-assistant/
#    - AppID：填入你的小程序 AppID（或使用测试号）

# 4. 运行项目
#    - 在开发者工具中点击「编译」即可预览
#    - 支持模拟器预览和真机调试
```

---

## 🏗️ 架构概览

### 分层架构

```
┌─────────────────────────────────────────┐
│              页面层 (Pages)               │
│  index / trips / trip-detail / budget    │
│  packing / food / diary / places / ...   │
├─────────────────────────────────────────┤
│            组件层 (Components)            │
│  trip-card / day-plan-card / place-card  │
│  budget-card / food-item / packing-item  │
│  progress-ring / empty-state / ...       │
├─────────────────────────────────────────┤
│            服务层 (Services)              │
│  place-service（CRUD / 收藏 / 访问）      │
├─────────────────────────────────────────┤
│            工具层 (Utils)                 │
│  date-utils / money-utils / trip-utils   │
│  storage-utils / mock-utils              │
│  theme-behavior                          │
├─────────────────────────────────────────┤
│            数据层 (Data)                  │
│  mock-trips（15 条模拟行程数据）           │
│  wx.Storage（本地持久化存储）              │
└─────────────────────────────────────────┘
```

### 数据流

```
用户操作
  │
  v
页面 (Page)
  │
  ├── 调用 Service 层 → 数据读写
  │     │
  │     ├── Storage Utils → wx.Storage → 本地缓存
  │     │
  │     └── Mock Utils → ID 生成 / 深拷贝
  │
  ├── 调用 Utils 层 → 业务计算
  │     ├── Date Utils → 日期格式化 / 状态判断
  │     ├── Money Utils → 预算计算 / 超支判断
  │     └── Trip Utils → 进度计算 / 标签映射
  │
  ├── 渲染 Components → UI 展示
  │     ├── trip-card → 旅行卡片
  │     ├── day-plan-card → 行程卡片
  │     ├── place-card → 景点卡片
  │     └── ...
  │
  └── 主题同步 → theme-behavior → 暗黑模式切换
```

---

## 📦 组件列表

| 组件 | 说明 | 事件 |
|------|------|------|
| `trip-card` | 旅行概览卡片 | `onTap` |
| `day-plan-card` | 每日行程卡片（早/中/晚） | `onTap` |
| `place-card` | 景点信息卡片 | `onTap` / `onFavorite` / `onVisit` |
| `budget-card` | 预算消费记录卡片 | - |
| `food-item` | 美食列表项 | - |
| `packing-item` | 行李清单项 | - |
| `diary-card` | 旅行日记卡片 | - |
| `progress-ring` | 环形进度条 | - |
| `empty-state` | 空状态占位 | - |
| `loading-state` | 加载状态 | - |
| `ai-suggestion-card` | AI 建议卡片 | - |

---

## 🔧 服务层

### place-service（景点服务）

基于本地存储的景点 CRUD 服务，提供以下方法：

| 方法 | 说明 |
|------|------|
| `getPlaces(tripId)` | 获取指定行程的所有景点 |
| `addPlace(place)` | 添加新景点 |
| `updatePlace(id, updates)` | 更新景点信息 |
| `deletePlace(id)` | 删除景点 |
| `toggleFavorite(id)` | 切换收藏状态 |
| `toggleVisited(id)` | 切换已访问状态 |

---

## 🌙 暗黑模式

本项目通过 CSS Variables 实现全局暗黑模式支持，具备以下特点：

- **零闪烁切换**：使用 CSS 变量统一管理所有颜色，切换时无需重新加载页面
- **三种模式**：浅色模式 / 深色模式 / 跟随系统
- **全局同步**：通过 `theme-behavior` Behavior 实现所有页面和组件的状态同步
- **持久化**：用户偏好保存在 `wx.Storage` 中，重启应用后自动恢复
- **系统联动**：支持读取系统暗黑模式设置（`wx.getSystemInfoSync().theme`）

```css
/* 浅色主题变量 */
page {
  --bg-primary: #F6F7FB;
  --text-primary: #1A1A2E;
  --brand-primary: #07C160;
  /* ... */
}

/* 暗黑主题变量 */
page.dark {
  --bg-primary: #0F172A;
  --text-primary: #F1F5F9;
  /* ... */
}
```

---

## 🧪 测试

本项目提供可在微信开发者工具控制台运行的自动化测试用例。

### 运行测试

1. 打开微信开发者工具
2. 在控制台（Console）中执行：

```javascript
// 加载并运行测试
require('./tests/test-cases.js')
```

### 测试覆盖

- ✅ 日期工具函数（格式化、计算、解析、状态判断）
- ✅ 金额工具函数（格式化、预算状态、超支判断）
- ✅ 行程工具函数（进度计算、标签映射）
- ✅ 存储工具函数（读写、删除、清理）
- ✅ Mock 工具函数（ID 生成、随机数、深拷贝）
- ✅ 行程服务 CRUD
- ✅ 预算计算逻辑
- ✅ 行李打包进度
- ✅ AI 行程生成 Mock

---

## 🗺️ 路线图

### v1.0（当前版本）
- [x] 旅行计划创建和管理
- [x] AI 行程生成（Mock 数据）
- [x] 预算管理
- [x] 行李清单
- [x] 美食攻略
- [x] 旅行日记
- [x] 暗黑模式
- [x] 首页仪表盘

### v1.1
- [ ] 接入真实 AI 接口（ChatGPT / 文心一言）
- [ ] 照片上传和管理
- [ ] 数据导出（PDF / Excel）
- [ ] 旅行数据统计图表
- [ ] 自定义行程模板

### v1.2
- [ ] 多语言支持（中/英/日）
- [ ] 多人协作规划
- [ ] 天气 API 集成
- [ ] 汇率换算工具
- [ ] 签证信息查询

### v2.0
- [ ] 社交分享功能
- [ ] 旅行社区（攻略分享、点评）
- [ ] 原生地图集成（路线规划）
- [ ] 机票 / 酒店比价
- [ ] 旅行保险推荐

---

## 🤝 参与贡献

欢迎参与本项目的开发和改进！

### 如何贡献

1. Fork 本项目
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'feat: 添加了某个很棒的功能'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

### 开发规范

- 遵循微信小程序开发规范
- 使用 ES6+ 语法
- 组件命名使用 kebab-case
- 工具函数添加 JSDoc 注释
- 提交信息遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范

### 问题反馈

- 通过 [GitHub Issues](https://github.com/your-username/ai-travel-assistant/issues) 提交问题
- 请详细描述问题复现步骤和环境信息

---

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

```
MIT License

Copyright (c) 2026 AI Travel Assistant

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
