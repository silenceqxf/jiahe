// pages/second_level/rent/rent.js
var mta = require('../../../utils/mta_analysis.js');
var common = require('../../../utils/common.js');

Page({
  //页面的初始数据
  data:{
    page:1,
    limit:10,
    isLoading:false,
    notice:"",
    hasNotice:false,
    // goods:[],
    noticeAnimation:{},
    goods:[
      {
        "goods_id":'1',
        "cover":"../../../images/w1.jpg",
        "name":"哇哈哈矿泉水19L",
        "price":"20.00",
        "amount":"467"
      },
      {
        "goods_id": '2',
        "cover": "../../../images/w2.jpg",
        "name": "蓝光活力心11.3L",
        "price": "14.00",
        "amount": "310"
      },
      {
        "goods_id": '3',
        "cover": "../../../images/w3.jpg",
        "name": "恒大冰泉饮用水19L",
        "price": "22.00",
        "amount": "348"
      },
      {
        "goods_id": '4',
        "cover": "../../../images/w4.jpg",
        "name": "农夫山泉天然水19L",
        "price": "25.00",
        "amount": "239"
      },
      {
        "goods_id": '5',
        "cover": "../../../images/w4.jpg",
        "name": "农夫山泉天然水19L",
        "price": "25.00",
        "amount": "239"
      },
      {
        "goods_id": '6',
        "cover": "../../../images/w3.jpg",
        "name": "恒大冰泉饮用水19L",
        "price": "22.00",
        "amount": "348"
      },
      {
        "goods_id": '7',
        "cover": "../../../images/w2.jpg",
        "name": "蓝光活力心11.3L",
        "price": "14.00",
        "amount": "310"
      },
      {
        "goods_id": '8',
        "cover": "../../../images/w1.jpg",
        "name": "哇哈哈矿泉水19L",
        "price": "20.00",
        "amount": "467"
      }
    ]
  },

  //页面初始化
  onLoad:function(options){
    var $that = this;
    $that.getGoodsList(false);
      //最新提示信息
      if(data.latest_notice.length>0){
        hasNotice = true;
        notice = data.latest_notice[0].content;
        //创建动画
        var animation = wx.createAnimation({
          duration:1000,
          timingFunction:'linear',
        });
        //循环执行
        var deg = [1.1,1];
        var i = 0;
        setInterval(function(){
          animation.scale(deg[i]).step().scale(deg[(i+1) % deg.length]).step();
          $that.setData({
            noticeAnimation:animation.export()
          });
          i = (i+1) % deg.length;
        },3000);
      }
    //腾讯分析
    mta.Page.init();
  },
  
  onReady:function(){
    //页面渲染完成
  },
  
  onShow:function(){
    //页面显示
  },
  
  onHide:function(){
    //页面隐藏
  },
  
  onUnload:function(){
    //页面关闭
  },
 
  onPullDownRefresh:function(){
    //页面相关事件处理函数——监听用户下拉动作
    this.getGoodsList(true);
  },
 
  onReachBottom:function(){
    //页面上拉触底事件的处理函数
    this.getGoodsList(false);
  },
  
  onShareAppMessage:function(){
    //用户点击右上角分享
  },

  // showGoods:function(e){
  //   //用户点击打开下单页面
  //   var goods_id = e.currentTarget.dataset.goodsid;
  //   wx.navigateTo({
  //     url:'cart/cart?goods_id='+goods_id
  //   });
  // },

  // showPage:function(e){
  //   //用户点击打开菜单
  //   wx.navigateTo({
  //     url:e.currentTarget.dataset.direct
  //   });
  // },
  
  getGoodsList:function(isInit){
    //用户获取商品列表
    var $that = this;
    var limit = $that.data.limit;
    if(isInit){
      var page = 1;
      var goods = [];
    }else{
      var isLoading = $that.data.isLoading;
      var page = $that.data.page;
      var goods = $that.data.goods;
      //正在加载，忽略此次请求
      if(isLoading){
        wx.stopPullDownRefresh();
        return;
      }
    }
    //加载中标志
    $that.setData({
      isLoading:true
    });
    //开始加载
    common.getGoodsList(page,limit,function(data){
      console.log("商品列表",data);
      //加载成功
      $that.setData({
        siLoading:false,
        page:page+1,
        goods:common.utils.extend(goods,data.goods_list)
      });
      wx.stopPullDownRefresh();
    },function(error){
      //加载失败
      console.log("商品列表",error);
      $that.setData({
        isLoading:false
      });
      wx.showToast({
        title:"加载商品列表失败，请重试",
        icon:'loading'
      });
      wx.stopPullDownRefresh();
    });
  },

  //用户点击加入购物车
  addInCart: function () {
    var goods_id = this.data.goods_id;
    var cart = common.getStorage('cart', true) || [];
    var isIn = false;
    // 已经存在购物车则数量+1
    for (var i = 0; i < cart.length; ++i) {
      var goods = cart[i];
      if (goods.id == goods_id) {
        goods.num++;
        isIn = true;
        break;
      }
    }
    // 不存在购物车则加入
    if (!isIn) {
      cart.push({
        id: goods_id,
        num: 1
      });
    }
    this.setData({
      total_cart_num: this.data.total_cart_num + 1
    });
    common.setStorage('cart', cart, true);
    wx.showToast({
      title: '添加成功',
    });
    wx.navigateTo({
      url: 'cart/cart?goods_id=' + goods_id
    });
  },

  //获取商品详情
  getGoods: function (goods_id) {
    var $that = this;
    var banners = [];
    // 获取商品信息
    var uniqueID = common.getStorage('uniqueID', true);
    common.getGoods(uniqueID.openid || '', goods_id, function (data) {
      // 获取商品信息成功
      console.log("商品信息", data);
      var goods = data.goods[0] || {};
      goods.sold_count = '0';  // 自慰销售量
      goods.cover && banners.push(goods.cover);
      $that.setData({
        goods_meta: goods,
        banners: banners,
      });
      wx.stopPullDownRefresh();
    }, function (error) {
      // 获取商品信息失败
      console.log("商品信息", error);
      wx.stopPullDownRefresh();
    });

    // 获取商品展示图
    common.getGoodsBanner(goods_id, function (data) {
      // 获取商品展示图成功
      console.log("商品展示图", data);
      for (var i = 0; i < data.goods_banner.length; ++i) {
        var banner = data.goods_banner[i];
        banners.push(banner.banner);
      }
      $that.setData({
        banners: banners,
      });
      wx.stopPullDownRefresh();
    }, function (error) {
      // 获取商品展示图失败
      console.log("商品展示图", error);
      wx.stopPullDownRefresh();
    });
  }
})