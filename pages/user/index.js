var url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
var login = require('../../utils/wxlogin.js')
var app = getApp()
Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
    isboundUser: '绑定学号',
    platUserInfoMap: {},
    code: '',
    balance: '0',
    messageNum: 0,
    dallNum: 0,
    launchnum: 0,
    luckynum: 0,
  },
  onLoad: function (options) {
    // wx.showLoading({
    //   title: '加载中',
    // })
    console.log(this.data.userInfo)

  },



  //绑定页面
  binding: function () {
    wx.navigateTo({
      url: 'binding/binding'
    })
  },
  // 未登陆页面
  // binding1: function () {
  //   wx.navigateTo({
  //     url: '../start/start'
  //   })
  // },
  //跳转待付款页面
  toDaiPay: function () {
    wx.navigateTo({
      url: '../Myorder/MyorderDaiPay/MyorderDaiPay'
    })
  },
  // 跳转商家入驻页面
  toStoreEnter:function(){
    wx.navigateTo({
      url: 'Store/Store'
    })
  },
  //跳转待发货页面
  toDaiFaHuo: function () {
    wx.navigateTo({
      url: '../Myorder/MyorderDaiFaHuo/MyorderDaiFaHuo'
    })
  },
  //跳转待收货
  toDaiShouHuo: function () {
    wx.navigateTo({
      url: '../Myorder/MyorderDaiShouHuo/MyorderDaiShouHuo',
    })
  },
  //跳转评论
  toView: function () {
    wx.navigateTo({
      url: '../Myorder/MyorderView/MyorderView',
    })
  },
  //跳转退款
  toTuiKuan: function () {
    wx.navigateTo({
      url: '../Myorder/MyorderTuiKuan/MyorderTuiKuan',
    })
  },
  //跳转全部订单
  toAllOrder: function () {
    wx.navigateTo({
      url: '../Myorder/Myorder',
    })
  },
  //跳转意见反馈
  toIdeaBack: function () {
    wx.navigateTo({
      url: 'ideaBack/ideaBack',
    })
  },
// 跳转足迹页面
  toZuJi: function () {
    wx.navigateTo({
      url: 'ZuJi/ZuJi',
    })
  },
  // 跳转我的卡劵
  toCard: function () {
    wx.navigateTo({
      url: 'Card/Card',
    })
  },
  // 跳转我的资产
  toMoney: function() {
    wx.navigateTo({
      url: 'Money/Money',
    })
  },
  //跳转我的收藏
  toFavorite: function () {
    wx.navigateTo({
      url: 'Favorite/Favorite',
    })
  },
  // 收货地址
  toAddress: function () {
    wx.navigateTo({
      url: 'Address/Address',
    })
  },
  //跳转关于我们
  toAboutUs: function () {
    wx.navigateTo({
      url: 'aboutUs/aboutUs',
    })
  },
  onReady: function () {
  },
  onShow: function () {
    var that = this
    login.wxLogin(0, function (res) {
      console.log(res);
      that.setData({
        userInfo: res,
      })
      console.log(that.data.userInfo)
      wx.hideLoading();
      if (that.data.userInfo.isbound == 1) {
        that.setData({
          isboundUser: '已绑定'
        })
      }
      

    });

  },
  onHide: function () {
  },
  onUnload: function () {
  },
  onPullDownRefresh: function () {
  },
  onReachBottom: function () {
  },
  onShareAppMessage: function () {
  }
})