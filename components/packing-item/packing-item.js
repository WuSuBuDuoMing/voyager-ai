Component({
  properties: {
    item: { type: Object, value: {} }
  },
  methods: {
    onToggle() {
      this.triggerEvent('toggle', { id: this.data.item.id })
    },
    onDelete() {
      this.triggerEvent('delete', { id: this.data.item.id })
    }
  }
})
