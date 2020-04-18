// pages/second_level/rent/cart/cart.js
var mta = require('../../../../utils/mta_analysis.js');
var common = require('../../../../utils/common.js');

Page({
  /*页面的初始数据*/
  data: {
    cart: [],
    total_price: 0,
    total_goods: 0,
  },

  //页面加载
  onLoad: function (options) {
    // 腾讯分析
    mta.Page.init();
  },

  onReady: function () {
    //页面渲染
  },

  //页面显示
  onShow: function () {
    var $that = this;
    var cart = common.getStorage('cart', true) || [];
    var goods_ids = [];
    for (var i = 0; i < cart.length; ++i) {
      goods_ids.push(cart[i].id);
    }
    $that.setData({
      cart: [],
      total_price: 0,
      total_goods: 0,
      total_freight: 0
    });
    // 批量获取商品信息
    common.getGoodsListInCart(goods_ids.join(','), function (data) {
      console.log('购物车商品列表', data);
      var total_price = 0;
      var total_goods = 0;
      // 添加商品数量
      for (var i = 0; i < data.goods_list.length; ++i) {
        var goods_id = data.goods_list[i].goods_id;
        for (var j = 0; j < cart.length; ++j) {
          if (cart[j].id == goods_id) {
            // 商品总数
            total_goods += cart[j].num;
            // 商品总价
            total_price += parseFloat(data.goods_list[i].price) * cart[j].num;
            common.utils.extend(data.goods_list[i], { cart_num: cart[j].num });
          }
        }
      }
      $that.setData({
        cart: data.goods_list,
        total_goods: total_goods,
        total_price: total_price,
      });
    }, function (error) {
      console.log('购物车商品列表', error);
    });
  },

  onHide: function () {
    //页面隐藏
  },

  onUnload: function () {
    //页面关闭
  },

  onPullDownRefresh: function () {
    //页面相关事件处理函数--监听用户下拉动作
  },

  onReachBottom: function () {
    //页面上拉触底事件的处理函数
  },

  onShareAppMessage: function () {
    //用户点击右上角分享
  },

  //购物车商品数量减一
  reduceGoodsNum: function (e) {
    var $that = this;
    var goods_id = e.currentTarget.dataset.goodsid;
    var goods = $that.data.cart;
    var cart = common.getStorage('cart', true);

    var price = 0;
    // 刷新本页面购物车信息
    for (var i = 0; i < goods.length; ++i) {
      if (goods[i].goods_id == goods_id) {
        goods[i].cart_num--;
        price = parseFloat(goods[i].price);
        // 商品移除
        if (goods[i].cart_num <= 0) {
          goods.splice(i, 1);
        }
        break;
      }
    }
    // 刷新存储的购物车信息
    for (var i = 0; i < cart.length; ++i) {
      if (cart[i].id == goods_id) {
        cart[i].num--;
        // 商品移除
        if (cart[i].num <= 0) {
          cart.splice(i, 1);
        }
        break;
      }
    }
    $that.setData({
      cart: goods,
      total_price: $that.data.total_price - price,
      total_goods: $that.data.total_goods - 1,
    });
    common.setStorage('cart', cart, true);
  },

  //购物车商品数量减一
  addGoodsNum: function (e) {
    var $that = this;
    var goods_id = e.currentTarget.dataset.goodsid;
    var goods = $that.data.cart;
    var cart = common.getStorage('cart', true);

    var price = 0;
    // 刷新本页面购物车信息
    for (var i = 0; i < goods.length; ++i) {
      if (goods[i].goods_id == goods_id) {
        goods[i].cart_num++;
        price = parseFloat(goods[i].price);
        break;
      }
    }
    // 刷新存储的购物车信息
    for (var i = 0; i < cart.length; ++i) {
      if (cart[i].id == goods_id) {
        cart[i].num++;
        break;
      }
    }
    $that.setData({
      cart: goods,
      total_price: $that.data.total_price + price,
      total_goods: $that.data.total_goods + 1,
    });
    common.setStorage('cart', cart, true);
  },

 //创建订单
  createOrder: function (e) {
    // var uniqueID = common.getStorage('uniqueID', true);
    // if (!uniqueID) {
    //   wx.switchTab({
    //     url: '../../../my/my',
    //   });
    //   return;
    // }
    // if (this.data.total_goods === 0) {
    //   wx.showToast({
    //     title: '购物车空空如也',
    //     icon: 'loading'
    //   });
    //   return;
    // }
    wx.navigateTo({
      url: '../order/order',
    });
  },
})