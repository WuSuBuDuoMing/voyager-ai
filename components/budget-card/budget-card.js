Component({
  properties: {
    expense: { type: Object, value: {} },
    categories: { type: Array, value: [] }
  },
  methods: {
    onDelete() {
      this.triggerEvent('delete', { id: this.data.expense.id })
    }
  }
})
