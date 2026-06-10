/**
 * ai-suggestion-card AI建议卡片组件
 * 展示AI生成的旅行建议，包括标题、内容、理由和置信度
 */
Component({
  properties: {
    /** AI建议数据对象 */
    suggestion: {
      type: Object,
      value: {
        title: '',
        content: '',
        reason: '',
        icon: '🤖',
        confidence: 85
      }
    }
  },

  data: {},

  methods: {
    /** 接受建议 */
    handleAccept() {
      this.triggerEvent('onAccept', { suggestion: this.data.suggestion });
    },

    /** 忽略建议 */
    handleDismiss() {
      this.triggerEvent('onDismiss', { suggestion: this.data.suggestion });
    }
  }
});
