/**
 * 行李清单服务模块
 * 提供行李清单的 CRUD 操作
 *
 * v1.11.0 增强：新增智能行李推荐、季节适配、
 * 旅行风格行李建议和行李重量估算
 *
 * @module services/packing-service
 * @version 1.12.0
 * @license MIT
 * @author WuSuBuDuoMing
 */

const { getStorage, setStorage } = require('../utils/storage-utils')
const { generateId } = require('../utils/mock-utils')
const STORAGE_KEY = 'packing'

/**
 * 模拟行李数据
 */
const MOCK_PACKING = [
  { id: 'pk1', tripId: 'trip_001', name: '护照', category: '证件', quantity: 1, checked: true },
  { id: 'pk2', tripId: 'trip_001', name: '身份证', category: '证件', quantity: 1, checked: true },
  { id: 'pk3', tripId: 'trip_001', name: '签证复印件', category: '证件', quantity: 2, checked: false },
  { id: 'pk4', tripId: 'trip_001', name: 'T恤', category: '衣物', quantity: 4, checked: true },
  { id: 'pk5', tripId: 'trip_001', name: '短裤', category: '衣物', quantity: 3, checked: true },
  { id: 'pk6', tripId: 'trip_001', name: '防晒衣', category: '衣物', quantity: 1, checked: false },
  { id: 'pk7', tripId: 'trip_001', name: '运动鞋', category: '衣物', quantity: 1, checked: true },
  { id: 'pk8', tripId: 'trip_001', name: '拖鞋', category: '衣物', quantity: 1, checked: false },
  { id: 'pk9', tripId: 'trip_001', name: '手机充电器', category: '电子设备', quantity: 1, checked: true },
  { id: 'pk10', tripId: 'trip_001', name: '充电宝', category: '电子设备', quantity: 1, checked: true },
  { id: 'pk11', tripId: 'trip_001', name: '相机', category: '电子设备', quantity: 1, checked: false },
  { id: 'pk12', tripId: 'trip_001', name: '转换插头', category: '电子设备', quantity: 1, checked: false },
  { id: 'pk13', tripId: 'trip_001', name: '牙刷', category: '洗漱', quantity: 2, checked: true },
  { id: 'pk14', tripId: 'trip_001', name: '洗面奶', category: '洗漱', quantity: 1, checked: false },
  { id: 'pk15', tripId: 'trip_001', name: '防晒霜', category: '洗漱', quantity: 1, checked: false },
  { id: 'pk16', tripId: 'trip_001', name: '感冒药', category: '药品', quantity: 1, checked: true },
  { id: 'pk17', tripId: 'trip_001', name: '肠胃药', category: '药品', quantity: 1, checked: true },
  { id: 'pk18', tripId: 'trip_001', name: '创可贴', category: '药品', quantity: 5, checked: false },
  { id: 'pk19', tripId: 'trip_001', name: '雨伞', category: '其他', quantity: 1, checked: false },
  { id: 'pk20', tripId: 'trip_001', name: '旅行枕', category: '其他', quantity: 1, checked: false }
]

/**
 * 行李分类配置
 */
const PACKING_CATEGORIES = [
  { key: '全部', icon: '' },
  { key: '证件', icon: '📄' },
  { key: '衣物', icon: '👔' },
  { key: '电子设备', icon: '📱' },
  { key: '洗漱', icon: '🧴' },
  { key: '药品', icon: '💊' },
  { key: '其他', icon: '📦' }
]

/**
 * 获取指定行程的行李清单
 * @param {string} tripId - 行程 ID
 * @returns {Promise<Array>} 行李清单
 */
async function getPackingList(tripId) {
  let allItems = getStorage(STORAGE_KEY)
  if (!allItems) {
    allItems = MOCK_PACKING
    setStorage(STORAGE_KEY, allItems)
  }
  return allItems.filter(item => item.tripId === tripId)
}

/**
 * 添加行李物品
 * @param {Object} item - 物品数据
 * @returns {Promise<Object>} 添加后的物品
 */
async function addItem(item) {
  const allItems = getStorage(STORAGE_KEY) || []
  const newItem = { ...item, id: generateId('pack'), checked: false }
  allItems.push(newItem)
  setStorage(STORAGE_KEY, allItems)
  return newItem
}

/**
 * 切换物品打包状态
 * @param {string} id - 物品 ID
 * @returns {Promise<Object|null>} 更新后的物品
 */
async function toggleItem(id) {
  const allItems = getStorage(STORAGE_KEY) || []
  const item = allItems.find(i => i.id === id)
  if (!item) return null
  item.checked = !item.checked
  setStorage(STORAGE_KEY, allItems)
  return item
}

