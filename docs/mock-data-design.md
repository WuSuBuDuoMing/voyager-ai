# Mock 数据设计文档

> **项目名称**：AI 旅行计划助手  
> **版本**：v1.0  
> **更新日期**：2026-06-08

---

## 1. 概述

本文档定义了 AI 旅行计划助手的全部 Mock 数据模型、关联关系、生成策略和异常覆盖方案。Mock 数据用于开发阶段的展示和调试，以及演示阶段的功能验证。

---

## 2. 数据模型定义

### 2.1 Trip（旅行计划）

| 字段名 | 类型 | 必填 | 说明 | 示例 |
|--------|------|------|------|------|
| `id` | string | 是 | 唯一标识 | `"trip_001"` |
| `destination` | string | 是 | 目的地名称 | `"东京"` |
| `coverImage` | string | 否 | 封面图 URL | `"https://picsum.photos/800/400?random=1"` |
| `startDate` | string | 是 | 出发日期 (YYYY-MM-DD) | `"2026-07-15"` |
| `endDate` | string | 是 | 返回日期 (YYYY-MM-DD) | `"2026-07-20"` |
| `peopleCount` | number | 是 | 出行人数 | `2` |
| `totalBudget` | number | 否 | 总预算（元） | `25000` |
| `spentBudget` | number | 否 | 已花费（元） | `8500` |
| `style` | string | 否 | 旅行风格 | `"food"` |
| `pace` | string | 否 | 行程节奏 | `"normal"` |
| `status` | string | 是 | 状态 | `"planning"` |
| `accommodation` | string | 否 | 住宿信息 | `"新宿区酒店"` |
| `notes` | string | 否 | 备注 | `"想体验正宗日本料理"` |
| `createdAt` | string | 是 | 创建时间 (ISO) | `"2026-06-01T10:00:00Z"` |
| `packingProgress` | number | 否 | 打包进度 0-100 | `65` |
| `diaryCount` | number | 否 | 日记数量 | `3` |
| `placeCount` | number | 否 | 景点数量 | `8` |
| `foodCount` | number | 否 | 美食数量 | `6` |

**status 枚举值**：

| 值 | 中文 | 说明 |
|----|------|------|
| `planning` | 规划中 | 未到出发日（距出发 7 天以上） |
| `upcoming` | 即将出发 | 距出发 7 天以内 |
| `ongoing` | 行程中 | 当前日期在出发日和返回日之间 |
| `ended` | 已结束 | 当前日期已过返回日 |

**style 枚举值**：

| 值 | 中文 | Emoji |
|----|------|-------|
| `relaxation` | 休闲度假 | 🏖️ |
| `adventure` | 探险之旅 | ⛰️ |
| `culture` | 文化体验 | 🏛️ |
| `food` | 美食之旅 | 🍜 |
| `shopping` | 购物之旅 | 🛍️ |
| `nature` | 自然探索 | 🌿 |
| `photo` | 摄影之旅 | 📸 |
| `history` | 历史文化 | 🏯 |
| `family` | 亲子游 | 👨‍👩‍👧‍👦 |
| `couple` | 情侣游 | 💑 |
| `solo` | 独自旅行 | 🧳 |
| `business` | 商务出行 | 💼 |
| `city` | 城市探索 | 🏙️ |
| `deep` | 深度游 | 🔍 |
| `leisure` | 度假休闲 | 🌴 |

---

### 2.2 Itinerary（每日行程）

| 字段名 | 类型 | 必填 | 说明 | 示例 |
|--------|------|------|------|------|
| `id` | string | 是 | 唯一标识 | `"itin_001_d1"` |
| `tripId` | string | 是 | 关联旅行 ID | `"trip_001"` |
| `dayIndex` | number | 是 | 第几天（从 1 开始） | `1` |
| `date` | string | 是 | 日期 | `"2026-07-15"` |
| `title` | string | 否 | 当日主题 | `"初识东京"` |
| `morning` | object | 否 | 上午活动 | `{ activity, location, cost }` |
| `afternoon` | object | 否 | 下午活动 | `{ activity, location, cost }` |
| `evening` | object | 否 | 晚间活动 | `{ activity, location, cost }` |
| `estimatedCost` | number | 否 | 当日预估总费用 | `3000` |
| `transport` | string | 否 | 交通方式 | `"地铁 + 步行"` |

