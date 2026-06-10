# 技术架构文档

> **项目名称**：AI 旅行计划助手  
> **版本**：v1.0  
> **更新日期**：2026-06-08

---

## 1. 技术选型

### 1.1 核心技术栈

| 层级 | 技术选择 | 选型理由 |
|------|---------|---------|
| **开发框架** | 微信小程序原生框架 | 无需额外依赖、包体积小、原生性能最佳 |
| **模板语言** | WXML | 微信原生模板，支持数据绑定、条件渲染、列表渲染 |
| **样式方案** | WXSS + CSS Variables | CSS Variables 实现主题切换，无需 JS 运行时开销 |
| **脚本语言** | JavaScript ES6+ | 使用箭头函数、解构、模板字符串、async/await |
| **组件化** | Component API + Behavior | 原生组件系统，Behavior 实现逻辑复用 |
| **状态管理** | App.globalData + 本地存储 | 轻量方案，满足单机数据持久化需求 |
| **数据层** | Mock 数据 + wx.Storage | 开发阶段 Mock 展示，Storage 实现 CRUD 持久化 |

### 1.2 不使用第三方库的理由

本项目刻意保持零外部依赖，原因如下：

1. **包体积控制**：小程序代码包上限 2MB，零依赖确保极小体积
2. **加载性能**：无 npm 包解析，启动速度更快
3. **维护成本**：无版本兼容性问题，降低维护负担
4. **原生体验**：使用原生 API 确保最佳兼容性和性能

### 1.3 开发工具

| 工具 | 版本要求 | 用途 |
|------|---------|------|
| 微信开发者工具 | >= 1.06 | 开发、调试、预览、上传 |
| 基础库 | >= 3.3.4 | 运行环境 |
| VS Code + WXML 插件 | 最新 | 代码编辑 |
| Git | >= 2.0 | 版本控制 |

---

## 2. 目录结构

```
ai-travel-assistant/
│
├── app.js                          # 应用入口
│   ├── onLaunch()                  #   生命周期：初始化主题、存储、系统信息
│   ├── getSystemInfo()             #   获取设备信息
│   ├── initTheme()                 #   初始化暗黑模式偏好
│   ├── initStorage()               #   首次使用初始化
│   └── toggleDarkMode()            #   全局暗黑模式切换
│
├── app.json                        # 应用配置
│   ├── pages[]                     #   11 个页面路由注册
│   ├── tabBar                      #   4 个底部 Tab（首页/旅行/日记/我的）
│   └── window                      #   全局窗口样式
│
├── app.wxss                        # 全局样式（~370 行）
│   ├── CSS Variables              #   浅色/暗黑主题变量定义
│   ├── 基础组件样式               #   card/btn/tag/divider 等
│   ├── 工具类                     #   flex/spacing/font/text 工具
│   ├── 动画                       #   fadeIn/slideUp/pulse
│   └── 布局组件                   #   search-bar/empty-state/loading
│
├── assets/icons/                   # tabBar 图标资源
│
├── components/                     # 11 个自定义组件
│   ├── trip-card/                  #   旅行卡片（含完整 4 文件）
│   ├── day-plan-card/              #   每日行程卡片（含完整 4 文件）
│   ├── place-card/                 #   景点卡片（含 3 文件）
│   ├── budget-card/                #   预算卡片（待实现）
│   ├── food-item/                  #   美食项（待实现）
│   ├── packing-item/               #   行李项（待实现）
│   ├── diary-card/                 #   日记卡片（待实现）
│   ├── ai-suggestion-card/         #   AI 建议卡片（待实现）
│   ├── progress-ring/              #   环形进度条（待实现）
│   ├── empty-state/                #   空状态（待实现）
│   └── loading-state/              #   加载状态（待实现）
│
├── data/
│   └── mock-trips.js               # 15 条模拟行程数据
│
├── pages/                          # 11 个页面
│   ├── index/                      #   首页（仪表盘）
│   ├── create-trip/                #   创建旅行
│   ├── trips/                      #   旅行列表
│   ├── trip-detail/                #   旅行详情
│   ├── day-plan/                   #   每日行程
│   ├── places/                     #   景点管理
│   ├── budget/                     #   预算管理
│   ├── packing/                    #   行李清单
│   ├── food/                       #   美食攻略
│   ├── diary/                      #   旅行日记
│   └── profile/                    #   个人中心
│
├── services/                       # 服务层
│   └── place-service.js            #   景点 CRUD 服务（async/await）
│
├── utils/                          # 6 个工具模块
│   ├── date-utils.js               #   日期工具（12 个函数）
│   ├── money-utils.js              #   金额工具（9 个函数）
│   ├── trip-utils.js               #   行程工具（11 个函数）
│   ├── storage-utils.js            #   存储工具（6 个函数）
│   ├── mock-utils.js               #   模拟工具（7 个函数）
│   └── theme-behavior.js           #   暗黑模式 Behavior
│
└── tests/
    └── test-cases.js               # 自动化测试用例
```

