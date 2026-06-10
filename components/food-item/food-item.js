Component({
  properties: {
    food: { type: Object, value: {} }
  },
  methods: {
    onTap() {
      this.triggerEvent('tap', { food: this.data.food })
    },
    onFavorite() {
      this.triggerEvent('favorite', { id: this.data.food.id })
    },
    onEaten() {
      this.triggerEvent('eaten', { id: this.data.food.id })
    }
  }
})
