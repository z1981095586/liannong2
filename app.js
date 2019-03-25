//app.js
var url = require('config.js')
App({
  onLaunch: function () {
    this.login();
    //  this.test();
  },
  login() {
    var that = this;
    // 登录
    wx.login({
      success: resp => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(resp);
        var that = this;
        // 获取用户信息
        wx.getSetting({
          success: res => {
            //  console.log(res);
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: userResult => {
                  var platUserInfoMap = {}
                  platUserInfoMap["encryptedData"] = userResult.encryptedData;
                  platUserInfoMap["iv"] = userResult.iv;
                  wx.request({
                    url: url.host+'/agro/login',
                    method: 'POST',
                    data: {
                      platCode: resp.code,
                      platUserInfoMap: platUserInfoMap,
                    },
                    header: {
                      'content-type': 'application/json',
                    },
                    success(res) {
                      if (res.data.code == 200) {
                        wx.setStorageSync("userinfo", res.data)
                        wx.setStorageSync("accessToken", res.accessToken)
                        wx.setStorageSync("isBinding", res.data.isBinding)

                      }

                    }
                  })
                  if (that.userInfoReadyCallback) {
                    that.userInfoReadyCallback(userResult)
                  }
                }
              })
            } else {
              wx.redirectTo({
                url: "/pages/start/start"
              })
            }

          }
        })
      }
    })
  },
  //隐藏底部导航栏
  test: function () {
    var that = this;
    wx.request({
      url: 'http://94.191.106.228:8080/Agriculture/agro/getHide',
      method:"post",
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        if (res.data== 1) {
          wx.hideTabBar({

          })
        } else {
          wx.showTabBar({

          })
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    content: [],
    flag: false
  }
  

})