/**
 * day-plan-card 每日行程卡片组件
 * 展示某一天的行程安排，包括上午、下午、晚间的活动
 */
Component({
  properties: {
    /** 每日行程数据对象 */
    day: {
      type: Object,
      value: {
        id: '',
        dayIndex: 1,
        date: '',
        title: '',
        morning: { activity: '', location: '', cost: 0 },
        afternoon: { activity: '', location: '', cost: 0 },
        evening: { activity: '', location: '', cost: 0 },
        estimatedCost: 0,
        transport: ''
      }
    }
  },

  data: {},

  methods: {
    /** 卡片点击事件 */
    handleTap() {
      this.triggerEvent('onTap', { id: this.data.day.id, day: this.data.day });
    },

    /** 判断时间段是否有内容 */
    hasContent(period) {
      const data = this.data.day[period];
      return data && data.activity && data.activity.trim().length > 0;
    }
  }
});
