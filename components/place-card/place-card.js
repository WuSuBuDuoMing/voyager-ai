Component({
  properties: {
    place: { type: Object, value: {} }
  },
  methods: {
    onTap() {
      this.triggerEvent('tap', { place: this.data.place })
    },
    onFavorite() {
      this.triggerEvent('favorite', { id: this.data.place.id })
    },
    onVisited() {
      this.triggerEvent('visited', { id: this.data.place.id })
    }
  }
})
