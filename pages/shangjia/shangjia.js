// pages/shangjia/shangjia.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
list:[],
sjid:0,
sjinfo:[],
spinfo:[],
dianming:'',
shopName:'',
shopId:'',
  },
  xiangqing:function(event){
    wx.navigateTo({
      url: '../shangpin/shangpin?id=' + event.currentTarget.id
    })
  },
shangpin:function(){
let that=this;
  console.log(that.data.sjid)
  wx.request({
    url: 'http://192.168.1.105:8081/com.crazyBird/agro/getGoodsList', // 仅为示例，并非真实的接口地址
    type: 'GET',
    data: {
      sid: that.data.sjid
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      console.log(res.data.itemGoods);
       var returnArr = that.data.spinfo;
       for (var i = 0; i < res.data.itemGoods.length; i++) {
        returnArr.push(res.data.itemGoods[i]);

       }
       console.log(returnArr)
       that.setData({
         spinfo: returnArr
       })
        console.log(that.data.spinfo);
    }
  })
},
sjinfo:function(){
  let that=this;
  console.log(that.data.sjid)
  wx.request({
    url: 'http://192.168.1.105:8081/com.crazyBird/agro/getShopList', // 仅为示例，并非真实的接口地址
    type: 'GET',
    data: {
      sid: that.data.sjid
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
       console.log(res.data.itemShop);
       var returnArr = that.data.sjinfo;
       let sjname;
       for (var i = 0; i < res.data.itemShop.length; i++) {
         returnArr.push(res.data.itemShop[i]);
         sjname = res.data.itemShop[i].shopName;
        }
        // console.log(returnArr)

       that.setData({
          dianming:sjname,
         sjinfo: returnArr
      })
      //  console.log(that.data.sjinfo);
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    let that=this;
    // 滚动条数据
    that.setData({
      sjid:options.id,
      list: [{

        name: "爱美食,怎么能不来启农呢!"

      },

        { name: "爱美食,欢迎来到我们的店铺!" },

        { name: "爱美食,勤劳奉献,感恩顾客!" }]

    })
    that.sjinfo();
    that.shangpin();
    console.log(that.data.dianming);
    wx.setNavigationBarTitle({
      title: that.data.dianming
    })
    

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
    let that = this;

    that.setData({

      list: [],
      sjinfo: [],
      spinfo: [],
      dianming: '',
    })

    that.sjinfo();
    that.shangpin();
    wx.stopPullDownRefresh();
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