//pages/second_level/clean/clean.js
var api = require('../../../utils/api.js')
var config = require('../../../utils/config.js')
var util = require('../../../utils/util.js')

//获取应用实例
var app = getApp()
Page({
  data:{
    userInfo:{},
    "products": [
      {
        "p_id": "1",
        "p_icon": "../../../images/clean1-1.jpg",
        "p_title": "居家保洁",
        "p_price": "259",
        "p_duration": "4",
        "p_summary": "家具清洗、室内大扫除"
      },
      {
        "p_id": "2",
        "p_icon": "../../../images/clean1-2.jpg",
        "p_title": "厨房蒸汽保洁",
        "p_price": "300",
        "p_duration": "3",
        "p_summary": "油烟机+冰箱+厨房高温蒸洗",
      },
      {
        "p_id": "3",
        "p_icon": "../../../images/clean1-3.jpg",
        "p_title": "日式精细擦窗",
        "p_price": "198",
        "p_duration": "2",
        "p_summary": "玻璃窗、卷帘窗、百叶窗......"
      },
      {
        "p_id": "4",
        "p_icon": "../../../images/clean1-4.jpg",
        "p_title": "卫生间消毒",
        "p_price": "238",
        "p_duration": "2",
        "p_summary": "卫生间深度清洁，高温消毒"
      }]
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    this.init();
  },

  onShareAppMessage: function () {
    return {
      title: '家政服务',
      desc: '家政保洁',
      path: '/pages/index/index.js'
    }
  },

  init: function () {
    var v = new Date().getTime();
    this.setData({
      version: v
    })
  },

  //点击单个
  itemClick: function (e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: './product/product?id=' + ds.id
    })
  },
})

