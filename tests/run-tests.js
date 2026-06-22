/**
 * Test runner for CI — mocks WeChat global APIs then loads test-cases.js
 *
 * Usage: node tests/run-tests.js
 */

// Mock WeChat Mini Program globals
global.wx = {
  getStorageSync: () => '',
  setStorageSync: () => {},
  removeStorageSync: () => {},
  clearStorageSync: () => {},
  getStorageInfoSync: () => ({ keys: [], currentSize: 0, limitSize: 10240 }),
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
