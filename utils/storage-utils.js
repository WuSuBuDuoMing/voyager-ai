/**
 * 本地存储工具模块
 * 封装微信小程序的 Storage API，提供统一的存取接口和错误处理
 *
 * @module utils/storage-utils
 * @version 1.15.0
 * @license MIT
 * @author WuSuBuDuoMing
 */

/**
 * 从本地存储中读取数据
 * @param {string} key - 存储键名
 * @returns {*} 存储的值，读取失败或不存在时返回 null
 */
function getStorage(key) {
  try {
    const value = wx.getStorageSync(key)
    // wx.getStorageSync 在 key 不存在时返回空字符串，统一转为 null
    return value || null
  } catch (e) {
    console.error(`[StorageUtils] 读取存储失败: ${key}`, e)
    return null
  }
}

/**
 * 将数据写入本地存储
 * @param {string} key - 存储键名
 * @param {*} value - 要存储的值（会自动序列化为 JSON）
 * @returns {boolean} 是否写入成功
 */
function setStorage(key, value) {
  try {
    wx.setStorageSync(key, value)
    return true
  } catch (e) {
    console.error(`[StorageUtils] 写入存储失败: ${key}`, e)
    return false
  }
}

/**
 * 从本地存储中移除指定数据
 * @param {string} key - 存储键名
 * @returns {boolean} 是否移除成功
 */
function removeStorage(key) {
  try {
    wx.removeStorageSync(key)
    return true
  } catch (e) {
    console.error(`[StorageUtils] 移除存储失败: ${key}`, e)
    return false
  }
}

/**
 * 清空所有本地存储数据
 * @returns {boolean} 是否清空成功
 */
function clearStorage() {
  try {
    wx.clearStorageSync()
    return true
  } catch (e) {
    console.error('[StorageUtils] 清空存储失败', e)
    return false
  }
}

/**
 * 获取本地存储的近似占用大小（单位：KB）
 * @returns {number} 近似占用大小（KB），获取失败时返回 0
 */
function getStorageSize() {
  try {
    const res = wx.getStorageInfoSync()
    // currentSize 单位为 KB
    return res.currentSize || 0
  } catch (e) {
    console.error('[StorageUtils] 获取存储大小失败', e)
    return 0
  }
}

/**
 * 获取本地存储的详细信息
 * @returns {Object|null} 存储信息对象，包含 keys、currentSize、limitSize 等字段
 *   - {string[]} keys - 所有存储键名列表
 *   - {number} currentSize - 当前已用大小（KB）
 *   - {number} limitSize - 存储空间上限（KB），通常为 10240（10MB）
 * @returns {null} 获取失败时返回 null
 */
function getStorageInfo() {
  try {
    const res = wx.getStorageInfoSync()
    return {
      keys: res.keys || [],
      currentSize: res.currentSize || 0,
      limitSize: res.limitSize || 10240
    }
  } catch (e) {
    console.error('[StorageUtils] 获取存储信息失败', e)
    return null
  }
}

module.exports = {
  getStorage,
  setStorage,
  removeStorage,
  clearStorage,
  getStorageSize,
  getStorageInfo
}
