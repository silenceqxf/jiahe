//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls:[
      '../../images/slider1.jpg',
      '../../images/slider2.jpg',
      '../../images/slider3.jpg',
      '../../images/slider4.jpg'
    ],
    indicatorDots:true,
    autoplay:true,
    interval:5000,
    duration:1000,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  notice: function () {
    wx.navigateTo({
      url: '../second_level/notice/notice'
    })
  },
  repairs: function () {
    wx.navigateTo({
      url: '../second_level/repairs/repairs'
    })
  },
  clean: function () {
    wx.navigateTo({
      url: '../second_level/clean/clean'
    })
  },
  rent: function () {
    wx.navigateTo({
      url: '../second_level/rent/rent'
    })
  },
  phone: function () {
    wx.navigateTo({
      url: '../second_level/phone_number/phone_number'
    })
  },
  suggest: function () {
    wx.navigateTo({
      url: '../second_level/suggest/suggest'
    })
  },
 
  onLoad: function () {
  
    wx.showModal({
      title: '登录提示',
      content: '请完善您的住户信息',
      success: res => {
        if (res.confirm) {
          wx.navigateTo({
            url: '../my_info/my_info',
          })
        }
      }
    })
    
   
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
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
