var url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
var login = require('../../utils/wxlogin.js')
Page({

      /**
       * 页面的初始数据
       */
      data: {
        userInfo: null
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
        wx.showLoading({
          title: '加载中',
        })
        console.log(this.data.userInfo)
      },

      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function() {

      },
     toMyMoney:function(){//我的资产
       wx.navigateTo({
         url: 'Money/Money',
         success: function(res) {},
         fail: function(res) {},
         complete: function(res) {},
       })
     },
  toStoreEnter:function(){//商家入驻
          wx.navigateTo({
            url: 'Store/Store',
          })                              
  },
  toMyCard:function(){
    wx.navigateTo({
      url: 'Card/Card',
    })    
  },
  toMyCard:function(){
    wx.navigateTo({
      url: 'Address/Address',
    })
  },
  }
      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function() {
        var that = this
        login.wxLogin(0, function(res) {//登录调用
              console.log(res);
              that.setData({
                userInfo: res
              })
              console.log(that.data.userInfo)
             wx.hideLoading();  //隐藏加载中
            })
          
          },

          /**
           * 生命周期函数--监听页面隐藏
           */
          onHide: function() {

          },

          /**
           * 生命周期函数--监听页面卸载
           */
          onUnload: function() {

          },

          /**
           * 页面相关事件处理函数--监听用户下拉动作
           */
          onPullDownRefresh: function() {

          },

          /**
           * 页面上拉触底事件的处理函数
           */
          onReachBottom: function() {

          },

          /**
           * 用户点击右上角分享
           */
          onShareAppMessage: function() {

          }
      })