/**
 * Test runner for CI — mocks WeChat global APIs then loads test-cases.js
 *
 * Usage: node tests/run-tests.js
 */

// In-memory storage backing the wx.getStorageSync / setStorageSync mock
const _storage = Object.create(null)

// Mock WeChat Mini Program globals
global.wx = {
  getStorageSync: (key) => (key in _storage ? _storage[key] : ''),
  setStorageSync: (key, value) => { _storage[key] = value },
  removeStorageSync: (key) => { delete _storage[key] },
  clearStorageSync: () => { for (const key of Object.keys(_storage)) delete _storage[key] },
  getStorageInfoSync: () => ({ keys: Object.keys(_storage), currentSize: 0, limitSize: 10240 }),
  getSystemInfoSync: () => ({ theme: 'light' }),
  showToast: () => {},
  showModal: () => {},
  navigateTo: () => {},
  switchTab: () => {},
  stopPullDownRefresh: () => {},
  setNavigationBarTitle: () => {},
  showActionSheet: () => {}
}

global.getApp = () => ({
  globalData: { isDarkMode: false, version: '1.9.0' }
})

global.getCurrentPages = () => []
global.Behavior = (opts) => opts
global.Page = () => {}

// Run test cases
require('./test-cases.js')
