//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    type: '',
    // 主题
    subjects: [
      '新年快乐！你们的礼物在这里',
      '你能拼出来我就服',
      '比一比谁的手速最快',
      '看看谁的脑子好使',
      '一起来拼智力领福利',
    ],
    index: 0,
    radios: [
      {name: '1', value: '3x3'},
      {name: '2', value: '4x4', checked: 'true'},
      {name: '3', value: '5x5'}
    ],
    // 难度
    difficulty: 2,
    difficultyLine: [1, 2, 3, 4, 5],
    money: 0,
    num: 2,
    imageSrc: ''
  },
  onLoad: function (option) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
    if (option.type) {
      this.setData({
        type: option.type
      })
      if (option.type == 4) {
        this.setData({
          imageSrc: app.globalData.cropperFilePath
        })
      }
    }
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  // 改变难度
  radioChange: function (e) {
    this.setData({
      difficultyLine: [],
      difficulty: e.detail.value
    })
    let line = []
    for (let i = 1; i <= (e.detail.value) - 0 + 3; i++) {
      line.push(i)
    }
    this.setData({
      difficultyLine: line
    })
  },
  bindMoneyInput: function (e) {
    this.setData({
      money: e.detail.value
    })
  },
  bindNumInput: function (e) {
    this.setData({
      num: e.detail.value
    })
  },
  pay: function () {
    wx.navigateTo({
      //目的页面地址
      url: '/pages/build/build'
    })
  }
})