**时段活动对象结构**：

```javascript
{
  activity: string,   // 活动描述，如 "参观浅草寺"
  location: string,   // 地点，如 "浅草寺"
  cost: number        // 预估费用，如 500
}
```

---

### 2.3 BudgetItem（预算消费）

| 字段名 | 类型 | 必填 | 说明 | 示例 |
|--------|------|------|------|------|
| `id` | string | 是 | 唯一标识 | `"budget_001"` |
| `tripId` | string | 是 | 关联旅行 ID | `"trip_001"` |
| `amount` | number | 是 | 消费金额（元） | `1500` |
| `category` | string | 是 | 消费分类 | `"transport"` |
| `note` | string | 否 | 备注说明 | `"东京飞上海机票"` |
| `date` | string | 是 | 消费日期 | `"2026-07-15"` |
| `createdAt` | string | 是 | 创建时间 | `"2026-06-01T10:30:00Z"` |

**category 枚举值**：

| 值 | 中文 | Emoji |
|----|------|-------|
| `transport` | 交通 | 🚗 |
| `accommodation` | 住宿 | 🏨 |
| `food` | 餐饮 | 🍽️ |
| `tickets` | 门票景点 | 🎫 |
| `shopping` | 购物 | 🛍️ |
| `entertainment` | 娱乐 | 🎭 |
| `insurance` | 保险 | 🛡️ |
| `visa` | 签证 | 📋 |
| `other` | 其他 | 📌 |

---

### 2.4 PackingItem（行李项）

| 字段名 | 类型 | 必填 | 说明 | 示例 |
|--------|------|------|------|------|
| `id` | string | 是 | 唯一标识 | `"pack_001"` |
| `tripId` | string | 是 | 关联旅行 ID | `"trip_001"` |
| `name` | string | 是 | 行李名称 | `"护照"` |
| `category` | string | 是 | 行李分类 | `"证件"` |
| `checked` | boolean | 是 | 是否已打包 | `false` |
| `isCustom` | boolean | 否 | 是否自定义添加 | `false` |
| `createdAt` | string | 是 | 创建时间 | `"2026-06-01T10:00:00Z"` |

**行李分类（category）**：

| 分类 | 包含物品示例 |
|------|------------|
| 证件 | 护照、身份证、签证、机票、保险单、酒店订单 |
| 衣物 | T 恤、裤子、外套、内衣、袜子、睡衣 |
| 洗漱 | 牙刷、牙膏、洗面奶、防晒霜、毛巾 |
| 电子 | 手机、充电器、充电宝、转换插头、相机 |
| 药品 | 感冒药、止泻药、创可贴、晕车药 |
| 其他 | 雨伞、水杯、零食、旅行枕、收纳袋 |

---

### 2.5 Food（美食）

| 字段名 | 类型 | 必填 | 说明 | 示例 |
|--------|------|------|------|------|
| `id` | string | 是 | 唯一标识 | `"food_001"` |
| `tripId` | string | 是 | 关联旅行 ID | `"trip_001"` |
| `name` | string | 是 | 美食名称 | `"筑地海鲜盖饭"` |
| `image` | string | 否 | 图片 URL | `"https://picsum.photos/400/300?random=201"` |
| `price` | number | 否 | 参考价格（元） | `150` |
| `rating` | number | 否 | 评分 1-5 | `4.8` |
| `description` | string | 否 | 描述 | `"新鲜刺身盖饭"` |
| `isFavorited` | boolean | 否 | 是否已收藏 | `true` |
| `isEaten` | boolean | 否 | 是否已品尝 | `false` |
| `tags` | string[] | 否 | 标签 | `["海鲜", "盖饭", "必吃"]` |
| `createdAt` | string | 是 | 创建时间 | `"2026-06-01T10:00:00Z"` |

