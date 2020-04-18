//pages/phone_number/phone_number.js
Page({
  data:{
    phone_numbers:[
      {
        id:"num-1",
        organization:"公安报警",
        num:"110"
      },{
        id: "num-2",
        organization: "火警",
        num: "119"
      },{
        id: "num-3",
        organization: "医疗救护",
        num: "120"
      },{
        id: "num-4",
        organization: "燃气热线",
        num: "96277743"
      },{
        id: "num-5",
        organization: "小区安保处",
        num: "92456267"
      },{
        id: "num-6",
        organization: "物业管理处电话",
        num: "86825511"
      },{
        id: "num-7",
        organization: "城南新区管委会",
        num: "82690049"
      },{
        id: "num-8",
        organization: "城南新区派出所",
        num: "86631394"
     }]
  },
  call:function(e){
    console.log(e.target.dataset.phoneNum);
    var phone_num = e.target.dataset.phoneNum;
    wx.makePhoneCall({
      phoneNumber:phone_num
    })
  }
})