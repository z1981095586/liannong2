// pages/conminuity/conminuity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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