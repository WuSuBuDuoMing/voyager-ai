/**
 * @fileoverview Voyager AI - AI-Powered Travel Planning Assistant
 * WeChat Mini Program entry point. Handles global initialization including
 * system info detection, theme management, and local storage setup.
 *
 * @module app
 * @version 1.15.0
 * @license MIT
 * @author WuSuBuDuoMing
 */

const { getStorage, setStorage } = require('./utils/storage-utils')

/**
 * WeChat Mini Program App instance
 * Manages global state for theme mode, user info, and system information
 */
App({
  /** @type {Object} Global shared data accessible from all pages */
  globalData: {
    /** @type {Object|null} Current user information */
    userInfo: null,
    /** @type {boolean} Whether dark mode is currently active */
    isDarkMode: false,
    /** @type {string} Application version number */
    version: '1.15.0',
    /** @type {Object|null} Device system information from wx.getSystemInfoSync() */
    systemInfo: null
  },

  /**
   * App lifecycle: called when the Mini Program is first launched.
   * Initializes system info, theme, and local storage in sequence.
   */
  onLaunch() {
    this.getSystemInfo()
    this.initTheme()
    this.initStorage()
  },

  /**
   * Retrieves device system information and detects initial theme.
   * Populates globalData.systemInfo and sets initial isDarkMode.
   * @private
   */
  getSystemInfo() {
    try {
      const systemInfo = wx.getSystemInfoSync()
      this.globalData.systemInfo = systemInfo
      if (systemInfo.theme) {
        this.globalData.isDarkMode = systemInfo.theme === 'dark'
      }
    } catch (e) {
      console.error('[App] Failed to get system info:', e)
    }
  },

  /**
   * Initializes the application theme based on user preference.
   * Reads saved preference from storage; defaults to 'auto' (follow system).
   * @private
   */
  initTheme() {
    const savedTheme = getStorage('theme_mode') || 'auto'
    if (savedTheme === 'dark') {
      this.globalData.isDarkMode = true
    } else if (savedTheme === 'light') {
      this.globalData.isDarkMode = false
    } else {
      try {
        const res = wx.getSystemInfoSync()
        this.globalData.isDarkMode = res.theme === 'dark'
      } catch (e) {
        this.globalData.isDarkMode = false
      }
    }
  },

  /**
   * Initializes local storage for first-time users.
   * Sets default values for theme preference and user statistics.
   * @private
   */
  initStorage() {
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

  /**
   * Toggles between light and dark theme modes.
   * Updates global state, persists preference, and notifies all active pages
   * via their onThemeChange callback if implemented.
   */
  toggleDarkMode() {
    this.globalData.isDarkMode = !this.globalData.isDarkMode
    setStorage('theme_mode', this.globalData.isDarkMode ? 'dark' : 'light')
    const pages = getCurrentPages()
    pages.forEach(page => {
      if (page.onThemeChange) {
        page.onThemeChange(this.globalData.isDarkMode)
      }
    })
  }
})
