
Page({
  data: {
    show: false
  },
  more () {
    let a = this.data.show
    this.setData({
      show: !a
    })
  }
})
