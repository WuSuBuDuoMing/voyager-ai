/**
 * 金额/预算工具模块
 * 提供金额格式化、预算计算、预算状态判断等功能
 *
 * @module utils/money-utils
 * @version 1.15.0
 * @license MIT
 * @author WuSuBuDuoMing
 */

/**
 * 格式化金额，添加千分位分隔符和货币符号
 * @param {number} amount - 金额数值
 * @param {string} [currency='¥'] - 货币符号
 * @returns {string} 格式化后的金额字符串，如 '¥12,500'
 */
function formatMoney(amount, currency = '¥') {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return `${currency}0`
  }
  const num = Number(amount)
  const parts = num.toFixed(2).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const formatted = parts.join('.')
  return `${currency}${formatted}`
}

/**
 * 简短格式化金额（大额显示为万/亿）
 * @param {number} amount - 金额数值
 * @returns {string} 简短格式，如 '1.2万'、'3.5亿'、'500'
 */
function formatMoneyShort(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0'
  }
  const num = Math.abs(Number(amount))
  const sign = amount < 0 ? '-' : ''

  if (num >= 100000000) {
    return `${sign}${(num / 100000000).toFixed(1)}亿`
  }
  if (num >= 10000) {
    return `${sign}${(num / 10000).toFixed(1)}万`
  }
  return `${sign}${num}`
}

/**
 * 计算预算使用百分比
 * @param {number} spent - 已花费金额
 * @param {number} total - 总预算
 * @returns {number} 使用百分比 0-100（超出预算时返回超过100的值）
 */
function getBudgetUsagePercent(spent, total) {
  if (!total || total <= 0) {
    return 0
  }
  return Math.round((spent / total) * 100)
}

/**
 * 获取预算状态
 * @param {number} spent - 已花费金额
 * @param {number} total - 总预算
 * @returns {'safe'|'warning'|'danger'} 预算状态
 *   - safe: 使用量 < 70%
 *   - warning: 使用量 70%-90%
 *   - danger: 使用量 >= 90%
 */
function getBudgetStatus(spent, total) {
  const percent = getBudgetUsagePercent(spent, total)
  if (percent >= 90) {
    return 'danger'
  }
  if (percent >= 70) {
    return 'warning'
  }
  return 'safe'
}

/**
 * 根据预算状态获取对应颜色
 * @param {'safe'|'warning'|'danger'} status - 预算状态
 * @returns {string} 颜色值（十六进制色或颜色名）
 */
function getBudgetStatusColor(status) {
  const colorMap = {
    safe: '#52c41a',       // 绿色 - 安全
    warning: '#faad14',    // 黄色 - 警告
    danger: '#ff4d4f'      // 红色 - 危险
  }
  return colorMap[status] || colorMap.safe
}

/**
 * 计算剩余预算
 * @param {number} total - 总预算
 * @param {number} spent - 已花费金额
 * @returns {number} 剩余金额（超支时返回负数）
 */
function getRemainMoney(total, spent) {
  return (total || 0) - (spent || 0)
}

/**
 * 判断是否超支
 * @param {number} spent - 已花费金额
 * @param {number} total - 总预算
 * @returns {boolean} 是否超支
 */
function isOverBudget(spent, total) {
  return (spent || 0) > (total || 0)
}

/**
 * 获取超支金额
 * @param {number} spent - 已花费金额
 * @param {number} total - 总预算
 * @returns {number} 超支金额（未超支时返回 0）
 */
function getOverBudgetAmount(spent, total) {
  const over = (spent || 0) - (total || 0)
  return over > 0 ? over : 0
}

/**
 * 计算日均预算
 * @param {number} totalBudget - 总预算
 * @param {number} days - 天数
 * @returns {number} 日均预算金额（天数为0或负数时返回总预算）
 */
function getDailyBudget(totalBudget, days) {
  if (!days || days <= 0) {
    return totalBudget || 0
  }
  return Math.round((totalBudget || 0) / days)
}

module.exports = {
  formatMoney,
  formatMoneyShort,
  getBudgetUsagePercent,
  getBudgetStatus,
  getBudgetStatusColor,
  getRemainMoney,
  isOverBudget,
  getOverBudgetAmount,
  getDailyBudget
}