/**
 * 删除行李物品
 * @param {string} id - 物品 ID
 * @returns {Promise<boolean>} 是否删除成功
 */
async function deleteItem(id) {
  const allItems = getStorage(STORAGE_KEY) || []
  const filtered = allItems.filter(i => i.id !== id)
  setStorage(STORAGE_KEY, filtered)
  return true
}

/**
 * 获取行李分类配置
 * @returns {Array<Object>} 分类配置列表，每项包含 key, icon
 */
function getCategories() {
  return PACKING_CATEGORIES
}

/**
 * 智能行李推荐模板
 * 按旅行类型和季节预置的推荐清单
 * @private
 * @type {Object}
 */
const SMART_PACKING_TEMPLATES = {
  international: [
    { name: '护照', category: '证件', quantity: 1, weight: 0.1 },
    { name: '护照复印件', category: '证件', quantity: 1, weight: 0.05 },
    { name: '签证/入境文件', category: '证件', quantity: 1, weight: 0.05 },
    { name: '国际机票/行程单', category: '证件', quantity: 1, weight: 0.05 },
    { name: '外币现金', category: '证件', quantity: 1, weight: 0.05 },
    { name: '信用卡', category: '证件', quantity: 1, weight: 0.01 },
    { name: '转换插头', category: '电子设备', quantity: 1, weight: 0.15 },
    { name: '随身WiFi/当地SIM卡', category: '电子设备', quantity: 1, weight: 0.1 }
  ],
  domestic: [
    { name: '身份证', category: '证件', quantity: 1, weight: 0.01 },
    { name: '交通卡', category: '证件', quantity: 1, weight: 0.01 },
    { name: '学生证/老年证', category: '证件', quantity: 1, weight: 0.01 }
  ],
  common: [
    { name: '手机充电器', category: '电子设备', quantity: 1, weight: 0.2 },
    { name: '充电宝', category: '电子设备', quantity: 1, weight: 0.3 },
    { name: '数据线', category: '电子设备', quantity: 2, weight: 0.05 },
    { name: '耳机', category: '电子设备', quantity: 1, weight: 0.05 },
    { name: '牙刷', category: '洗漱', quantity: 1, weight: 0.05 },
    { name: '洗面奶(旅行装)', category: '洗漱', quantity: 1, weight: 0.1 },
    { name: '毛巾', category: '洗漱', quantity: 1, weight: 0.15 },
    { name: '防晒霜', category: '洗漱', quantity: 1, weight: 0.1 },
    { name: '常用药品', category: '药品', quantity: 1, weight: 0.2 },
    { name: '创可贴', category: '药品', quantity: 1, weight: 0.05 }
  ]
}

/**
 * 季节性衣物推荐映射
 * @private
 * @type {Object}
 */
const SEASON_CLOTHING = {
  spring: [
    { name: '薄外套', category: '衣物', quantity: 1, weight: 0.3 },
    { name: '长袖衬衫', category: '衣物', quantity: 2, weight: 0.25 },
    { name: '长裤', category: '衣物', quantity: 2, weight: 0.4 },
    { name: '运动鞋', category: '衣物', quantity: 1, weight: 0.5 }
  ],
  summer: [
    { name: 'T恤', category: '衣物', quantity: 3, weight: 0.2 },
    { name: '短裤', category: '衣物', quantity: 2, weight: 0.2 },
    { name: '防晒衣', category: '衣物', quantity: 1, weight: 0.2 },
    { name: '遮阳帽', category: '其他', quantity: 1, weight: 0.1 },
    { name: '墨镜', category: '其他', quantity: 1, weight: 0.05 },
    { name: '运动鞋/凉鞋', category: '衣物', quantity: 1, weight: 0.4 }
  ],
  autumn: [
    { name: '薄毛衣', category: '衣物', quantity: 2, weight: 0.3 },
    { name: '风衣', category: '衣物', quantity: 1, weight: 0.5 },
    { name: '长裤', category: '衣物', quantity: 2, weight: 0.4 },
    { name: '运动鞋', category: '衣物', quantity: 1, weight: 0.5 }
  ],
  winter: [
    { name: '羽绒服', category: '衣物', quantity: 1, weight: 1.0 },
    { name: '保暖内衣', category: '衣物', quantity: 2, weight: 0.3 },
    { name: '毛衣', category: '衣物', quantity: 2, weight: 0.4 },
    { name: '厚裤', category: '衣物', quantity: 2, weight: 0.5 },
    { name: '围巾', category: '衣物', quantity: 1, weight: 0.15 },
    { name: '手套', category: '衣物', quantity: 1, weight: 0.05 },
    { name: '保暖靴', category: '衣物', quantity: 1, weight: 0.7 }
  ]
}

