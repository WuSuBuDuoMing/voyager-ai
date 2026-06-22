/**
 * 行程工具模块
 * 提供行程进度计算、标签映射、摘要生成等功能
 *
 * @module utils/trip-utils
 * @version 1.15.0
 * @license MIT
 * @author WuSuBuDuoMing
 */

/**
 * 获取行程整体完成进度（0-100）
 * 根据行程的各项准备情况综合评估
 * @param {Object} trip - 行程对象
 * @param {string} [trip.startDate] - 出发日期
 * @param {string} [trip.endDate] - 返回日期
 * @param {Array} [trip.itinerary] - 行程安排列表
 * @param {Array} [trip.packingList] - 行李清单
 * @param {Array} [trip.budgetItems] - 预算明细
 * @param {Object} [trip.flights] - 机票信息
 * @param {Object} [trip.hotel] - 酒店信息
 * @returns {number} 完成进度 0-100
 */
function getTripProgress(trip) {
  if (!trip) return 0

  let totalWeight = 0
  let completedWeight = 0

  // 日期已设定 (权重 15%)
  totalWeight += 15
  if (trip.startDate && trip.endDate) {
    completedWeight += 15
  } else if (trip.startDate) {
    completedWeight += 7
  }

  // 行程安排 (权重 30%)
  totalWeight += 30
  if (trip.itinerary && trip.itinerary.length > 0) {
    completedWeight += Math.min(30, (trip.itinerary.length / 3) * 30)
  }

  // 机票 (权重 20%)
  totalWeight += 20
  if (trip.flights && (trip.flights.outbound || trip.flights.inbound)) {
    const flightCount = (trip.flights.outbound ? 1 : 0) + (trip.flights.inbound ? 1 : 0)
    completedWeight += Math.min(20, flightCount * 10)
  }

  // 酒店 (权重 15%)
  totalWeight += 15
  if (trip.hotel) {
    completedWeight += 15
  }

  // 预算 (权重 10%)
  totalWeight += 10
  if (trip.budgetItems && trip.budgetItems.length > 0) {
    completedWeight += Math.min(10, (trip.budgetItems.length / 3) * 10)
  }

  // 行李 (权重 10%)
  totalWeight += 10
  if (trip.packingList && trip.packingList.length > 0) {
    completedWeight += 10
  }

  return totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0
}

/**
 * 计算行李打包进度
 * @param {Array} packingList - 行李清单数组
 * @param {boolean} [packingList[].checked] - 是否已打包
 * @returns {number} 打包进度 0-100
 */
function getPackingProgress(packingList) {
  if (!packingList || packingList.length === 0) {
    return 0
  }
  const checkedCount = packingList.filter(item => item.checked).length
  return Math.round((checkedCount / packingList.length) * 100)
}

/**
 * 生成行程摘要文本
 * @param {Object} trip - 行程对象
 * @param {string} trip.name - 行程名称
 * @param {string} [trip.destination] - 目的地
 * @param {string} [trip.startDate] - 出发日期
 * @param {string} [trip.endDate] - 返回日期
 * @param {number} [trip.totalBudget] - 总预算
 * @returns {string} 行程摘要文本
 */
function generateTripSummary(trip) {
  if (!trip) return ''

  const parts = []

  if (trip.destination) {
    parts.push(`${trip.destination}之旅`)
  }

  if (trip.startDate && trip.endDate) {
    const { getDayCount, formatDateRange } = require('./date-utils')
    const range = formatDateRange(trip.startDate, trip.endDate)
    const days = getDayCount(trip.startDate, trip.endDate)
    parts.push(`${range}，共${days}天`)
  }

  if (trip.totalBudget) {
    const { formatMoney } = require('./money-utils')
    parts.push(`预算${formatMoney(trip.totalBudget)}`)
  }

  return parts.join(' | ')
}

/**
 * 旅行风格代码映射为中文标签
 * @param {string} style - 风格代码
 * @returns {string} 中文标签
 */
