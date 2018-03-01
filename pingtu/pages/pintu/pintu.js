//获取应用实例
const app = getApp()
let timer = null
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    type: 3,
    // 是否开始游戏
    start: false,
    // 图片数组
    images: [],
    // 选中遮罩数组
    active: [],
    // 乱序数组
    arrySort: [],
    // 点击的第一张图片id
    firstId: '',
    // 用时秒数
    seconds: 0,
    // 是否成功
    success: false
  },
  onLoad () {
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
  previewImage () {
    /*wx.previewImage({
      urls: [app.globalData.cropperFilePath]
    })*/
  },
  goWithdraw () {
    wx.navigateTo({
      url: '/pages/withdraw/withdraw'
    })
  },
  goHome () {
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },
  godz () {
    wx.navigateTo({
      url: '/pages/dingzhi/dingzhi'
    })
  },
  onShareAppMessage (res) {
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
  // 将图片切成3*3/4*4/5*5的小图片
  getImage (i, j) {
    let _this = this
    let n = _this.data.type
    wx.canvasToTempFilePath({
      x: i * (300/n),
      y: j * (300/n),
      width: (300/n),
      height: (300/n),
      canvasId: 'myCanvas',
      success: function(res) {
        let arr = _this.data.images
        arr.push(res.tempFilePath)
        _this.setData({
          images: arr
        })
        if (!(i==(n-1)&&j==(n-1))&&i<n&&j<n) {
          if (i==(n-1)) {
            _this.getImage(0,++j)
          } else {
            _this.getImage(++i,j)
          }
        } else {
          // 创建一个数组，打乱顺序
          let sortList = []
          let activeList = []
          for (let a=0;a<arr.length;a++) {
            sortList.push(a)
            activeList.push(false)
          }
          sortList.sort((a,b) => {
            // 用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
            return Math.random()>0.5 ? -1 : 1
          })
          // 图片准备完成可以显示
          _this.setData({
            arrySort: sortList,
            active: activeList,
            start: true
          })
          timer = setInterval(() => {
            let s = _this.data.seconds
            _this.setData({
              seconds: ++s
            })
          },1000)
        }
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  // 初始化画布和图片
  init () {
    let _this = this
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.drawImage('/images/pintu/pintu-default3.png', 0, 0, 300, 300)
    ctx.draw(false, function () {
      _this.getImage(0,0)
    })
  },
  // 点击图片事件
  clickimg (e) {
    // 当前点击的是第几张图片
    let id = e.currentTarget.dataset.id
    let activeList = this.data.active
    // 如果是第一次点击，直接显示遮罩
    if (this.data.firstId === '') {
      activeList[id] = true
      this.setData({
        active: activeList,
        firstId: id
      })
    } else {
      // 如果不是第一次点击，判断是否相邻。如果相邻则交换，否则去掉遮罩
      let first = this.data.firstId - 0
      let n = this.data.type
      if (id == first + n || id == first - n || ((first%n != 0) && id == first - 1) || ((first%n != (n-1)) && id == first + 1)) {
        // 相邻则交换
        let sortList = this.data.arrySort
        let temp = sortList[first]
        sortList[first] = sortList[id]
        sortList[id] = temp
        activeList[first] = false
        this.setData({
          active: activeList,
          arrySort: sortList,
          firstId: ''
        })
        let success = true
        // 交换完成后判断是否复原
        for (let i = 0; i < sortList.length; i++) {
          if (sortList[i] !== i) {
            success = false
          }
        }
        if (success) {
          // 成功 锁定时间 清空数据
          clearInterval(timer)
          this.setData({
            success: true,
            images: []
          })
        }
      } else {
        // 不相邻则清空
        activeList[first] = false
        this.setData({
          active: activeList,
          firstId: ''
        })
      }
    }
  },
  // 打开红包
  open () {
    this.setData({
      start: false
    })
  }
})
