//app.js
var api = require('./utils/api.js')
var config = require('./utils/config.js')
var util = require('./utils/util.js')

App({
  data: {
    users: [],
    messages: [
      {
        id: "message-1",
        title: "关于“书香换花香”活动的通知",
        date: "3月20日",
        author: "管理员",
        cover: "/images/message_1.jpeg",
        content: "\n各位居民：\n3月12日是一年一度的植树节，为深入开展全民义务植树活动，倡导绿色文明之风，建设美丽社区。滨文社区将在３月10日上午，开展“书香换花香”活动。\n活动内容：每八本书籍换一盆绿色植物。\n书籍要求：要求非杂志和教科书，（数量有限换完为止）\n活动时间：2020年3月24日 \n活动地点：安昕雅苑小区（3-6号楼）之间"
      },
      {
        id: "message-2",
        title: "关于垃圾分类宣传及知识问卷调查活动的通知",
        date: "3月15日",
        author: "管理员",
        cover: "/images/message_2.png",
        content: "\n各位居民：\n为了培养居民垃圾分类的意识，更好的开展小区垃圾分类工作，社区定于3月24日上午在滨文苑小区开展垃圾分类宣传及垃圾分类知识问卷调查活动。希望广大居民相互转告，积极参与！\n活动时间：3月24日上午9点开始\n活动地点：安昕雅苑小区（3-6号楼）之间"
      },
      {
        id: "message-3",
        title: "关于滨文社区 “3.5学雷锋日”志愿者活动通知",
        date: "3月3日",
        author: "管理员",
        cover: "/images/message_3.jpeg",
        content: "\n各位居民：\n为进一步弘扬雷锋精神，倡导时代新风正气，在第54个学雷锋纪念日来临之际，滨文社区将联合高校及志愿者在社区开展小家电维修、理发、听力检测、中医推拿、量血压、测血糖、磨剪刀等志愿活动，请居民朋友们相互转告，积极参与。\n志愿活动时间：2020年3月25日上午9点\n志愿活动地点：滨文社区江畔云庐幸福驿站"
      }
    ],
  },
  // onLaunch: function () {
  //   // 展示本地存储能力
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)

  onLaunch: function () {
    this.getUserInfo();
  },
  getUserInfo: function () {
    var that = this
    //调用登录接口
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userInfo = res.userInfo
            console.log("globalData====" + JSON.stringify(that.globalData));

            //获取uuid
            var uuid = wx.getStorageSync('uuid');
            if (!uuid) {
              uuid = util.uuid(13, 10);
            }
            console.log("uuid====" + uuid);
            wx.setStorageSync('userInfo', that.globalData.userInfo);
            wx.setStorageSync('uuid', uuid);
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})