---

### 2.6 Place（景点）

| 字段名 | 类型 | 必填 | 说明 | 示例 |
|--------|------|------|------|------|
| `id` | string | 是 | 唯一标识 | `"p1"` |
| `tripId` | string | 是 | 关联旅行 ID | `"trip_001"` |
| `name` | string | 是 | 景点名称 | `"浅草寺"` |
| `type` | string | 是 | 景点类型 | `"历史"` |
| `image` | string | 否 | 图片 URL | `"https://picsum.photos/400/300?random=101"` |
| `rating` | number | 否 | 评分 1-5 | `4.8` |
| `price` | number | 否 | 门票价格（0 = 免费） | `0` |
| `favorite` | boolean | 否 | 是否收藏 | `true` |
| `visited` | boolean | 否 | 是否已去 | `true` |
| `address` | string | 否 | 地址 | `"东京都台东区浅草2-3-1"` |
| `description` | string | 否 | 描述 | `"东京最古老的寺庙"` |
| `createdAt` | string | 是 | 创建时间 | `"2026-06-01T10:00:00Z"` |

**type 枚举值**：

| 值 | Emoji | 说明 |
|----|-------|------|
| `历史` | 🏛 | 历史古迹 |
| `拍照` | 📸 | 拍照打卡 |
| `美食` | 🍽 | 美食地点 |
| `购物` | 🛍 | 购物中心 |
| `自然` | 🌳 | 自然风景 |
| `亲子` | 🎡 | 亲子游乐 |
| `夜景` | 🌃 | 夜景观赏 |

---

### 2.7 Diary（日记）

| 字段名 | 类型 | 必填 | 说明 | 示例 |
|--------|------|------|------|------|
| `id` | string | 是 | 唯一标识 | `"diary_001"` |
| `tripId` | string | 是 | 关联旅行 ID | `"trip_001"` |
| `title` | string | 是 | 日记标题 | `"东京第一天"` |
| `content` | string | 是 | 日记正文 | `"今天终于到了东京..."` |
| `mood` | string | 否 | 心情代码 | `"excited"` |
| `date` | string | 是 | 日记日期 | `"2026-07-15"` |
| `createdAt` | string | 是 | 创建时间 | `"2026-07-15T22:00:00Z"` |
| `updatedAt` | string | 否 | 更新时间 | `"2026-07-16T08:00:00Z"` |

**mood 枚举值**：

| 值 | 中文 | Emoji |
|----|------|-------|
| `excited` | 兴奋期待 | 🤩 |
| `happy` | 开心愉悦 | 😊 |
| `relaxed` | 放松舒适 | 😌 |
| `surprised` | 惊喜赞叹 | 😲 |
| `tired` | 疲惫但满足 | 😫 |
| `nostalgic` | 怀念不舍 | 🥹 |
| `peaceful` | 宁静惬意 | ☺️ |
| `adventurous` | 充满探索欲 | 🤗 |

---

## 3. 数据关联关系

### 3.1 关系图

```
Trip (旅行计划)
 │
 ├──>> Itinerary[]     (每日行程)     [1:N, tripId]
 │       └── dayIndex                 (按天组织)
 │
 ├──>> BudgetItem[]    (预算消费)     [1:N, tripId]
 │       └── category                 (按分类组织)
 │
 ├──>> PackingItem[]   (行李清单)     [1:N, tripId]
 │       └── category                 (按分类组织)
 │
 ├──>> Food[]          (美食列表)     [1:N, tripId]
 │       ├── favorite (收藏状态)
 │       └── eaten    (已吃状态)
 │
 ├──>> Place[]         (景点列表)     [1:N, tripId]
 │       ├── favorite (收藏状态)
 │       └── visited  (已去状态)
 │
 └──>> Diary[]         (旅行日记)     [1:N, tripId]
         └── mood     (心情标签)
```

### 3.2 关联规则

