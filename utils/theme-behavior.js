/**
 * 暗黑模式主题 Behavior
 * 提供全局深色模式状态同步能力，可在任意页面/组件中混入使用
 *
 * 使用方式：
 *   const themeBehavior = require('../../utils/theme-behavior')
 *   Page({
 *     behaviors: [themeBehavior],
 *     // ...
 *   })
 *
 * @module utils/theme-behavior
 */

const app = getApp()

module.exports = Behavior({
  data: {
    /** @type {boolean} 当前是否为暗黑模式 */
    isDarkMode: false
  },

  lifetimes: {
    attached() {
      // 组件挂载时，从全局状态同步暗黑模式设置
      this.setData({
        isDarkMode: app.globalData && app.globalData.isDarkMode
      })

      // 监听主题变化事件（如果 app 中通过 eventBus 发射）
      if (app.globalData && app.globalData.eventBus) {
        this._themeChangeHandler = (isDark) => {
          this.setData({ isDarkMode: isDark })
        }
        app.globalData.eventBus.on('themeChange', this._themeChangeHandler)
      }
    },

    detached() {
      // 组件销毁时移除事件监听，防止内存泄漏
      if (app.globalData && app.globalData.eventBus && this._themeChangeHandler) {
        app.globalData.eventBus.off('themeChange', this._themeChangeHandler)
        this._themeChangeHandler = null
      }
    }
  },

  pageLifetimes: {
    show() {
      // 每次页面显示时检查状态是否同步（处理从设置页返回等场景）
      if (app.globalData && this.data.isDarkMode !== app.globalData.isDarkMode) {
        this.setData({
          isDarkMode: app.globalData.isDarkMode
        })
      }
    }
  },

  methods: {
    /**
     * 主题切换回调（可通过全局事件触发）
     * @param {boolean} isDark - 是否切换为暗黑模式
     */
    onThemeChange(isDark) {
      this.setData({ isDarkMode: isDark })
    },

    /**
     * 切换暗黑模式（调用全局方法）
     */
    toggleDarkMode() {
      if (app.toggleDarkMode) {
        app.toggleDarkMode()
      } else {
        console.warn('[ThemeBehavior] app.toggleDarkMode 方法不存在')
      }
    }
  }
})
