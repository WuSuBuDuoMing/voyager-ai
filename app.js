// app.js - AI 旅行计划助手
const { getStorage, setStorage } = require('./utils/storage-utils')

App({
  globalData: {
    userInfo: null,
    isDarkMode: false,
    version: '1.1.0',
    systemInfo: null
  },

  onLaunch() {
    // 获取系统信息
    this.getSystemInfo()
    // 初始化暗黑模式
    this.initTheme()
    // 初始化本地存储
    this.initStorage()
  },

  // 获取系统信息
  getSystemInfo() {
    try {
      const systemInfo = wx.getSystemInfoSync()
      this.globalData.systemInfo = systemInfo
      // 检查是否支持暗黑模式
      if (systemInfo.theme) {
        this.globalData.isDarkMode = systemInfo.theme === 'dark'
      }
    } catch (e) {
      console.error('获取系统信息失败', e)
    }
  },

  // 初始化主题
  initTheme() {
    const savedTheme = getStorage('theme_mode') || 'auto'
    if (savedTheme === 'dark') {
      this.globalData.isDarkMode = true
    } else if (savedTheme === 'light') {
      this.globalData.isDarkMode = false
    } else {
      // auto - 跟随系统
      try {
        const res = wx.getSystemInfoSync()
        this.globalData.isDarkMode = res.theme === 'dark'
      } catch (e) {
        this.globalData.isDarkMode = false
      }
    }
  },

  // 初始化本地存储
  initStorage() {
    // 检查是否首次使用
    const isFirstUse = getStorage('is_first_use')
    if (isFirstUse === null) {
      setStorage('is_first_use', true)
      setStorage('theme_mode', 'auto')
      setStorage('user_stats', {
        totalTrips: 0,
        totalDays: 0,
        totalBudget: 0,
        visitedPlaces: 0
      })
    }
  },

  // 切换暗黑模式
  toggleDarkMode() {
    this.globalData.isDarkMode = !this.globalData.isDarkMode
    setStorage('theme_mode', this.globalData.isDarkMode ? 'dark' : 'light')
    // 通知所有页面更新
    const pages = getCurrentPages()
    pages.forEach(page => {
      if (page.onThemeChange) {
        page.onThemeChange(this.globalData.isDarkMode)
      }
    })
  }
})