| 关联 | 规则 | 说明 |
|------|------|------|
| Trip -> Itinerary | `itinerary.tripId === trip.id` | 每个旅行对应 N 天行程 |
| Trip -> BudgetItem | `budgetItem.tripId === trip.id` | 每个旅行对应 N 条消费 |
| Trip -> PackingItem | `packingItem.tripId === trip.id` | 每个旅行对应 N 件行李 |
| Trip -> Food | `food.tripId === trip.id` | 每个旅行对应 N 个美食 |
| Trip -> Place | `place.tripId === trip.id` | 每个旅行对应 N 个景点 |
| Trip -> Diary | `diary.tripId === trip.id` | 每个旅行对应 N 篇日记 |
| Itinerary -> Trip | `itinerary.date >= trip.startDate` | 行程日期在旅行日期范围内 |
| Diary -> Trip | `diary.date >= trip.startDate` | 日记日期在旅行日期范围内 |
| Diary -> Itinerary | `diary.date === itinerary.date` | 日记可关联当日行程 |

### 3.3 数据同步规则

当 Trip 数据变更时，关联数据需要同步更新：

| Trip 变更 | 影响范围 |
|-----------|---------|
| 修改日期 | Itinerary 日期需重新计算 |
| 删除旅行 | 所有关联的 Itinerary、BudgetItem、PackingItem、Food、Place、Diary 需级联删除 |
| 修改预算 | BudgetItem 的 spentBudget 累加值重新计算 |

---

## 4. Mock 数据生成策略

### 4.1 生成原则

1. **真实性**：数据内容真实可信，符合实际旅行场景
2. **多样性**：覆盖不同目的地、风格、状态、预算水平
3. **一致性**：关联数据之间逻辑自洽（日期在范围内、金额合理）
4. **覆盖性**：覆盖所有枚举值和边界场景

### 4.2 现有 Mock 数据概览

当前 `mock-trips.js` 包含 15 条行程数据，覆盖：

| 维度 | 覆盖值 |
|------|--------|
| **目的地** | 东京、巴黎、曼谷、三亚、北京、成都、京都、首尔、新加坡、悉尼、伦敦、冰岛、马尔代夫、西安、丽江 |
| **风格** | food、couple、nature、history、photo、city、deep、leisure（8 种） |
| **状态** | planning（6）、upcoming（3）、ended（4）（3 种） |
| **人数** | 1-4 人 |
| **预算** | 6,000 - 60,000 元 |
| **打包进度** | 5% - 100% |
| **日记数** | 0 - 7 篇 |

### 4.3 景点 Mock 数据

`place-service.js` 包含 8 个景点，全部关联 `trip_001`（东京）：

| ID | 名称 | 类型 | 评分 | 价格 | 收藏 | 已去 |
|----|------|------|------|------|------|------|
| p1 | 浅草寺 | 历史 | 4.8 | 免费 | 是 | 是 |
| p2 | 东京塔 | 拍照 | 4.6 | 120 | 是 | 否 |
| p3 | 筑地市场 | 美食 | 4.9 | 免费 | 是 | 是 |
| p4 | 秋叶原 | 购物 | 4.5 | 免费 | 否 | 否 |
| p5 | 新宿御苑 | 自然 | 4.7 | 50 | 否 | 是 |
| p6 | 迪士尼乐园 | 亲子 | 4.9 | 550 | 是 | 否 |
| p7 | 台场 | 夜景 | 4.4 | 免费 | 否 | 否 |
| p8 | 明治神宫 | 历史 | 4.7 | 免费 | 是 | 是 |

### 4.4 ID 生成策略

使用 `mock-utils.js` 中的 `generateId()` 函数：

