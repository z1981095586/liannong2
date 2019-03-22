// pages/shangjia/shangjia.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://94.191.106.228:8080/Agriculture',
list:[],
sjid:0,
sjinfo:[],
spinfo:[],
dianming:'',
shopName:'',
shopId:'',
fenlei:[],
current_item:0
  },
  xiangqing:function(event){
    wx.navigateTo({
      url: '../shangpin/shangpin?id=' + event.currentTarget.id
    })
  },
  white: function (e) {
    var that = this;
    let cuu = e.currentTarget.dataset.key;//获取index值
    console.log(cuu);
    that.setData({
      current_item: cuu
    })
    wx.request({
      url: that.data.url + '/agro/getGoodsTypeList', // 仅为示例，并非真实的接口地址
      method: 'post',
      data: {
        shopId:that.data.sjid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.itemGoodsType);
        var returnArr=[];
        for (var i = 0; i < res.data.itemGoodsType.length; i++) {
          returnArr.push(res.data.itemGoodsType[i].itemGoods);
        }
         console.log(returnArr)
        //  that.setData({
        //    spinfo: returnArr
        //  })
        //  console.log(that.data.spinfo);
      }
    })

  },
  //分类栏
fenlei:function(){
  let that = this;
  console.log(that.data.sjid)
  wx.request({
    url: that.data.url + '/agro/getGoodsType', // 仅为示例，并非真实的接口地址
    method: 'post',
    data: {
      shopId: that.data.sjid
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      console.log(res);
       that.setData({
         fenlei: []
       })
       var returnArr = that.data.fenlei;
 
      for (var i = 0; i < res.data.itemGoodsType.length; i++) {
         returnArr.push(res.data.itemGoodsType[i]);
       }
       console.log(returnArr)
   

      that.setData({
      fenlei: returnArr
     })
    }
  })
},
shangpin:function(){
let that=this;
  console.log(that.data.sjid)
  wx.request({
    url: that.data.url +'/agro/getGoodsList', // 仅为示例，并非真实的接口地址
    method: 'post',
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
    url: that.data.url +'/agro/getShopList', // 仅为示例，并非真实的接口地址
    method: 'post',
    data: {
      id: that.data.sjid
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
       console.log(res.data.itemShop);
       that.setData({
         sjinfo:[]
       })
       var returnArr = that.data.sjinfo;
       let sjname;
       for (var i = 0; i < 1; i++) {
         returnArr.push(res.data.itemShop[i]);
         sjname = res.data.itemShop[i].shopName;
        }
        console.log(returnArr)
        console.log(sjname)
      
        that.setData({
           dianming:sjname,
          sjinfo: returnArr
       })
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
    // that.shangpin();
    that.fenlei();
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