/**
 * pages/packing/packing.js
 * Packing checklist page for managing travel luggage items. Supports
 * category filtering, toggle packed/unpacked, add and delete items.
 * @module pages/packing
 */
const themeBehavior = require('../../utils/theme-behavior')
const packingService = require('../../services/packing-service')

Page({
  behaviors: [themeBehavior],

  data: {
    tripId: '',
    loading: true,
    packingList: [],
    filteredList: [],
    categories: [],
    activeCategory: '全部',
    stats: { total: 0, packed: 0, unpacked: 0 },
    progress: 0,
    newItemName: '',
    newItemCategory: '其他'
  },

  onLoad(options) {
    const tripId = options.tripId || 'trip_001'
    const categories = packingService.getCategories()
    this.setData({ tripId, categories })
    this.loadPackingList()
  },

  onPullDownRefresh() {
    this.loadPackingList().then(() => {
      wx.stopPullDownRefresh()
    })
  },

  async loadPackingList() {
    this.setData({ loading: true })
    try {
      const list = await packingService.getPackingList(this.data.tripId)
      const packed = list.filter(i => i.checked).length
      const stats = { total: list.length, packed, unpacked: list.length - packed }
      const progress = list.length > 0 ? Math.round((packed / list.length) * 100) : 0
      this.setData({ packingList: list, stats, progress, loading: false })
      this.filterList()
    } catch (e) {
      console.error('加载行李清单失败', e)
      this.setData({ loading: false })
    }
  },

  onCategoryTap(e) {
    const cat = e.currentTarget.dataset.cat
    this.setData({ activeCategory: cat })
    this.filterList()
  },

  filterList() {
    const { packingList, activeCategory } = this.data
    const filtered = activeCategory === '全部'
      ? packingList
      : packingList.filter(i => i.category === activeCategory)
    this.setData({ filteredList: filtered })
  },

  async onToggleItem(e) {
    const { id } = e.detail
    await packingService.toggleItem(id)
    this.loadPackingList()
  },

  onDeleteItem(e) {
    const { id } = e.detail
    wx.showModal({
      title: '删除物品',
      content: '确定要删除这件物品吗？',
      success: async (res) => {
        if (res.confirm) {
          await packingService.deleteItem(id)
          wx.showToast({ title: '已删除', icon: 'success' })
          this.loadPackingList()
        }
      }
    })
  },

  onNameInput(e) {
    this.setData({ newItemName: e.detail.value })
  },

  onCategorySelect(e) {
    this.setData({ newItemCategory: e.detail.value })
  },

  async onAddItem() {
    const { newItemName, newItemCategory, tripId } = this.data
    if (!newItemName.trim()) {
      wx.showToast({ title: '请输入物品名称', icon: 'none' })
      return
    }
    const categories = packingService.getCategories().filter(c => c.key !== '全部')
    const catKey = categories[newItemCategory] ? categories[newItemCategory].key : '其他'
    await packingService.addItem({
      tripId,
      name: newItemName.trim(),
      category: catKey,
      quantity: 1
    })
    this.setData({ newItemName: '' })
    wx.showToast({ title: '添加成功', icon: 'success' })
    this.loadPackingList()
  }
})
