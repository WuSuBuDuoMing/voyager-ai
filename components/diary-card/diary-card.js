Component({
  properties: {
    diary: { type: Object, value: {} }
  },
  methods: {
    onTap() {
      this.triggerEvent('tap', { diary: this.data.diary })
    }
  }
})
