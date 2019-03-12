// pages/fatie/fatie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://94.191.106.228:8080/Agriculture',
    focus: false,
    content:'',
    fid:'',
    openid:''
  },
  bindButtonTap() {
    this.setData({
      focus: true
    })
  },
  fabu:function(){
    let that=this;
   console.log(that.data.title)
   console.log(that.data.content)
    var userId = wx.getStorageSync('userinfo');
 
    console.log(userId);
    if(that.data.content==''){
      wx.showToast({
        title: '请在发布之前填写你的标题和内容!',
        icon: 'none',
        duration: 2000
      })
    }else{
      
      wx.request({
        url: that.data.url + '/agro/agroCommentIn', // 仅为示例，并非真实的接口地址
        method: 'post',
        data: {
          forumId:that.data.fid,
          comment:that.data.content,
          openId:that.data.openid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          
          wx.showToast({
            title: '回复成功!',
            icon: 'success',
            duration: 2000
          })
           wx.navigateBack({
            
           })
        }
      })
    }
  
  },
  bindinput:function(e) {
    let that=this;
    that.setData({
      content: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.setData({
      fid:options.id
    })
    var userId = wx.getStorageSync('userinfo');
    console.log(userId.openId);
    if (userId == '') {
      wx.showToast({
        title: '请确认网络是否通畅，无法获取您的微信账号信息!',
        icon: 'none',
        duration: 2000
      })
    } else {
      
      that.setData({
      openid:userId.openId
      })
    }
    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success(res) {
    //           console.log(res.userInfo)
    //         }
    //       })
    //     }
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})