// pages/user/Store/BLphoto/BLphoto.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    simage: '../../../../images/addpic.png',
    arr_img: [],
    type: null,
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
  addPic: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          simage: tempFilePaths[0]
        })
        console.log(that.data.simage)
        wx.getImageInfo({
          src: tempFilePaths[0],
          success: function (res) {
            console.log(res.type)
            that.setData({
              type: res.type
            })

          }
        })
        console.log(that.data.type)
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  uploadImg: function () {
    var that = this;
    var simage = that.data.simage;
    if (that.data.simage == "../../../../images/addpic.png") {
      wx.showToast({
        title: '请上传商标',
        icon: 'none',
        duration: 3000
      })
    }
    else {
      wx.uploadFile({
        url: 'http://94.191.106.228:8080/Agriculture/upload/avatar',
        filePath: simage,
        name: 'file',
        formData: {
          picType: that.data.type
        }, //这里是上传图片时一起上传的数据
        success: (resp) => {
          console.log(JSON.parse(resp.data))
          that.setData({
            arr_img: JSON.parse(resp.data).urlList[0]
          })
          wx.setStorage({
            key: 'licence',
            data: that.data.arr_img
          })
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          wx.navigateTo({
            url: '../StoreDetail/StoreDetail'
          })
        },
      });
    }
  },
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