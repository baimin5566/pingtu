Page({
  data: {
    phone: '13001185533',
    desc: '我要定制的小程序是这样的：巴拉巴拉吧啦巴拉巴拉吧啦巴拉巴拉吧啦…',
    success: false
  },
  submit () {
  	this.setData({
      success: true
    })
  }
})