function getTravelStyleLabel(style) {
  const styleMap = {
    relaxation: '休闲度假',
    adventure: '探险之旅',
    culture: '文化体验',
    food: '美食之旅',
    shopping: '购物之旅',
    nature: '自然探索',
    photography: '摄影之旅',
    backpacking: '背包旅行',
    family: '亲子游',
    couple: '情侣游',
    solo: '独自旅行',
    business: '商务出行'
  }
  return styleMap[style] || style || '未设置'
}

/**
 * 旅行风格代码映射为 emoji 图标
 * @param {string} style - 风格代码
 * @returns {string} emoji 图标
 */
function getTravelStyleIcon(style) {
  const iconMap = {
    relaxation: '🏖️',
    adventure: '⛰️',
    culture: '🏛️',
    food: '🍜',
    shopping: '🛍️',
    nature: '🌿',
    photography: '📸',
    backpacking: '🎒',
    family: '👨‍👩‍👧‍👦',
    couple: '💑',
    solo: '🧳',
    business: '💼'
  }
  return iconMap[style] || '✈️'
}

/**
 * 行程节奏代码映射为中文标签
 * @param {string} pace - 节奏代码
 * @returns {string} 中文标签
 */
function getPaceLabel(pace) {
  const paceMap = {
    relaxed: '休闲慢游',
    moderate: '适中节奏',
    packed: '紧凑充实',
    whirlwind: '暴走打卡'
  }
  return paceMap[pace] || pace || '未设置'
}

/**
 * 预算分类代码映射为中文标签
 * @param {string} category - 分类代码
 * @returns {string} 中文标签
 */
function getBudgetCategoryLabel(category) {
  const categoryMap = {
    transport: '交通',
    accommodation: '住宿',
    food: '餐饮',
    tickets: '门票景点',
    shopping: '购物',
    entertainment: '娱乐',
    insurance: '保险',
    visa: '签证',
    other: '其他'
  }
  return categoryMap[category] || category || '未分类'
}

/**
 * 预算分类代码映射为 emoji 图标
 * @param {string} category - 分类代码
 * @returns {string} emoji 图标
 */
function getBudgetCategoryIcon(category) {
  const iconMap = {
    transport: '🚗',
    accommodation: '🏨',
    food: '🍽️',
    tickets: '🎫',
    shopping: '🛍️',
    entertainment: '🎭',
    insurance: '🛡️',
    visa: '📋',
    other: '📌'
  }
  return iconMap[category] || '💰'
}

/**
 * 地点类型代码映射为中文标签
 * @param {string} type - 地点类型代码
 * @returns {string} 中文标签
 */
function getPlaceTypeLabel(type) {
  const typeMap = {
    attraction: '景点',
    restaurant: '餐厅',
    hotel: '酒店',
    airport: '机场',
    station: '车站',
    shopping: '购物',
    activity: '活动',
    transit: '中转',
    other: '其他'
  }
  return typeMap[type] || type || '未知'
}

/**
 * 心情代码映射为中文标签
 * @param {string} mood - 心情代码
 * @returns {string} 中文标签
 */
function getMoodLabel(mood) {
  const moodMap = {
    excited: '兴奋期待',
    happy: '开心愉悦',
    relaxed: '放松舒适',
    surprised: '惊喜赞叹',
    tired: '疲惫但满足',
    nostalgic: '怀念不舍',
    peaceful: '宁静惬意',
    adventurous: '充满探索欲'
  }
  return moodMap[mood] || mood || '未记录'
}

/**
 * 心情代码映射为 emoji 图标
 * @param {string} mood - 心情代码
 * @returns {string} emoji 图标
 */
function getMoodIcon(mood) {
  const iconMap = {
    excited: '🤩',
    happy: '😊',
    relaxed: '😌',
    surprised: '😲',
    tired: '😫',
    nostalgic: '🥹',
    peaceful: '☺️',
    adventurous: '🤗'
  }
  return iconMap[mood] || '😊'
}

module.exports = {
  getTripProgress,
  getPackingProgress,
  generateTripSummary,
  getTravelStyleLabel,
  getTravelStyleIcon,
  getPaceLabel,
  getBudgetCategoryLabel,
  getBudgetCategoryIcon,
  getPlaceTypeLabel,
  getMoodLabel,
  getMoodIcon
}
