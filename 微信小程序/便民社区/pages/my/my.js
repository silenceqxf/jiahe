// pages/my/my.js
var mta = require('../../utils/mta_analysis.js');
var common = require('../../utils/common.js');
const app = getApp();

Page({
  data:{
    userInfo:null,
  },
  onLoad:function(){
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })
    }

    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      console.log(userInfo);
      //更新数据
      that.setDate({
        userInfo:userInfo
      })
    }),

    //腾讯分析
    mta.Page.init();
  },

  onShow: function (options) {
    //监听页面显示
  },
  bindViewTap: function () {
    //点击头像
  },

  //模拟打电话
  tel: function () {
    wx.makePhoneCall({
      phoneNumber: '400-9915591' //仅为示例，并非真实的电话号码
    })
  },
})