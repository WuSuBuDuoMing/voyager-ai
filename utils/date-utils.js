/**
 * 日期工具模块
 * 提供日期格式化、计算、比较等常用功能
 * @module utils/date-utils
 */

/**
 * 将 Date 对象格式化为 'YYYY-MM-DD' 字符串
 * @param {Date|string} date - 日期对象或可解析的日期字符串
 * @returns {string} 格式化后的日期字符串，如 '2025-07-15'
 */
function formatDate(date) {
  const d = ensureDate(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * 格式化日期范围，显示为 '7月15日 - 7月20日'
 * @param {Date|string} startDate - 开始日期
 * @param {Date|string} endDate - 结束日期
 * @returns {string} 格式化后的日期范围字符串
 */
function formatDateRange(startDate, endDate) {
  const start = ensureDate(startDate)
  const end = ensureDate(endDate)
  const startText = getMonthDay(start)
  const endText = getMonthDay(end)
  return `${startText} - ${endText}`
}

/**
 * 计算两个日期之间的天数（包含起止日）
 * @param {Date|string} startDate - 开始日期
 * @param {Date|string} endDate - 结束日期
 * @returns {number} 行程天数（至少为1）
 */
function getDayCount(startDate, endDate) {
  const start = ensureDate(startDate)
  const end = ensureDate(endDate)
  const diffTime = end.getTime() - start.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(diffDays + 1, 1)
}

/**
 * 计算距指定日期的天数倒计时（从今天算起）
 * @param {Date|string} date - 目标日期
 * @returns {number} 正数表示还有N天，0表示今天，负数表示已过N天
 */
function getCountdown(date) {
  const target = ensureDate(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  target.setHours(0, 0, 0, 0)
  const diffTime = target.getTime() - today.getTime()
  return Math.round(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * 获取倒计时的中文文本描述
 * @param {Date|string} date - 目标日期
 * @returns {string} 如 '还有3天'、'已出发2天' 或 '今天出发'
 */
function getCountdownText(date) {
  const days = getCountdown(date)
  if (days === 0) {
    return '今天出发'
  } else if (days > 0) {
    return `还有${days}天`
  } else {
    return `已出发${Math.abs(days)}天`
  }
}

/**
 * 获取行程状态
 * @param {Date|string} startDate - 开始日期
 * @param {Date|string} endDate - 结束日期
 * @returns {'planning'|'upcoming'|'ongoing'|'ended'} 行程状态
 *   - planning: 未设置日期（startDate 为空）
 *   - upcoming: 距出发还有7天以上
 *   - ongoing: 正在进行中（出发前7天内到结束日期之间）
 *   - ended: 已结束
 */
function getTripStatus(startDate, endDate) {
  if (!startDate) {
    return 'planning'
  }

  const start = ensureDate(startDate)
  start.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (endDate) {
    const end = ensureDate(endDate)
    end.setHours(0, 0, 0, 0)
    if (today > end) {
      return 'ended'
    }
  }

  const daysUntilStart = Math.round((start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (daysUntilStart > 7) {
    return 'upcoming'
  }

  return 'ongoing'
}

/**
 * 获取行程状态的中文文本
 * @param {'planning'|'upcoming'|'ongoing'|'ended'} status - 行程状态
 * @returns {string} 状态中文描述
 */
function getTripStatusText(status) {
  const statusMap = {
    planning: '规划中',
    upcoming: '即将出发',
    ongoing: '行程中',
    ended: '已结束'
  }
  return statusMap[status] || '未知'
}

/**
 * 判断指定日期是否是今天
 * @param {Date|string} date - 待判断的日期
 * @returns {boolean} 是否是今天
 */
function isToday(date) {
  const d = ensureDate(date)
  const today = new Date()
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  )
}

/**
 * 获取日期对应的中文星期几
 * @param {Date|string} date - 日期
 * @returns {string} 中文星期，如 '周一'、'周日'
 */
function getWeekday(date) {
  const d = ensureDate(date)
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return weekdays[d.getDay()]
}

/**
 * 将 'YYYY-MM-DD' 格式字符串解析为 Date 对象
 * @param {string} dateStr - 日期字符串，格式为 'YYYY-MM-DD'
 * @returns {Date|null} Date 对象，解析失败时返回 null
 */
function parseDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') {
    return null
  }
  const parts = dateStr.split('-')
  if (parts.length !== 3) {
    return null
  }
  const year = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1
  const day = parseInt(parts[2], 10)
  const d = new Date(year, month, day)
  // 验证日期合法性（防止溢出，如 2月30日）
  if (d.getFullYear() !== year || d.getMonth() !== month || d.getDate() !== day) {
    return null
  }
  return d
}

/**
 * 给日期加上指定天数，返回新日期
 * @param {Date|string} date - 原始日期
 * @param {number} days - 要加的天数（可以为负数）
 * @returns {Date} 计算后的新日期对象
 */
function addDays(date, days) {
  const d = ensureDate(date)
  const result = new Date(d.getTime())
  result.setDate(result.getDate() + days)
  return result
}

/**
 * 获取日期的中文月日格式
 * @param {Date|string} date - 日期
 * @returns {string} 如 '7月15日'
 */
function getMonthDay(date) {
  const d = ensureDate(date)
  const month = d.getMonth() + 1
  const day = d.getDate()
  return `${month}月${day}日`
}

// ==================== 内部工具函数 ====================

/**
 * 确保输入转为 Date 对象
 * @param {Date|string|number} input - 日期输入
 * @returns {Date} Date 对象
 * @private
 */
function ensureDate(input) {
  if (input instanceof Date) {
    return new Date(input.getTime())
  }
  if (typeof input === 'string') {
    return new Date(input.replace(/-/g, '/'))
  }
  if (typeof input === 'number') {
    return new Date(input)
  }
  return new Date()
}

module.exports = {
  formatDate,
  formatDateRange,
  getDayCount,
  getCountdown,
  getCountdownText,
  getTripStatus,
  getTripStatusText,
  isToday,
  getWeekday,
  parseDate,
  addDays,
  getMonthDay
}