/**
 * 获取智能行李推荐清单
 * 根据旅行类型（国际/国内）和季节返回推荐的行李物品列表
 *
 * @param {string} [tripType='domestic'] - 旅行类型（'international'|'domestic'）
 * @param {string} [season='summer'] - 出行季节（'spring'|'summer'|'autumn'|'winter'）
 * @returns {Array<Object>} 推荐行李列表
 * @returns {string} [].name - 物品名称
 * @returns {string} [].category - 分类
 * @returns {number} [].quantity - 建议数量
 * @returns {number} [].weight - 预估单件重量(kg)
 */
function getSmartRecommendations(tripType = 'domestic', season = 'summer') {
  const recommendations = []

  // 旅行类型模板
  const typeTemplate = SMART_PACKING_TEMPLATES[tripType] || SMART_PACKING_TEMPLATES.domestic
  recommendations.push(...typeTemplate)

  // 通用物品
  recommendations.push(...SMART_PACKING_TEMPLATES.common)

  // 季节性衣物
  const seasonItems = SEASON_CLOTHING[season] || SEASON_CLOTHING.summer
  recommendations.push(...seasonItems)

  return recommendations
}

/**
 * 计算行李总重量
 * 根据行李清单计算总预估重量和分类重量分布
 *
 * @param {Array<Object>} packingList - 行李清单数组
 * @param {number} [packingList[].quantity=1] - 物品数量
 * @returns {Object} 重量统计
 * @returns {number} .totalWeight - 总重量(kg)
 * @returns {Object} .byCategory - 按分类的重量分布
 * @returns {number} .itemCount - 物品种类数
 * @returns {number} .totalCount - 物品总件数
 */
function calculateWeight(packingList) {
  if (!packingList || packingList.length === 0) {
    return { totalWeight: 0, byCategory: {}, itemCount: 0, totalCount: 0 }
  }

  // 预估物品重量映射（缺少重量信息时使用默认值）
  const defaultWeightMap = {
    '证件': 0.05, '衣物': 0.3, '电子设备': 0.25, '洗漱': 0.1, '药品': 0.2, '其他': 0.15
  }

  let totalWeight = 0
  let totalCount = 0
  const byCategory = {}

  packingList.forEach(item => {
    const qty = item.quantity || 1
    const weight = item.weight || defaultWeightMap[item.category] || 0.15
    const itemWeight = weight * qty

    totalWeight += itemWeight
    totalCount += qty

    if (!byCategory[item.category]) {
      byCategory[item.category] = 0
    }
    byCategory[item.category] += itemWeight
  })

  // 四舍五入到小数点后两位
  Object.keys(byCategory).forEach(cat => {
    byCategory[cat] = Math.round(byCategory[cat] * 100) / 100
  })

  return {
    totalWeight: Math.round(totalWeight * 100) / 100,
    byCategory,
    itemCount: packingList.length,
    totalCount
  }
}

/**
 * 获取行李打包进度统计
 * 返回各分类的打包完成情况
 *
 * @param {string} tripId - 行程 ID
 * @returns {Promise<Object>} 打包进度统计
 * @returns {number} .overall - 整体完成百分比(0-100)
 * @returns {Array<Object>} .byCategory - 按分类的完成进度
 * @returns {number} .totalItems - 总物品数
 * @returns {number} .checkedItems - 已打包物品数
 */
async function getPackingStats(tripId) {
  const items = await getPackingList(tripId)
  const totalItems = items.length
  const checkedItems = items.filter(i => i.checked).length
  const overall = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0

  // 按分类统计
  const categoryMap = {}
  items.forEach(item => {
    if (!categoryMap[item.category]) {
      categoryMap[item.category] = { category: item.category, total: 0, checked: 0 }
    }
    categoryMap[item.category].total += 1
    if (item.checked) {
      categoryMap[item.category].checked += 1
    }
  })

  const byCategory = Object.values(categoryMap).map(cat => ({
    ...cat,
    percentage: cat.total > 0 ? Math.round((cat.checked / cat.total) * 100) : 0
  }))

  return { overall, byCategory, totalItems, checkedItems }
}

module.exports = {
  getPackingList,
  addItem,
  toggleItem,
  deleteItem,
  getCategories,
  getSmartRecommendations,
  calculateWeight,
  getPackingStats
}