---

## 3. 架构分层

### 3.1 五层架构

```
╔═══════════════════════════════════════════════════════╗
║                     页面层 (Page Layer)                 ║
║                                                       ║
║  index | create-trip | trips | trip-detail | day-plan ║
║  places | budget | packing | food | diary | profile   ║
║                                                       ║
║  职责：用户交互、事件处理、数据展示、页面跳转            ║
╠═══════════════════════════════════════════════════════╣
║                   组件层 (Component Layer)              ║
║                                                       ║
║  trip-card | day-plan-card | place-card | budget-card  ║
║  food-item | packing-item | diary-card | progress-ring ║
║  ai-suggestion-card | empty-state | loading-state      ║
║                                                       ║
║  职责：UI 封装、属性接收、事件派发、样式隔离            ║
╠═══════════════════════════════════════════════════════╣
║                    服务层 (Service Layer)               ║
║                                                       ║
║  place-service.js  （景点 CRUD、收藏、访问状态）        ║
║                                                       ║
║  职责：业务逻辑封装、数据 CRUD、状态管理                ║
╠═══════════════════════════════════════════════════════╣
║                    工具层 (Utility Layer)               ║
║                                                       ║
║  date-utils  |  money-utils  |  trip-utils             ║
║  storage-utils  |  mock-utils  |  theme-behavior       ║
║                                                       ║
║  职责：通用计算、格式化、存储封装、主题管理              ║
╠═══════════════════════════════════════════════════════╣
║                     数据层 (Data Layer)                 ║
║                                                       ║
║  mock-trips.js          （预置模拟数据）                 ║
║  wx.setStorageSync      （本地持久化存储）              ║
║  wx.getStorageSync      （本地数据读取）                ║
║                                                       ║
║  职责：数据持久化、Mock 数据初始化、数据隔离             ║
╚═══════════════════════════════════════════════════════╝
```

### 3.2 各层职责说明

#### 页面层

- 每个页面由 4 个文件组成：`.js`（逻辑）、`.json`（配置）、`.wxml`（模板）、`.wxss`（样式）
- 页面负责接收用户输入、调用工具层进行计算、调用服务层进行数据读写
- 页面通过 `data` 和 `setData()` 驱动视图更新
- 页面间通过 `wx.navigateTo()` / `wx.switchTab()` 进行导航

#### 组件层

- 每个组件封装独立的 UI 展示逻辑
- 通过 `properties` 接收外部数据
- 通过 `triggerEvent()` 向父组件派发事件
- 组件内部可使用 `observers` 监听属性变化并计算衍生数据（如评分星星）
- 通过 `Component({})` 构造器创建

#### 服务层

- 封装业务级别的数据操作逻辑
- 提供 async/await 接口（基于 Promise）
- 负责 Mock 数据的初始加载和存储
- 后续可无缝替换为真实 API 调用

#### 工具层

- 纯函数集合，无副作用（storage-utils 和 theme-behavior 除外）
- 通过 `module.exports` 导出
- 使用 JSDoc 注释标注参数类型和返回值
- 可在页面、组件、服务层任意层级调用

#### 数据层

- `mock-trips.js`：15 条预置行程数据，用于首次使用时初始化
- `wx.Storage`：本地持久化存储，存储键管理见 storage-utils
- 数据隔离：每个行程通过 `tripId` 关联子数据

---

## 4. 数据流图

### 4.1 页面级数据流

```
┌─────────────────────────────────────────────────┐
│                    Page (页面)                     │
│                                                   │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐   │
│  │  Event    │───>│  Page    │───>│  setData  │   │
│  │  Handler  │    │  Logic   │    │  Update   │   │
│  └──────────┘    └────┬─────┘    └────┬─────┘   │
│                       │               │          │
│                  ┌────┴─────┐    ┌────┴─────┐   │
│                  │  Utils   │    │  Template │   │
│                  │  Service │    │  Render   │   │
│                  └────┬─────┘    └──────────┘   │
│                       │                          │
│                  ┌────┴─────┐                    │
│                  │ wx.Storage│                    │
│                  └──────────┘                    │
└─────────────────────────────────────────────────┘
```

