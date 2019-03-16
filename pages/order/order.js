const url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
const templeMsg = require('../../utils/templeMsg.js')
Page({
  data: {
    currentTab: 0,
    status: '',
    pageNo: 1,
    pageSize: 5,
    orderList: [],
    refundOrderId: '',
    hiddenRefund: true,
    input_refund: '',
    openId: null,
    url: 'http://94.191.106.228:8080/Agriculture',
  },
  onLoad: function (options) {
    // this.getOrderList();
    var that = this
    var userId = wx.getStorageSync('userinfo').accessToken;
    this.setData({
      openId: userId
    })
  },
  //单击导航栏
  clickMenu: function (e) {
    console.log(11)
    var current = e.currentTarget.dataset.current; //获取当前tab的index
    var status = e.currentTarget.dataset.status;
    this.setData({
      currentTab: current,
      status: status,
      orderList: [],
      pageNo: 1
    })
    this.getOrderList();
  },

  toView:function(){
    wx.navigateTo({
      url: '../view/view' ,
    })
  },

  //跳转订单详情
  toOrderDetail: function (e) {
    var orderId = e.currentTarget.dataset.orderid;
    console.log(orderId)
    wx.navigateTo({
      url: '../orderDetail/orderDetail?orderId=' + orderId,
    })
  },
  //获取订单列表
  getOrderList: function () {
    var that = this;
    wx.request({

     

      url: that.data.url +'/agro/getOrderList',

      method: 'get',
      data: {
        'openId': this.data.openId,
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        that.setData({
          orderList: res.data.itemOrder
        })

      }
    })
  },
  //取消订单
  cancelOrder: function (e) {
    var orderId = e.currentTarget.dataset.orderid;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认取消该订单吗',
      success(res) {
        if (res.confirm) {
          let infoOpt = {
            url: '/secondary/order/orderCancel?id=' + orderId,
            type: 'DELETE',
            data: {
            },
            header: {
              'content-type': 'application/json',
              'authorization': wx.getStorageSync('userinfo').authorization
            },
          }
          let infoCb = {}
          infoCb.success = function (res) {
            console.log(res);
            if (res.message == "取消订单成功") {
              wx.showModal({
                title: '提示',
                content: '取消成功',
                showCancel: false,
                success(res) {
                  if (res.confirm) {
                    that.onPullDownRefresh();
                  }
                }
              })
            }
          }
          infoCb.beforeSend = () => { }
          sendAjax(infoOpt, infoCb, () => { });
        } else if (res.cancel) { }
      }
    })
  },
  //去付款
  toPay: function (e) {
    var that = this;
    var price = e.currentTarget.dataset.price;
    var orderId = e.currentTarget.dataset.orderid;
    wx.login({
      success: resp => {
        let infoOpt = {
          url: '/pay/recharge',
          type: 'POST',
          data: {
            platCode: resp.code,
            fee: price,
            orderId: orderId,
            type: 1
          },
          header: {
            'content-type': 'application/json',
          },
        }
        let infoCb = {}
        infoCb.success = function (res) {
          console.log(res);
          wx.requestPayment({
            timeStamp: res.timeStamp,
            nonceStr: res.nonceStr,
            package: res.pkg,
            signType: 'MD5',
            paySign: res.paySign,
            success(res) {
              console.log(res)
              wx.navigateTo({
                url: '../secondHandPaySuccess/secondHandPaySuccess',
              })

            },
            fail(res) {
              console.log(res)
            }
          })
        }
        infoCb.beforeSend = () => { }
        sendAjax(infoOpt, infoCb, () => { });
      }
    })
  },
  //申请退款输入
  input_refund: function (e) {
    var val = e.detail.value;
    this.setData({
      input_refund: val
    })
  },
  //申请退款
  refundOrder: function (e) {
    var orderid = e.currentTarget.dataset.orderid;
    this.setData({
      hiddenRefund: false,
      input_refund: '',
      refundOrderId: orderid
    })
  },
  //确认申请退款
  confirmRefund: function (e) {
    var that = this;
    var input_refund = this.data.input_refund;
    var refundOrderId = this.data.refundOrderId;
    if (input_refund == '') {
      wx.showToast({
        title: '请输入退款原因',
        icon: 'none'
      })
    } else {
      let infoOpt = {
        url: '/secondary/order/orderApply',
        type: 'PUT',
        data: {
          orderId: refundOrderId,
          content: input_refund
        },
        header: {
          'content-type': 'application/json',
        },
      }
      let infoCb = {}
      infoCb.success = function (res) {
        console.log(res);
        if (res.message == '已成功申请，请耐心等待结果！') {
          that.setData({
            hiddenRefund: true
          })
          wx.showModal({
            title: '提示',
            content: '已申请退款，请耐心等待',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                that.onPullDownRefresh();
              }
            }
          })

        }
      }
      infoCb.beforeSend = () => { }
      sendAjax(infoOpt, infoCb, () => { });
    }

  },
  cancelRefund: function () {
    this.setData({
      hiddenRefund: true
    })
  },
  //确认收货
  confirmOrder: function (e) {
    var that = this;
    var sellerId = e.currentTarget.dataset.sellerid;
    var orderId = e.currentTarget.dataset.orderid;
    var goodsName = e.currentTarget.dataset.goodsname;
    var orderPrice = e.currentTarget.dataset.orderprice;
    wx.showModal({
      title: '提示',
      content: '确认收货吗？',
      success(res) {
        if (res.confirm) {
          let infoOpt = {
            url: '/secondary/order/orderAccept',
            type: 'PUT',
            data: {
              orderId: orderId
            },
            header: {
              'content-type': 'application/json',
            },
          }
          let infoCb = {}
          infoCb.success = function (res) {
            console.log(res);
            if (res.code == '200') {
              var template_id = 'YaajHJis-CXmlRQVzcbwhkay95BbEm29jsIvbY-ENu4';
              var page = '/pages/secondHand/secondHandOrderSold/secondHandOrderSold';
              var data = {
                "keyword1": {
                  "value": goodsName
                },
                "keyword2": {
                  "value": orderId
                },
                "keyword3": {
                  "value": orderPrice
                },
                "keyword4": {
                  "value": res.message
                }
              };
              templeMsg.templeMsg(sellerId, template_id, page, data);

              wx.showModal({
                title: '提示',
                content: '确认收货成功',
                showCancel: false,
                success(res) {
                  if (res.confirm) {
                    that.onPullDownRefresh();
                  }
                }
              })
            }
          }
          infoCb.beforeSend = () => { }
          sendAjax(infoOpt, infoCb, () => { });
        }
      }
    })

  },
  //收集formId
  getFormId: function (e) {
    var formId = e.detail.formId;
    var userId = wx.getStorageSync('userinfo').userId;
    var openId = wx.getStorageSync('userinfo').openId;
    if (formId != 'the formId is a mock one') {
      var that = this;
      let infoOpt = {
        url: '/user/insertForm',
        type: 'POST',
        data: {
          userId: userId,
          openId: openId,
          formId: formId
        },
        header: {
          'content-type': 'application/json',
        },
      }
      let infoCb = {}
      infoCb.success = function (res) {
      }
      infoCb.beforeSend = () => { }
      sendAjax(infoOpt, infoCb, () => { });
    }
  },
  onReady: function () { },
  onShow: function () {
    this.setData({
      orderList: [],
      pageNo: 1,
    })
    this.getOrderList();
  },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      pageNo: 1,
      orderList: [],
    })
    this.getOrderList();
    wx.stopPullDownRefresh();
  },
  onReachBottom: function () {
    var pageNo = this.data.pageNo;
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      pageNo: pageNo + 1,
    })
    this.getOrderList();

  },
  onShareAppMessage: function () { }
})