```javascript
function generateId(prefix = 'id') {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${prefix}_${timestamp}_${random}`
}
```

格式：`{prefix}_{timestamp}_{randomString}`  
示例：`trip_1718234567890_abc123`

### 4.5 图片生成策略

使用 [picsum.photos](https://picsum.photos) 服务生成随机占位图片：

```javascript
function generateMockImage(width = 400, height = 300) {
  const random = Math.floor(Math.random() * 10000)
  return `https://picsum.photos/${width}/${height}?random=${random}`
}
```

封面图：`800x400`（横向，适合卡片封面）  
景点图/美食图：`400x300`（4:3 比例）

---

## 5. 数据量规划

### 5.1 各实体数据量

| 实体 | 预置数量 | 说明 |
|------|---------|------|
| Trip | 15 | 覆盖全球 15 个不同目的地 |
| Itinerary | ~75 | 平均 5 天/行程 x 15 行程 |
| BudgetItem | ~150 | 平均 10 条/行程 x 15 行程 |
| PackingItem | ~300 | 平均 20 件/行程 x 15 行程 |
| Food | ~75 | 平均 5 个/行程 x 15 行程 |
| Place | ~100 | 平均 7 个/行程 x 15 行程 |
| Diary | ~30 | 平均 2 篇/行程 x 15 行程 |

### 5.2 存储占用预估

| 实体 | 平均大小/条 | 数量 | 小计 |
|------|------------|------|------|
| Trip | ~0.5KB | 15 | ~7.5KB |
| Itinerary | ~0.3KB | 75 | ~22.5KB |
| BudgetItem | ~0.15KB | 150 | ~22.5KB |
| PackingItem | ~0.1KB | 300 | ~30KB |
| Food | ~0.3KB | 75 | ~22.5KB |
| Place | ~0.4KB | 100 | ~40KB |
| Diary | ~1KB | 30 | ~30KB |
| **合计** | | **~745 条** | **~175KB** |

预估总存储占用 < 200KB，远低于 10MB 上限。

---

## 6. 异常数据覆盖

### 6.1 边界值覆盖

| 场景 | 数据特征 | 测试目的 |
|------|---------|---------|
| 空目的地 | `destination: ''` | 表单校验 |
| 超长目的地 | `destination: '北京上海广州深圳成都重庆西安杭州苏州南京武汉长沙...'` | 文本截断 |
| 零预算 | `totalBudget: 0` | 预算计算边界 |
| 超大预算 | `totalBudget: 9999999` | 金额格式化 |
| 单天行程 | `startDate === endDate` | 天数计算边界 |
| 超长行程 | 30 天行程 | 列表渲染性能 |
| 独自旅行 | `peopleCount: 1` | 人数标签不显示 |
| 大团队 | `peopleCount: 20` | 人数展示 |

### 6.2 状态组合覆盖

| 组合 | 说明 |
|------|------|
| 有行程 + 无预算 + 无行李 | 部分数据缺失 |
| 无行程 + 有预算 + 有行李 | 行程未生成 |
| 预算超支 150% | 危险状态 + 超支金额 |
| 打包进度 0% | 空行李清单 |
| 打包进度 100% | 完全打包 |
| 已结束旅行 + 大量日记 | 回顾场景 |
| 即将出发 + 0 天倒计时 | 今天出发 |

### 6.3 异常输入覆盖

| 场景 | 测试项 |
|------|--------|
| 日期格式错误 | `"2026/07/15"` 而非 `"2026-07-15"` |
| 日期顺序倒置 | endDate < startDate |
| 金额为负数 | `totalBudget: -1000` |
| 金额为字符串 | `totalBudget: "一万"` |
| null 值 | 各字段传入 null |
| undefined 值 | 各字段传入 undefined |
| 空数组 | 列表字段为空 `[]` |
| 重复 ID | 存在相同 id 的两条记录 |

### 6.4 空状态覆盖

| 页面 | 空状态场景 |
|------|----------|
| 旅行列表 | 无任何旅行 |
| 旅行详情 | 无行程安排 |
| 预算管理 | 无消费记录 |
| 行李清单 | 无行李项 |
| 美食攻略 | 无美食记录 |
| 旅行日记 | 无日记 |
| 景点管理 | 无景点数据 |
| 首页仪表盘 | 所有统计数据为零 |