### 4.2 组件通信流

```
Parent Page                    Child Component
┌──────────┐                  ┌──────────────┐
│          │  properties      │              │
│   Page   │ ──────────────> │  Component   │
│   data   │                  │   data       │
│          │ <────────────── │              │
│          │  triggerEvent    │              │
└──────────┘                  └──────────────┘
```

### 4.3 主题切换数据流

```
用户点击切换
     │
     v
app.toggleDarkMode()
     │
     ├──> app.globalData.isDarkMode = !isDarkMode
     │
     ├──> setStorage('theme_mode', 'dark'/'light')
     │
     ├──> pages.forEach(page => page.onThemeChange())
     │
     └──> theme-behavior (其他组件)
           │
           └──> setData({ isDarkMode: isDark })
                 │
                 └──> WXML: class="{{isDarkMode ? 'dark' : ''}}"
                       │
                       └──> WXSS: page.dark { --bg-primary: ... }
```

---

## 5. 组件通信方式

### 5.1 父传子：Properties

```javascript
// 父页面 WXML
<trip-card trip="{{currentTrip}}" />

// 子组件 JS
Component({
  properties: {
    trip: {
      type: Object,
      value: {}    // 默认值
    }
  }
})
```

### 5.2 子传父：triggerEvent

```javascript
// 子组件 JS
Component({
  methods: {
    handleTap() {
      this.triggerEvent('onTap', {
        id: this.data.trip.id,
        trip: this.data.trip
      })
    }
  }
})

// 父页面 WXML
<trip-card bind:onTap="handleTripTap" />
```

### 5.3 全局通信：App.globalData

```javascript
// 读取全局数据
const app = getApp()
const isDark = app.globalData.isDarkMode

// 写入全局数据
app.globalData.isDarkMode = true

// 通知所有页面
const pages = getCurrentPages()
pages.forEach(page => {
  if (page.onThemeChange) {
    page.onThemeChange(true)
  }
})
```

### 5.4 跨组件复用：Behavior

```javascript
// theme-behavior.js
module.exports = Behavior({
  data: { isDarkMode: false },

  lifetimes: {
    attached() {
      this.setData({
        isDarkMode: app.globalData.isDarkMode
      })
    }
  },

  pageLifetimes: {
    show() {
      // 每次显示时同步状态
      if (this.data.isDarkMode !== app.globalData.isDarkMode) {
        this.setData({ isDarkMode: app.globalData.isDarkMode })
      }
    }
  },

  methods: {
    onThemeChange(isDark) {
      this.setData({ isDarkMode: isDark })
    }
  }
})
```

---

## 6. 状态管理策略

### 6.1 状态层级

| 层级 | 存储位置 | 生命周期 | 示例 |
|------|---------|---------|------|
| **临时状态** | Page/Component `data` | 页面/组件生命周期 | 表单输入值、loading 状态 |
| **会话状态** | `app.globalData` | 应用生命周期 | isDarkMode、systemInfo |
| **持久状态** | `wx.Storage` | 应用重启后保留 | 旅行数据、用户偏好、统计 |

### 6.2 数据流原则

1. **单向数据流**：数据从 Utils/Service 读取 -> 写入 Page data -> 渲染到 Template
2. **就近更新**：只更新发生变化的数据，使用精确的 `setData` 路径
3. **最小状态**：Page data 只存储视图需要的数据，衍生数据在渲染时计算

### 6.3 Storage 键名规范

| 键名 | 说明 | 数据类型 |
|------|------|---------|
| `trips` | 所有旅行列表 | `Trip[]` |
| `places` | 所有景点列表 | `Place[]` |
| `budgets` | 所有预算记录 | `BudgetItem[]` |
| `packing_lists` | 所有行李清单 | `PackingItem[]` |
| `foods` | 所有美食记录 | `Food[]` |
| `diaries` | 所有日记 | `Diary[]` |
| `theme_mode` | 主题偏好 | `'light'` / `'dark'` / `'auto'` |
| `is_first_use` | 首次使用标记 | `boolean` |
| `user_stats` | 用户统计数据 | `UserStats` |

---

## 7. 暗黑模式实现方案

### 7.1 技术方案

采用 **CSS Variables + Class 切换** 方案，这是微信小程序中实现暗黑模式的最佳实践。

#### 方案优势

- **零闪烁**：CSS 变量由浏览器引擎直接处理，无需 JS 计算
- **全局覆盖**：一处定义，所有使用变量的样式自动适配
- **性能优越**：仅切换 `<page>` 标签的 class，触发 CSS 重绘而非重排
- **易于维护**：新增颜色时只需在变量表中添加

