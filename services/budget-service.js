/**
 * 预算服务模块
 * 提供预算和消费记录的 CRUD 操作
 * @module services/budget-service
 */

const { getStorage, setStorage } = require('../utils/storage-utils')
const { generateId } = require('../utils/mock-utils')
const { MOCK_TRIPS } = require('../data/mock-trips')
const BUDGET_KEY = 'budgets'
const EXPENSE_KEY = 'expenses'

/**
 * 模拟消费记录
 */
const MOCK_EXPENSES = [
  { id: 'e1', tripId: 'trip_001', category: 'transport', description: '东京地铁三日券', amount: 280, date: '2026-07-15' },
  { id: 'e2', tripId: 'trip_001', category: 'accommodation', description: '新宿酒店3晚', amount: 3200, date: '2026-07-15' },
  { id: 'e3', tripId: 'trip_001', category: 'food', description: '筑地市场海鲜午餐', amount: 450, date: '2026-07-16' },
  { id: 'e4', tripId: 'trip_001', category: 'tickets', description: '东京塔门票', amount: 120, date: '2026-07-16' },
  { id: 'e5', tripId: 'trip_001', category: 'shopping', description: '秋叶原手办', amount: 800, date: '2026-07-17' },
  { id: 'e6', tripId: 'trip_001', category: 'food', description: '拉面晚餐', amount: 150, date: '2026-07-17' },
  { id: 'e7', tripId: 'trip_001', category: 'tickets', description: '迪士尼门票x2', amount: 1100, date: '2026-07-18' },
  { id: 'e8', tripId: 'trip_001', category: 'other', description: '电话卡', amount: 80, date: '2026-07-15' },
  { id: 'e9', tripId: 'trip_001', category: 'insurance', description: '旅行保险', amount: 200, date: '2026-07-14' },
  { id: 'e10', tripId: 'trip_001', category: 'transport', description: '机场大巴', amount: 120, date: '2026-07-15' },
  { id: 'e11', tripId: 'trip_001', category: 'food', description: '居酒屋', amount: 350, date: '2026-07-18' },
  { id: 'e12', tripId: 'trip_001', category: 'shopping', description: '药妆店', amount: 600, date: '2026-07-19' }
]

/**
 * 预算分类配置
 */
const BUDGET_CATEGORIES = [
  { key: 'transport', icon: '🚗', label: '交通' },
  { key: 'accommodation', icon: '🏨', label: '住宿' },
  { key: 'food', icon: '🤠', label: '餐饮' },
  { key: 'tickets', icon: '🎫', label: '门票' },
  { key: 'shopping', icon: '🛍', label: '购物' },
  { key: 'communication', icon: '📱', label: '通讯' },
  { key: 'insurance', icon: '🛡', label: '保险' },
  { key: 'other', icon: '📦', label: '其他' }
]

/**
 * 获取行程预算概览
 * @param {string} tripId - 行程 ID
 * @returns {Promise<Object>} 预算概览
 */
async function getBudgetOverview(tripId) {
  const trip = MOCK_TRIPS.find(t => t.id === tripId)
  const expenses = await getExpenses(tripId)
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)
  const totalBudget = trip ? trip.totalBudget : 25000

  const categoryBreakdown = BUDGET_CATEGORIES.map(cat => {
    const catExpenses = expenses.filter(e => e.category === cat.key)
    const catAmount = catExpenses.reduce((sum, e) => sum + e.amount, 0)
    return {
      ...cat,
      amount: catAmount,
      percentage: totalSpent > 0 ? Math.round((catAmount / totalSpent) * 100) : 0
    }
  }).filter(c => c.amount > 0)

  return {
    totalBudget,
    totalSpent,
    remaining: totalBudget - totalSpent,
    percentage: totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0,
    categoryBreakdown,
    dailyAverage: expenses.length > 0 ? Math.round(totalSpent / Math.max(1, new Set(expenses.map(e => e.date)).size)) : 0
  }
}

/**
 * 获取消费记录列表
 * @param {string} tripId - 行程 ID
 * @returns {Promise<Array>} 消费记录列表（按日期降序）
 */
async function getExpenses(tripId) {
  let allExpenses = getStorage(EXPENSE_KEY)
  if (!allExpenses) {
    allExpenses = MOCK_EXPENSES
    setStorage(EXPENSE_KEY, allExpenses)
  }
  return allExpenses
    .filter(e => e.tripId === tripId)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

/**
 * 添加消费记录
 * @param {Object} expense - 消费数据
 * @returns {Promise<Object>} 添加后的消费记录
 */
async function addExpense(expense) {
  const allExpenses = getStorage(EXPENSE_KEY) || []
  const newExpense = { ...expense, id: generateId('expense') }
  allExpenses.push(newExpense)
  setStorage(EXPENSE_KEY, allExpenses)
  return newExpense
}

/**
 * 删除消费记录
 * @param {string} id - 消费记录 ID
 * @returns {Promise<boolean>} 是否删除成功
 */
async function deleteExpense(id) {
  const allExpenses = getStorage(EXPENSE_KEY) || []
  const filtered = allExpenses.filter(e => e.id !== id)
  setStorage(EXPENSE_KEY, filtered)
  return true
}

/**
 * 获取预算分类配置
 * @returns {Array} 分类配置列表
 */
function getCategories() {
  return BUDGET_CATEGORIES
}

module.exports = {
  getBudgetOverview,
  getExpenses,
  addExpense,
  deleteExpense,
  getCategories
}
