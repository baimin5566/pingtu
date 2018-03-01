//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '时光拼图',
      path: '/page/pintu/pintu',
      success: function (res) {
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '转发失败',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  cancel: function () {
    wx.navigateBack({ changed: true });
  },
  getImage () {
    wx.showLoading({
      title: '图片生成中...',
    })
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.fillRect(0, 0, wx.getSystemInfoSync().windowWidth, 449)
    ctx.setFillStyle('#D14C4D')
    ctx.drawImage('/images/pintu/home-share-bg.png', 0, 0, wx.getSystemInfoSync().windowWidth, 449)
    ctx.drawImage(app.globalData.userInfo.avatarUrl, (wx.getSystemInfoSync().windowWidth - 50) / 2, 8, 50, 50)
    ctx.setFontSize(16)
    ctx.setFillStyle('#FEE2B2')
    ctx.fillText('发了一个拼图PK红包', (wx.getSystemInfoSync().windowWidth - 150) / 2, 80)
    ctx.drawImage('/images/icons/icon-coma-left.png', (wx.getSystemInfoSync().windowWidth - 228) / 2 - 30, 100, 20, 13)
    ctx.setFontSize(26)
    ctx.fillText('比一比谁的手速最快', (wx.getSystemInfoSync().windowWidth - 228) / 2, 120)
    ctx.drawImage('/images/icons/icon-coma-right.png', (wx.getSystemInfoSync().windowWidth - 228) / 2 + 244, 100, 20, 13)
    ctx.drawImage('/images/pintu/home-share-zhiwen.png', (wx.getSystemInfoSync().windowWidth - 50) / 2, 330, 50, 50)
    ctx.setFontSize(14)
    ctx.fillText('长按识别小程序，看看谁最快拼出来', (wx.getSystemInfoSync().windowWidth - 224) / 2, 410)
    ctx.draw()
    let _this = this
    setTimeout(() => {
      wx.canvasToTempFilePath({
        x: (wx.getSystemInfoSync().windowWidth - 375) / 2,
        width: 375,
        height: 449,
        canvasId: 'myCanvas',
        success: function(res) {
          wx.hideLoading()
            // 成功获得地址的地方
          wx.previewImage({
            urls: [res.tempFilePath]
          })
        },
        fail: function(res) {
          console.log(res)
        }
      })
    }, 500)
  }
})