### 7.2 实现细节

#### 第一步：定义主题变量

```css
/* 浅色主题（默认） */
page {
  --bg-primary: #F6F7FB;
  --bg-secondary: #FFFFFF;
  --bg-card: #FFFFFF;
  --text-primary: #1A1A2E;
  --text-secondary: #6B7280;
  --text-hint: #9CA3AF;
  --border-color: #E5E7EB;
  --shadow-color: rgba(0, 0, 0, 0.08);
  /* ... */
}

/* 暗黑主题 */
page.dark {
  --bg-primary: #0F172A;
  --bg-secondary: #1E293B;
  --bg-card: #1E293B;
  --text-primary: #F1F5F9;
  --text-secondary: #94A3B8;
  --text-hint: #64748B;
  --border-color: #334155;
  --shadow-color: rgba(0, 0, 0, 0.3);
  /* ... */
}
```

#### 第二步：页面绑定 class

```xml
<view class="page {{isDarkMode ? 'dark' : ''}}">
  <!-- 页面内容 -->
</view>
```

#### 第三步：同步暗黑状态

```javascript
// 方式一：使用 theme-behavior（推荐）
const themeBehavior = require('../../utils/theme-behavior')
Page({
  behaviors: [themeBehavior],
  // isDarkMode 自动同步
})

// 方式二：手动同步
const app = getApp()
Page({
  data: { isDarkMode: false },
  onShow() {
    this.setData({
      isDarkMode: app.globalData.isDarkMode
    })
  }
})
```

### 7.3 主题变量清单

| 变量名 | 浅色值 | 暗色值 | 用途 |
|--------|--------|--------|------|
| `--bg-primary` | `#F6F7FB` | `#0F172A` | 页面主背景 |
| `--bg-secondary` | `#FFFFFF` | `#1E293B` | 次级背景 |
| `--bg-card` | `#FFFFFF` | `#1E293B` | 卡片背景 |
| `--text-primary` | `#1A1A2E` | `#F1F5F9` | 主要文字 |
| `--text-secondary` | `#6B7280` | `#94A3B8` | 次要文字 |
| `--text-hint` | `#9CA3AF` | `#64748B` | 提示文字 |
| `--border-color` | `#E5E7EB` | `#334155` | 边框颜色 |
| `--shadow-color` | `rgba(0,0,0,0.08)` | `rgba(0,0,0,0.3)` | 阴影颜色 |
| `--brand-primary-light` | `#E8F8EF` | `#064E3B` | 品牌色浅色 |

---

## 8. 本地缓存策略

### 8.1 存储架构

```
wx.Storage
├── trips            → Trip[]           // 所有旅行数据
├── places           → Place[]          // 所有景点数据
├── budgets          → BudgetItem[]     // 所有预算数据
├── packing_lists    → PackingItem[]    // 所有行李数据
├── foods            → Food[]           // 所有美食数据
├── diaries          → Diary[]          // 所有日记数据
├── theme_mode       → string           // 主题偏好
├── is_first_use     → boolean          // 首次使用标记
└── user_stats       → UserStats        // 用户统计
```

### 8.2 读写策略

| 操作 | API | 说明 |
|------|-----|------|
| 同步读取 | `wx.getStorageSync(key)` | 通过 storage-utils 封装 |
| 同步写入 | `wx.setStorageSync(key, value)` | 通过 storage-utils 封装 |
| 同步删除 | `wx.removeStorageSync(key)` | 通过 storage-utils 封装 |
| 同步清空 | `wx.clearStorageSync()` | 通过 storage-utils 封装 |

### 8.3 错误处理

所有 Storage 操作均通过 `try-catch` 包裹：

```javascript
function getStorage(key) {
  try {
    const value = wx.getStorageSync(key)
    return value || null
  } catch (e) {
    console.error(`[StorageUtils] 读取存储失败: ${key}`, e)
    return null
  }
}
```

### 8.4 数据初始化

首次使用时（`is_first_use` 为 null）：

1. 设置 `is_first_use = true`
2. 设置 `theme_mode = 'auto'`
3. 初始化 `user_stats` 为零值
4. 加载 `mock-trips.js` 中的 15 条行程数据

### 8.5 存储空间管理

- 微信小程序本地存储上限：10MB
- `getStorageInfo()` 可查询当前占用量
- 提供 `clearStorage()` 清空所有数据的接口
- 预估数据量：15 条行程 + 关联数据约 200KB

---

## 9. 错误处理策略

### 9.1 分层错误处理

