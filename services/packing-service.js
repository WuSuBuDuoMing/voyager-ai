/**
 * 行李清单服务模块
 * 提供行李清单的 CRUD 操作
 * @module services/packing-service
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
 * @returns {Array} 分类配置列表
 */
function getCategories() {
  return PACKING_CATEGORIES
}

module.exports = {
  getPackingList,
  addItem,
  toggleItem,
  deleteItem,
  getCategories
}
