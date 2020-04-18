// pages/second_level/repairs/repairs.js
Page({
  data:{
    imageUrl:[],
    _num:3,
    suggestsList:[]
  },
  onLoad:function(options){
    //页面初始化 options为页面跳转所带来的参数
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
  bindFormSubmit:function(e){
    console.log(e.datail.value.textarea)
  },
  
  /*上传图片*/
  upLoadImage:function(){
    var that = this;//this对象在程序中随时会改变，而var that=this之后，that没改变之前仍然是指向当时的this，就不会找不到原来的对象
    wx.chooseImage({//wx.chooseImage(object,object)从本地相册选择图片或使用相机拍照。
      count: 9,//最多可以选择的图片张数
      sizeType: ['original', 'compressed'],//所选的图片的尺寸
      sourceType: ['album', 'camera'],//选择图片的来源
      success:function(res){
        //返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片；
        var uploadedImageLists = that.data.imageUrl;
        console.log(res.tempFilePaths);
        var totalImages = uploadedImageLists.concat(res.tempFilePaths);
        var aNum = 0;
        if(totalImages.length >= 9){
          totalImages.length = 9;
          aNum = 1;
        }
        console.log(totalImages)
        that.setData({
          num:0,
          addNum:aNum,
          imageUrl:totalImages
        })
      }
    })
  },

  /*删除图片*/
  removeImage:function(e){
    var that = this;
    var currentImageLists = that.data.imageUrl;
    currentImageLists.splice(e.target.dataset.index,1);//splice(要删除项的位置，删除数量)
    that.setData({
      imageUrl:currentImageLists
    })
    if (currentImageLists.length < 9 && currentImageLists.length >= 1){
      that.setData({
        addNum: 0//表示还可以增加图片，增加图片的图标出现
      })
    } else if (currentImageLists.length === 0){
      that.setData({
        addNum: 1,//此时增加图片的图标不出现
        num:1
      })
    }
  },

  /*在新页面预览图片*/
  preImage:function(e){
    var that = this;
    var currentImageUrl = that.data.imageUrl[e.target.dataset.index]
    wx.previewImage({// wx.previewImage(object,object) 在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作。
      current:currentImageUrl,//当前显示图片的http链接
      urls:that.data.imageUrl//需要预览的图片http链接列表
    })
  },

  /*提交表单*/
  formSubmit:function(e){
     var suggestsList = this.suggestsList;
     var suggest = e.detail.value;
     var currentSuggestsList = suggestsList.push(suggest);
     this.setData({
       suggestsList:currentSuggestsList
     })
  }
})