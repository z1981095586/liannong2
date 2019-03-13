// pages/xiangqing/xiangqing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://94.191.106.228:8080/Agriculture',
   id:0,
   brow:0,
    content:'',
   day:0,
    minute:0,
    name:'',
   year:0,
    titlePic:'',
   huifu:[],
   number:0,
    openId:'',
    fid:''
  },
  huifu:function(){
    let that = this;
    console.log(that.data.id);
    wx.request({
      url: that.data.url +'/agro/getAgroComment', // 仅为示例，并非真实的接口地址
      type: 'GET',
      data: {
        forumId:that.data.id,
        
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          huifu:[],
          son:[]
        })
         var returnArr = that.data.huifu;
         var sonArr=that.data.son;
 
           for (var i = 0; i < res.data.items.length; i++) {
           returnArr.push(res.data.items[i]);
           
            //  console.log(res.data.items[i].item);
           sonArr.push(res.data.items[i].item);  
          }

     
           that.setData({
             huifu: returnArr,
             number:res.data.items.length,
             son:sonArr
           })

           console.log(that.data.son);
        
          console.log(that.data.huifu);
      }
    })
  },
  torelease:function(event){
    wx.navigateTo({
      url: '../huifu/huifu?id=' + event.currentTarget.id
    })
  },
  louzhu:function() {
    let that = this;
    wx.request({
      url: that.data.url +'/agro/forumDetails/' + that.data.id, // 仅为示例，并非真实的接口地址
      type: 'GET',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
          console.log(res.data.details);
          that.setData({
            fid: res.data.details.id,
            brow: res.data.details.brow,
            content: res.data.details.content,
            day: res.data.details.day,
            minute: res.data.details.minute,
            name: res.data.details.name,
            year: res.data.details.year+' ',
            titlePic: res.data.details.titlePic,
          })
  


      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userId = wx.getStorageSync('userinfo').openId;
    this.setData({
      openId: userId
    })
  console.log(options.id);
  let that=this;
  that.setData({
    id:options.id
  })
  that.louzhu();
  that.huifu();
  },
  // 获取楼主帖子内容

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that=this;
    that.louzhu();
    that.huifu();
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
    let that = this;
    that.setData({
      brow: 0,
      content: '',
      day: 0,
      minute: 0,
      name: '',
      year: 0,
      titlePic: '',
      huifu: []
    })
    that.louzhu();
    that.huifu();

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