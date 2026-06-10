/**
 * progress-ring 进度环组件
 * 使用两个半圆旋转技术实现环形进度展示
 * 纯 view 实现，不依赖 canvas
 */
Component({
  properties: {
    /** 进度百分比 0-100 */
    percent: {
      type: Number,
      value: 0
    },
    /** 环的尺寸 rpx */
    size: {
      type: Number,
      value: 120
    },
    /** 描边宽度 rpx */
    strokeWidth: {
      type: Number,
      value: 8
    },
    /** 进度条颜色 */
    color: {
      type: String,
      value: '#07C160'
    },
    /** 中间显示的额外文字（可选） */
    text: {
      type: String,
      value: ''
    }
  },

  data: {
    /** 左半圆旋转角度 */
    leftRotate: 0,
    /** 右半圆旋转角度 */
    rightRotate: 0,
    /** 内圆尺寸 */
    innerSize: 0
  },

  observers: {
    /** 监听 percent、size、strokeWidth 变化，更新旋转角度 */
    'percent, size, strokeWidth': function(percent, size, strokeWidth) {
      // 确保百分比在 0-100 范围内
      const p = Math.max(0, Math.min(100, percent || 0));
      const innerSize = size - strokeWidth * 2;

      let leftRotate = 0;
      let rightRotate = 0;

      if (p <= 50) {
        // 0-50%: 右半圆旋转，左半圆隐藏
        rightRotate = (p / 100) * 360;
        leftRotate = 0;
      } else {
        // 50-100%: 右半圆满转，左半圆开始旋转
        rightRotate = 180;
        leftRotate = ((p - 50) / 100) * 360;
      }

      this.setData({
        leftRotate,
        rightRotate,
        innerSize
      });
    }
  }
});