| 层级 | 错误类型 | 处理方式 |
|------|---------|---------|
| **数据层** | Storage 读写失败 | try-catch 捕获，返回 null/false，console.error 记录 |
| **工具层** | 参数异常/计算错误 | 输入校验 + 默认值返回，避免 throw |
| **服务层** | 数据不存在/操作失败 | 返回 null/false，调用方自行判断 |
| **组件层** | 属性缺失/渲染异常 | 组件内部提供默认值 |
| **页面层** | 网络请求失败/数据异常 | 显示错误提示 + 空状态 fallback |

### 9.2 防御性编程规范

```javascript
// 1. 参数校验
function getBudgetUsagePercent(spent, total) {
  if (!total || total <= 0) return 0  // 防止除零
  return Math.round((spent / total) * 100)
}

// 2. 空值保护
function getTripProgress(trip) {
  if (!trip) return 0  // 空值保护
  // ...
}

// 3. 默认值处理
function formatMoney(amount, currency = '¥') {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return `${currency}0`
  }
  // ...
}

// 4. 类型安全
function ensureDate(input) {
  if (input instanceof Date) return new Date(input.getTime())
  if (typeof input === 'string') return new Date(input.replace(/-/g, '/'))
  if (typeof input === 'number') return new Date(input)
  return new Date()  // 兜底：返回当前日期
}
```

### 9.3 日志规范

| 级别 | 用途 | 示例 |
|------|------|------|
| `console.error` | 运行时错误、存储操作失败 | `[StorageUtils] 读取存储失败` |
| `console.warn` | 异常但不致命的情况 | `app.toggleDarkMode 方法不存在` |
| `console.log` | 开发调试信息 | 正常调试输出 |

---

## 10. 性能优化方案

### 10.1 小程序原生优化

| 优化项 | 实现方式 | 说明 |
|--------|---------|------|
| **懒加载** | `lazyCodeLoading: "requiredComponents"` | app.json 中配置按需注入 |
| **代码分包** | 将非首屏页面放入分包 | 旅行列表、日记等放入 subpackages |
| **图片懒加载** | `<image lazy-load>` | 列表图片延迟加载 |
| **虚拟列表** | scroll-view + 按需渲染 | 长列表优化 |

### 10.2 渲染优化

| 优化项 | 实现方式 | 说明 |
|--------|---------|------|
| **精确 setData** | 使用路径而非整个对象 | `setData({ 'trip.spent': 100 })` |
| **减少嵌套** | 扁平化 data 结构 | 避免深层嵌套的对象 |
| **条件渲染** | `wx:if` 按需渲染 | 空状态时不渲染复杂组件 |
| **动画优化** | CSS transitions + transform | 避免触发 layout 的动画属性 |

### 10.3 数据优化

| 优化项 | 实现方式 | 说明 |
|--------|---------|------|
| **数据缓存** | 首次读取后存入内存 | 避免频繁读 Storage |
| **批量写入** | 多项修改后一次性写入 | 减少 Storage 写入次数 |
| **深拷贝** | mock-utils.deepClone | 操作不影响原始数据 |
| **按需加载** | Mock 数据延迟模拟 | delay() 模拟网络延迟 |

### 10.4 包体积优化

| 优化项 | 实现方式 | 说明 |
|--------|---------|------|
| **无第三方依赖** | 零 npm 包 | 大幅减小包体积 |
| **ES6 转 ES5** | 编译时转换 | 兼容性保障 |
| **CSS 压缩** | minifyWXSS: true | 编译时压缩 |
| **WXML 压缩** | minifyWXML: true | 编译时压缩 |
| **JS 压缩** | minified: true | 编译时压缩 |

---

## 附录：关键 API 清单

### wx.Storage API

| 方法 | 说明 |
|------|------|
| `wx.setStorageSync(key, data)` | 同步写入 |
| `wx.getStorageSync(key)` | 同步读取 |
| `wx.removeStorageSync(key)` | 同步删除 |
| `wx.clearStorageSync()` | 同步清空 |
| `wx.getStorageInfoSync()` | 获取存储信息 |

### wx.System API

| 方法 | 说明 |
|------|------|
| `wx.getSystemInfoSync()` | 获取系统信息（含主题模式） |
| `wx.navigateTo({ url })` | 保留当前页，跳转新页面 |
| `wx.switchTab({ url })` | 切换 Tab 页面 |
| `wx.navigateBack()` | 返回上一页 |
| `wx.showToast({ title })` | 显示轻提示 |
| `wx.showModal({ title, content })` | 显示模态对话框 |
| `wx.showLoading({ title })` | 显示加载提示 |
