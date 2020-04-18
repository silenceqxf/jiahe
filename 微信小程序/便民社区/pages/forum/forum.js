// pages/forum/forum.js
var app = getApp()

Page({

  /*页面的初始数据*/
  data: {
    DataSource: [1, 1, 1, 1, 1],
    avatar: "http://images.liqucn.com/img/h1/h2/img201805261411490_info300X300.jpg",
    nickname:"whale",
    content:"现有安昕雅苑3号楼6单元22层内三室一厅户型对外出租，房间全部朝阳，采光极好、精装修、家电（电视、冰箱、空调、洗衣机、热水器等）、家具齐全，通天然气，面积120平米，可以直接拎包入住。承租人不能养宠物。价格面议。中介勿扰。联系人：王建国，电话：13789464599",
    resource:[       "https://imgwcs3.soufunimg.com/viewimage/agents1/2020_03/19/wap/newcertificate/43e712c3-3151-41a8-8353-bd94ea53137d/690x440c.png",
          "https://imgwcs3.soufunimg.com/viewimage/agents1/2020_03/04/wap/newcertificate/c9b81635-453d-4e90-a2e8-fa0818df2a2e/690x440c.png",
          "https://imgwcs3.soufunimg.com/viewimage/agents1/2019_12/11/wap/newcertificate/48e9f17b-73da-4259-9129-13aea2cea715/690x440c.jpg",
          "https://imgwcs3.soufunimg.com/viewimage/agents1/2020_02/19/wap/newcertificate/0e7416ea-ed39-49bb-897b-3b52e1be02ca/690x440c.jpg",
          "https://imgwcs3.soufunimg.com/viewimage/agents1/2020_03/10/wap/newcertificate/796dd5e1-1e80-46c8-978f-f811d1d02b52/690x440c.jpg",
    ],
    zanSource: ["李明", "王倩", "一剪寒梅", "流年", "马超", "王宝"],
    contnet:[{
      "firstname":"李明",
      "content":"房子好整洁啊！！！"
      },{
      "firstname":"王倩",
      "content":"刚好我有个朋友想租房"
      },{
      "firstname": "一剪寒梅",
      "content": "租金多少？"
      },{
      "firstname": "流年",
      "content": "房子不错，什么时候能去看下房"
    }],
    address:"西宁市城中区南京路安昕雅苑小区6单元1楼",
    createtime:"2020-03-20 10:14:23",

    photoWidth:wx.getSystemInfoSync().windowWidth/5,

    popTop:0, //弹出点赞评论框的位置
    popWidth:0, //弹出框宽度
    isShow: true, //判断是否显示弹出框

    userInfo: {}, // 存放用户信息
    animationData:{},
    animationData1:{},//发布按钮下滑动画
    userInfo:null,
  },

  //监听页面加载
  onLoad: function(options){
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })
    }

    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      console.log(userInfo);
      //更新数据
      that.setDate({
        userInfo: userInfo
      })
    }),

    //腾讯分析
    mta.Page.init();
  },

  //点击图片进行大图查看
  lookPhoto: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.photourl,
      urls: this.data.resource,
    })
  },

  //点击点赞的人
  touchZanUser: function (e) {
    wx.showModal({
      title: e.currentTarget.dataset.name,
      showCancel: false
    })
  },

  //删除朋友圈
  delete: function () {
    wx.showToast({
      title: '删除成功',
    })
  },

  //点击了点赞评论
  touchDiscuss: function (e) {
    // this.data.isShow = !this.data.isShow
    //动画
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear',
      delay: 0,
    })

    if (that.data.isShow == false) {
      that.setData({
        popTop: e.target.offsetTop - (e.detail.y - e.target.offsetTop) / 2,
        popWidth: 0,
        isShow: true
      })
      //0.3秒后滑动
      setTimeout(function () {
        animation.width(0).opacity(1).step()
        that.setData({
          animation: animation.export(),
        })
      }, 100)
    } else {
      //0.3秒后滑动
      setTimeout(function () {
        animation.width(120).opacity(1).step()
        that.setData({
          animation: animation.export(),
        })
      }, 100)

      that.setData({
        popTop: e.target.offsetTop - (e.detail.y - e.target.offsetTop) / 2,
        popWidth: 0,
        isShow: false
      })
    }
  },

  onloadRequest: function (e, page) {
    page = page == undefined ? 0 : page
    //console.debug(e+"---"+page)
    var that = this
    // 0是下滑刷新
    if (e == 0) {
      // 执行REQUEST请求相应的数据
      wx.request({
        url: app.requestUrl,
        data: {
          flag: 'pageData',
          data: that.data.userStatus,
          state: that.data.state,
          page: page
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        success: function (res) {
          console.log(res.data)
          // return;
          // 如果没有数据直接返回首页 有数据则展示
          if (res.data.length) {
            wx.hideToast()
            wx.stopPullDownRefresh()
            that.setData({
              resultData: res.data
            })

          }
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
    else if (e == 1) {
      // 执行REQUEST请求相应的数据
      wx.request({
        url: app.requestUrl,
        data: {
          flag: 'pageData',
          data: that.data.userStatus,
          state: that.data.state,
          page: page
        },
        header: {
          //'Content-Type': 'application/json',
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        success: function (res) {
          // 如果没有数据直接返回首页 有数据则展示
          if (res.data.length) {
            wx.hideToast()
            wx.stopPullDownRefresh()
            for (var ii = 0; ii < res.data.length; ii++) {
              that.data.resultData.push(res.data[ii])
            }

            that.setData({
              resultData: that.data.resultData
            })
          }
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
  },

  // LOADING加载
  bindLoding: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
  },

  //下拉刷新
  onPullDownRefresh: function () { 
    var that = this
    that.bindLoding()
    that.onloadRequest(0)
    that.setData({
      page: 1,
      resultData: []
    })
  },

  //滚动事件
  scrollHandle: function (e) { 
    console.log(e.detail.scrollTop)
    var anum = e.detail.scrollTop <= 20 ? 20 : e.detail.scrollTop
    var that = this
    that.donghua(anum)
  },
  donghua:function (topNum) // 发布按钮动画
  {
    var that = this
    // 动画1
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',
      delay: 0,
    })

    var animation1 = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',
      delay: 0,
    })

    animation.opacity(0).translateY(topNum + 5).step()
    animation1.opacity(0).translateY(topNum + 5).step()

    that.setData({
      animationData1: animation.export(),
      animationData2: animation1.export()
    })

    setTimeout(function () {
      animation.opacity(1).step()
      animation1.opacity(1).step()

      that.setData({
        animationData1: animation.export(),
        animationData2: animation1.export()
      })
    }, 1500)
  },

  //滚动加载
  scrollLoading: function () {
    var that = this
    //console.log(that.data.page)
    that.setData({
      page: that.data.page + 1
    })
    that.bindLoding()
    that.onloadRequest(1, that.data.page)
    that.setData({
      scrolltop: that.data.scrolltop
    })
  },

  //跳转朋友圈
  bindAdd: function () {
    var that = this
    // 用户朋友圈输入
    wx.showActionSheet({
      itemList: ['发布'],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)

          if (res.tapIndex == 0) {
            wx.redirectTo({
              url: '../../pages/addComment/addComment?userId=' + that.data.userStatus.userId + '&address=' + that.data.userStatus.address + '&name=' + that.data.userStatus.name + '&lat=' + that.data.userStatus.lat + '&lnt=' + that.data.userStatus['lnt']
            })
          }
        }
      }
    })
  },


  // 处理点赞
  bindDianZan: function()
  {
    var that = this
    var userId = app.userId
    var dz_id = that.data.dz_id

    wx.request({
      url: app.requestUrl,
      data:{
        flag: 'addDZ',
        userId: userId,
        id: dz_id,
        nickname: that.data.userInfo.nickName
      },

      header:{
        'content-type': 'application/x-www-form-urlencoded',
      },

      method: 'POST',
      success: function (res) {
        console.log(res.data.status)
        // 1是点赞 2是取消点赞
        if (res.data.status == 1) {
          // 循环当前节点找到点赞ID对应的节点
          for (var ii = 0; ii < that.data.resultData.length; ii++) {
            if (that.data.resultData[ii].id == dz_id) {
              // 如果当前数组下dianzan为null证明还没有人点赞则直接添加 否则添加当前人昵称+之前人的点赞
              if (that.data.resultData[ii]['dianzan'] == 'null') {
                that.data.resultData[ii]['dianzan'] = that.data.userInfo.nickName
              }
              else {
                that.data.resultData[ii]['dianzan'] = that.data.userInfo.nickName + "," + that.data.resultData[ii]['dianzan']
              }
              break
            }
          }
        }
        else if (res.data.status == 2) {
          // 循环当前节点找到点赞ID对应的节点
          for (var ii = 0; ii < that.data.resultData.length; ii++) {
            if (that.data.resultData[ii].id == dz_id) {
              // 当前点赞列表拆分数组
              var dzArr = that.data.resultData[ii]['dianzan'].split(",")
              // 计算当前数组的长度 如果长度小于2则赋值为null 否则删除当前元素后返回新的数组
              if (dzArr.length < 2) {
                that.data.resultData[ii]['dianzan'] = 'null'
              }
              else {
                // 循环数组删除当前点赞的昵称
                for (var dz = 0; dz < dzArr.length; dz++) {
                  if (dzArr[dz] == that.data.userInfo.nickName) {
                    dzArr.splice(dz, 1)
                    break
                  }
                }

                that.data.resultData[ii]['dianzan'] = dzArr.join(",")
              }
              break
            }
          }
        }
        // 重置数据
        that.setData({
          resultData: that.data.resultData,
          cz_flag: false
        })
      },
      fail: function (lb) {
        console.log(lb)
      }
    })
  },

  //处理评论
  bindPingLunA: function() 
  {
    var that = this
    var userId = app.userIdd
    var dz_id = that.data.dz_id
    wx.redirectTo({
      url: '../addPingLun/addPingLun?id=' + dz_id + '&userId=' + userId + '&state=0'
    })
  },

})

