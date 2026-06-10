/**
 * 模拟数据工具模块
 * 提供测试数据生成、模拟 API 延迟、深拷贝等开发辅助功能
 * @module utils/mock-utils
 */

/**
 * 生成唯一标识符
 * 格式：prefix_timestamp_randomString
 * @param {string} [prefix='id'] - ID 前缀
 * @returns {string} 唯一标识符，如 'trip_1718234567890_abc'
 */
function generateId(prefix = 'id') {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${prefix}_${timestamp}_${random}`
}

/**
 * 从数组中随机选取一个元素
 * @param {Array} arr - 源数组
 * @returns {*} 随机选取的元素，数组为空时返回 undefined
 */
function randomFromArray(arr) {
  if (!arr || arr.length === 0) {
    return undefined
  }
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 生成指定范围内的随机整数（包含 min 和 max）
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} 随机整数
 */
function randomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 打乱数组顺序（Fisher-Yates 洗牌算法），返回新数组
 * @param {Array} arr - 原始数组
 * @returns {Array} 打乱后的新数组（不修改原数组）
 */
function shuffleArray(arr) {
  if (!arr || arr.length === 0) {
    return []
  }
  const result = arr.slice()
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = result[i]
    result[i] = result[j]
    result[j] = temp
  }
  return result
}

/**
 * 生成占位图片 URL（使用 picsum.photos 服务）
 * @param {number} [width=400] - 图片宽度
 * @param {number} [height=300] - 图片高度
 * @param {string} [text] - 备用文字说明（未使用，保留接口兼容）
 * @returns {string} 占位图片 URL
 */
function generateMockImage(width = 400, height = 300, text) {
  const random = Math.floor(Math.random() * 10000)
  return `https://picsum.photos/${width}/${height}?random=${random}`
}

/**
 * 基于 Promise 的延迟函数，用于模拟网络请求耗时
 * @param {number} ms - 延迟毫秒数
 * @returns {Promise<void>} 延迟结束后 resolve
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 深拷贝对象（支持嵌套对象、数组、Date、RegExp 等）
 * @param {*} obj - 要深拷贝的对象
 * @returns {*} 深拷贝后的新对象
 */
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime())
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags)
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item))
  }

  const cloned = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key])
    }
  }
  return cloned
}

module.exports = {
  generateId,
  randomFromArray,
  randomInt,
  shuffleArray,
  generateMockImage,
  delay,
  deepClone
}
