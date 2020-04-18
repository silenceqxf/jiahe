// var appPath = 'https://www.wxfont.com';
var appPath='http://localhost';

//图片资源
var img220 = appPath + '/upload/img_220';

// var protocol = 'http';
// var host = 'localhost:666/server'

//api请求
// var api_get_all_product = appPath + '/api/product/all';
var api_get_hot_product = appPath + '/api/product/hot';
var api_get_mode_product = appPath + '/api/product/mode';
var api_get_recent_product = appPath + '/api/product/recent';
var api_get_one_product = appPath + '/api/product/one';
var api_get_all_staff = appPath + '/api/staff/all';
var api_get_one_staff = appPath + '/api/staff/one';
var api_post_one_book = appPath + '/api/book/one';
var api_send_one_pv = appPath + '/api/pv/one';
var api_get_all_book = appPath + '/api/book/all';
var api_cancel_one_book = appPath + '/api/book/cancel';

// 获取用户openid和unionid
// getUniqueID: `${protocol}://${host}/Home/Login/get_uniqueid`;

// 获取购物车商品列表(通过若干goods_id获取)
//getGoodsListInCart: `${protocol}://${host}/Home/Goods/get_goods_list_in_cart`;

// 获取商品列表
// getGoodsList: `${protocol}://${host}/Home/Goods/get_goods_list`;

// // 获取商品信息
// getGoods: `${protocol}://${host}/Home/Goods/get_goods`;

// // 获取商品展示图信息
// getGoodsBanner: `${protocol}://${host}/Home/Goods/get_goods_banner`;

// // 用户反馈
// postFeedback: `${protocol}://${host}/Home/Index/post_feedback`;

// // 生成预订单
// preOrder: `${protocol}://${host}/Home/Order/pre_order`;

// // 创建订单
// createOrder: `${protocol}://${host}/Home/Order/create_order`;

// // 查看订单
// getOrderList: `${protocol}://${host}/Home/Order/order_list`;

// // 查看物流
// getDeliveryStatus: `${protocol}://${host}/Home/Order/delivery_status`;

module.exports = {
  img220: img220,

  // api_get_all_product,
  api_get_hot_product,
  api_get_recent_product,
  api_get_mode_product,
  api_get_one_product,
  api_get_all_staff,
  api_get_one_staff,
  api_post_one_book,
  api_send_one_pv,
  api_get_all_book,
  api_cancel_one_book,

  // getUniqueID,
 // getGoodsListInCart,
  // getGoodsList,
  // getGoods,
  // getGoodsBanner,
  // postFeedback,
  // preOrder,
  // createOrder,
  // getOrderList,
  // getDeliveryStatus,
  // 后台用户名
  mid: '100'
}