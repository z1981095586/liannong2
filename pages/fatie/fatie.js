// pages/fatie/fatie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://94.191.106.228:8080/Agriculture',
    focus: false,
    title: '',
    content:''

  },
  bindButtonTap() {
    this.setData({
      focus: true
    })
  },
  bindKeyInput(e) {
    this.setData({
      title: e.detail.value
    })
  },
  fabu:function(){
    let that=this;
   console.log(that.data.title)
   console.log(that.data.content)
    // let that = this;
    // wx.request({
    //   url: 'http://192.168.1.105:8081/com.crazyBird/agro/forumInput', // 仅为示例，并非真实的接口地址
    //   type: 'POST',
    //   data: {
    //     pageSize: 3,
    //     pageNo: that.data.pageNo
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data.itemForum);
    //     var returnArr = that.data.tiezi;
    //     for (var i = 0; i < res.data.itemForum.length; i++) {
    //       returnArr.push(res.data.itemForum[i]);
    //       returnArr[i].year = returnArr[i].year + ' ';


    //     }
    //     if (res.data.itemForum.length < 3) {

    //       that.setData({
    //         flag: true
    //       })

    //     }
    //     console.log(returnArr)
    //     that.setData({
    //       tiezi: returnArr
    //     })
    //     console.log(that.data.tiezi);
    //   }
    // })
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