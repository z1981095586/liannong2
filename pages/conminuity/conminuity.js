// pages/conminuity/conminuity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://94.191.106.228:8080/Agriculture',
    imgUrls: [
      'https://s2.ax1x.com/2019/03/04/kOHW0U.png',
      'https://s2.ax1x.com/2019/03/04/kOHIh9.png'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    currentTab: 0,
    hotpageNo: 1,
    hotpageSize: 5,
    hotmeslist: [],
    newpageNo: 1,
    newpageSize: 5,
    newmeslist: [],
    newhigth: 0,
    hothigth: 0,
    listhigth: 0,
    isBottom: 0,
    isBottomhot: 0,
    isBottomnew: 0,
    superhotmes: [],
    tiezi:[],
    tiezi2:[],
    pageNo:1,
    h:1000,
    flag:false,
    flag2:false
  },
  detailPage:function(event){
    console.log(event.currentTarget.id);
    wx.navigateTo({
      url: '../xiangqing/xiangqing?id='+event.currentTarget.id
    })
  },
  torelease:function(){
    var userId = wx.getStorageSync('userinfo').openId;
    if(userId==""){
      wx.showToast({
        title: '请先登录！',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.navigateTo({
        url: '../fatie/fatie'
      })
    }
 
  },
  //点击切换
  clickTab: function (e) {
    var _this = this;
    // console.log(e);
    // console.log(_this.data.newhigth);
    if (_this.data.currentTab === e.target.dataset.current) {

      return false;
    } else {
      this.sethight();
      _this.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  //设置最新热门的高度
  sethight: function () {
    var _this = this;
    if (_this.data.currentTab == 1) {
      _this.setData({
        isBottom: _this.data.isBottomhot,
        listhigth: _this.data.hothigth
      })
    }
    else {
      _this.setData({
        isBottom: _this.data.isBottomnew,
        listhigth: _this.data.newhigth
      })
    }
  },
  //滑动切换
  swiperTab: function (e) {
    var _this = this;
    _this.setData({
      currentTab: e.detail.current
    });
    this.sethight();
  },
  //点击切换
  clickTab: function (e) {
    var _this = this;
    // console.log(e);
    // console.log(_this.data.newhigth);
    if (_this.data.currentTab === e.target.dataset.current) {

      return false;
    } else {
      this.sethight();
      _this.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  // 获取热门帖子
  tiezi2: function () {
    let that = this;
    wx.request({
      url: that.data.url +'/agro/getForumList', // 仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        pageSize: 3,
        pageNo: that.data.pageNo,
        typeId:2
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.itemForum);
        var returnArr = that.data.tiezi2;
        for (var i = 0; i < res.data.itemForum.length; i++) {
          returnArr.push(res.data.itemForum[i]);
          returnArr[i].year = returnArr[i].year + ' ';


        }
        if (res.data.itemForum.length < 3) {

          that.setData({
            flag2: true
          })

        }
        that.setData({
          tiezi2: returnArr
        })
      }
    })
  },
  // 获取帖子
  tiezi:function(){
    let that = this;
    wx.request({
      url: that.data.url +'/agro/getForumList', // 仅为示例，并非真实的接口地址
      method: 'post',
      data: {
        pageSize:3,
        pageNo:that.data.pageNo,
        typeId:1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.itemForum);
         var returnArr = that.data.tiezi;
         for (var i = 0; i < res.data.itemForum.length; i++) {
           returnArr.push(res.data.itemForum[i]);
           returnArr[i].year = returnArr[i].year+' ';
          
         
         }
        if (res.data.itemForum.length < 3) {
     
          that.setData({
            flag:true
          })

        }
         console.log(returnArr)
        that.setData({
           tiezi: returnArr
         })
         console.log(that.data.tiezi);
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  let that=this;
  that.tiezi();
  that.tiezi2();
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
    let that = this;
    that.setData({
      tiezi: [],
      tiezi2: [],
      pageNo: 1,
      h: 1000,
      flag: false,
      flag2: false
    })
    that.tiezi();
    that.tiezi2();
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
       tiezi: [],
       tiezi2:[],
       pageNo: 1,
       h: 1000,
       flag: false,
       flag2:false
     })
     that.tiezi();
     that.tiezi2();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // let that = this;
    let that = this;
    let newdata = that.data.pageNo + 1;
    let h2;
    if(that.data.flag==false){
      h2= that.data.h + 1000;
    }
    that.setData({
      pageNo: newdata,
      h:h2
    })
    that.tiezi();
    that.tiezi2();
    console.log(newdata)
    // that.tiezi();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})