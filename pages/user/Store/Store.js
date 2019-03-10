Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['水果','蔬菜','畜牧','旅游','学农教育','聚点','散户','其他'],
    openId: '',
    shopName: '',
    stype: '请点击选择',
    saddress: '',
    name: '',
    phone: '',
    simage: 'https://s2.ax1x.com/2019/03/06/kvnXV0.png',
    buttonShow: 'block',
    location: '',
    index:0 //选择主营项目类型
  },
  //获取主营项目
  bindPickerChange: function (e) {
    
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      stype: this.data.array[e.detail.value]
    })
    console.log(this.data.stype)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取openId
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success(res) {
        that.setData({
          openId: res.data.openId
        })
      }
    })

  },

  shopNameInput: function(e) {
    let name = e.detail.value;
    console.log(name)
    this.setData({
      shopName: e.detail.value
    })
  },
  // shopSortInput: function(e) {
  //   console.log(e.detail.value)
  //   this.setData({
  //     stype: e.detail.value
  //   })
  // },
  hostNameInput: function(e) {
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  phoneInput: function(e) {
    console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },
  // addressInput: function (e) {
  //   console.log(e.detail.value)
  //   this.setData({
  //     saddress: e.detail.value
  //   })
  // },
  //获取地址
  dizhi: function(e) {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
        that.setData({
            buttonShow: 'none',
            saddress: res.name,
          location: res.longitude + ',' + res.latitude,
          }),
          console.log(that.data.saddress)
        console.log(that.data.location)
      },
    })
  },
  //上传图片
  shangChuang: function(e) {
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
        //  wx.uploadFile({
        //    url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
        //    filePath: tempFilePaths[0],
        //    name: 'file',
        //    success(res) {
        //      const data = res.data
        //      that.setData({
        //        simage: res.data
        //      })
        //    }
        //  })
      }
    })


  },
  //提交数据
  SumbitBtn: function(e) {
    console.log(this.data)
    var that = this;
    var phone = that.data.phone;
    var shopName = that.data.shopName;
    var saddress = that.data.saddress;
    var name = that.data.name;
    var simage = that.data.simage;
    var stype = that.data.stype;
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (shopName == '' || shopName == null) {
      wx.showToast({
        title: '请输入商户名称',
        icon: 'none',
        duration: 3000
      })
    } else if (simage == 'https://s2.ax1x.com/2019/03/06/kvnXV0.png') {
      wx.showToast({
        title: '请上传商标',
        icon: 'none',
        duration: 3000
      })
    } else if (stype =='请点击选择'){
      wx.showToast({
        title: '请选择主营项目',
        icon: 'none',
        duration: 3000
      })
    }
     else if (name == '' || name == null) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 3000
      })
    } else if (!myreg.test(phone)) {
      wx.showToast({
        title: '请填写正确的手机号码',
        icon: "none",
        duration: 3000
      })
    } else if (saddress == '' || saddress == null) {
      wx.showToast({
        title: '请输入地址',
        icon: 'none',
        duration: 3000
      })
    } else {
      wx.request({
        url: 'http://192.168.1.105:8081/com.crazyBird/agro/shopInput',
        method: 'POST',
        data: {
          'shopName': that.data.shopName,
          'stype':that.data.index+1 ,
          'saddress': that.data.saddress,
          'phone': that.data.phone,
          'name': that.data.name,
          'simage': that.data.simage,
          'location': that.data.location,
          'openId': that.data.openId,
          'initial': 0,
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log(res)
            if (res.data.code == 200) {
              wx.showModal({
                title: '提示',
                content: '申请成功',
                showCancel: false,
                success(res) {
                  if (res.confirm) {
                    console.log(res.confirm)
                    wx.navigateBack({})
                  }
                }
              })

          }
        }

      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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