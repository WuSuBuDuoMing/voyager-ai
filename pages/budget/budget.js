const themeBehavior = require('../../utils/theme-behavior')
const budgetService = require('../../services/budget-service')
const tripService = require('../../services/trip-service')
const { formatMoney } = require('../../utils/money-utils')

Page({
  behaviors: [themeBehavior],

  data: {
    tripId: '',
    loading: true,
    overview: null,
    expenses: [],
    categories: [],
    categoryMap: {},
    showAddModal: false,
    newExpense: {
      category: 'food',
      amount: '',
      description: '',
      date: ''
    }
  },

  onLoad(options) {
    const tripId = options.tripId || 'trip_001'
    const today = new Date()
    const dateStr = today.getFullYear() + '-' +
      String(today.getMonth() + 1).padStart(2, '0') + '-' +
      String(today.getDate()).padStart(2, '0')

    const categories = budgetService.getCategories()
    const categoryMap = {}
    categories.forEach(c => { categoryMap[c.key] = c })

    this.setData({
      tripId,
      categories,
      categoryMap,
      'newExpense.date': dateStr
    })
    this.loadData()
  },

  onPullDownRefresh() {
    this.loadData().then(() => {
      wx.stopPullDownRefresh()
    })
  },

  async loadData() {
    this.setData({ loading: true })
    try {
      const overview = await budgetService.getBudgetOverview(this.data.tripId)
      const expenses = await budgetService.getExpenses(this.data.tripId)
      this.setData({ overview, expenses, loading: false })
    } catch (e) {
      console.error('加载预算失败', e)
      this.setData({ loading: false })
    }
  },

  onShowAdd() {
    const today = new Date()
    const dateStr = today.getFullYear() + '-' +
      String(today.getMonth() + 1).padStart(2, '0') + '-' +
      String(today.getDate()).padStart(2, '0')
    this.setData({
      showAddModal: true,
      newExpense: { category: 'food', amount: '', description: '', date: dateStr }
    })
  },

  onCloseAdd() {
    this.setData({ showAddModal: false })
  },

  onCategorySelect(e) {
    const cat = e.currentTarget.dataset.cat
    this.setData({ 'newExpense.category': cat })
  },

  onAmountInput(e) {
    this.setData({ 'newExpense.amount': e.detail.value })
  },

  onDescInput(e) {
    this.setData({ 'newExpense.description': e.detail.value })
  },

  onDateChange(e) {
    this.setData({ 'newExpense.date': e.detail.value })
  },

  async onSaveExpense() {
    const { newExpense, tripId } = this.data
    if (!newExpense.amount || !newExpense.description) {
      wx.showToast({ title: '请填写金额和描述', icon: 'none' })
      return
    }
    const amount = parseFloat(newExpense.amount)
    if (isNaN(amount) || amount <= 0) {
      wx.showToast({ title: '请输入有效金额', icon: 'none' })
      return
    }
    await budgetService.addExpense({
      tripId,
      category: newExpense.category,
      amount,
      description: newExpense.description,
      date: newExpense.date
    })
    this.setData({ showAddModal: false })
    wx.showToast({ title: '添加成功', icon: 'success' })
    this.loadData()
  },

  async onDeleteExpense(e) {
    const { id } = e.detail
    wx.showActionSheet({
      itemList: ['删除'],
      success: async (res) => {
        if (res.tapIndex === 0) {
          wx.showModal({
            title: '确认删除',
            content: '确定要删除这条消费记录吗？',
            success: async (modalRes) => {
              if (modalRes.confirm) {
                await budgetService.deleteExpense(id)
                wx.showToast({ title: '已删除', icon: 'success' })
                this.loadData()
              }
            }
          })
        }
      }
    })
  }
})
