var url = require('../../config.js')
// var login = require('../../utils/wxlogin.js')
// const sendAjax = require('../../utils/sendAjax.js')
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');

var qqmapsdk;


Page({

  /**
   * 页面的初始数据
   */
  data: {

    imgUrls: [
      // 'https://s2.ax1x.com/2019/03/04/kOHW0U.png',
      // 'https://s2.ax1x.com/2019/03/04/kOHIh9.png'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    //位置数据
    location: '加载中',
    latitude1: '',
    longitude1: '',
    //选项卡颜色数据
    color1: 'rgba(0,0,0,0.5)',
    color2: 'rgba(0,0,0,0.5)',
    color3: 'rgba(0,0,0,0.5)',
    flag1: false,
    flag2: false,
    flag3: false,
    youxuanlist: [],
    fujinlist: [],
    ys: [],
    // userinfo: wx.getStorageSync('userinfo')
  },
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
// 跳转商店
dianjia:function(event){
  console.log(event.currentTarget.id);
  wx.navigateTo({
    url: '../shangjia/shangjia?id='+event.currentTarget.id
  })
},
  //销量排序
  xiaoliangpx: function () {
    let that = this;
    if (that.data.flag1 == false) {
      that.setData({
        color1: 'red',
        color2: 'rgba(0,0,0,0.5)',
        color3: 'rgba(0,0,0,0.5)',
        flag1: true,
        flag2: false,
        flag3: false,

      })
      that.xiaoliang();
    } else {
      that.setData({
        color1: 'rgba(0,0,0,0.5)',
        // color2: 'rgba(0,0,0,0.5)',
        // color3: 'rgba(0,0,0,0.5)',
        flag1: false,
        flag2: true,
        flag3: true,
      })
    }


  },
  //价格排序
  jiagepx: function () {
    let that = this;
    if (that.data.flag2 == false) {
      that.setData({
        color2: 'red',
        color1: 'rgba(0,0,0,0.5)',
        color3: 'rgba(0,0,0,0.5)',
        flag2: true,
        flag1: false,
        flag3: false,
      })
      that.jiage();
    } else {
      that.setData({

        color2: 'rgba(0,0,0,0.5)',
        flag1: true,
        flag3: true,
        flag2: false,
      })
    }

  },
  //评价排序
  pingjiapx: function () {
    let that = this;
    if (that.data.flag3 == false) {
      that.setData({
        color3: 'red',
        color2: 'rgba(0,0,0,0.5)',
        color1: 'rgba(0,0,0,0.5)',
        flag3: true,
        flag1: false,
        flag2: false,
       
      })
      that.pingjia();
    } else {
      that.setData({
        color3: 'rgba(0,0,0,0.5)',
        flag3: false,
        flag1: true,
        flag2: true,
      })
    }

  },

  //轮播图
  setImgBroadcast: function () {
    let that = this;
    wx.request({
      url: 'http://192.168.1.105:8081/com.crazyBird/affaris/broad', // 仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.tags);
        that.setData({
          imgUrls: res.data.tags
        })
      }
    })

  },
  // 评价好
  pingjia: function () {

    let that = this;
    console.log(that.data.latitude1);
    console.log(that.data.longitude1);
    wx.request({
      url: 'http://192.168.1.105:8081/com.crazyBird/agro/getNearShopList', // 仅为示例，并非真实的接口地址
      type: 'GET',
      data: {
        longitude: that.data.longitude1,
        latitude: that.data.latitude1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.itemShop);
        var returnArr = that.data.fujinlist;
        var ys = that.data.ys;
        for (var i = 0; i < res.data.itemShop.length; i++) {
          if (returnArr.length < res.data.itemShop.length) {
            returnArr.push(res.data.itemShop[i]);
          }

          if (ys.length < res.data.itemShop.length) {
            ys.push(res.data.itemShop[i]);
          }


          //  returnArr[i].distance=returnArr[i].distance.toFixed(1);
          switch (returnArr[i].stype) {
            case 1:
              returnArr[i].stype = '水果商铺';
              break;
            case 2:
              returnArr[i].stype = '蔬菜商铺';
              break;
            case 3:
              returnArr[i].stype = '畜牧商铺';
              break;
            case 4:
              returnArr[i].stype = '旅游商铺';
              break;
            case 5:
              returnArr[i].stype = '学农商铺';
              break;
            case 6:
              returnArr[i].stype = '聚点商铺';
              break;
            case 7:
              returnArr[i].stype = '散户商铺';
              break;
            case 8:
              returnArr[i].stype = '其他商铺';
              break;
          }

        }

        // that.setData({
        //   fujinlist: returnArr
        // })
        var ys2 = that.data.ys;

        for (var i = 0; i < res.data.itemShop.length; i++) {
          ys2[i].stype = returnArr[i].stype;


        }
        for (let i = 0; i < ys2.length - 1; i++) {

          for (let j = 0; j < ys2.length - 1 - i; j++) {
            if (ys2[j].sgrade < ys2[j + 1].sgrade) {
              let tmp = ys2[j + 1];
              ys2[j + 1] = ys2[j];
              ys2[j] = tmp;
            }
          }
        }

        that.setData({
          fujinlist: ys2
        })


      }
    })
  },
  //价格低
  jiage: function () {

    let that = this;
    console.log(that.data.latitude1);
    console.log(that.data.longitude1);
    wx.request({
      url: 'http://192.168.1.105:8081/com.crazyBird/agro/getNearShopList', // 仅为示例，并非真实的接口地址
      type: 'GET',
      data: {
        longitude: that.data.longitude1,
        latitude: that.data.latitude1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.itemShop);
        var returnArr = that.data.fujinlist;
        var ys = that.data.ys;
        for (var i = 0; i < res.data.itemShop.length; i++) {
          if (returnArr.length < res.data.itemShop.length) {
            returnArr.push(res.data.itemShop[i]);
          }

          if (ys.length < res.data.itemShop.length) {
            ys.push(res.data.itemShop[i]);
          }


          //  returnArr[i].distance=returnArr[i].distance.toFixed(1);
          switch (returnArr[i].stype) {
            case 1:
              returnArr[i].stype = '水果商铺';
              break;
            case 2:
              returnArr[i].stype = '蔬菜商铺';
              break;
            case 3:
              returnArr[i].stype = '畜牧商铺';
              break;
            case 4:
              returnArr[i].stype = '旅游商铺';
              break;
            case 5:
              returnArr[i].stype = '学农商铺';
              break;
            case 6:
              returnArr[i].stype = '聚点商铺';
              break;
            case 7:
              returnArr[i].stype = '散户商铺';
              break;
            case 8:
              returnArr[i].stype = '其他商铺';
              break;
          }

        }

        // that.setData({
        //   fujinlist: returnArr
        // })
        var ys2 = that.data.ys;

        for (var i = 0; i < res.data.itemShop.length; i++) {
          ys2[i].stype = returnArr[i].stype;
          // ys2[i].distance = returnArr[i].distance.toFixed(1);


        }
        for (let i = 0; i < ys2.length - 1; i++) {

          for (let j = 0; j < ys2.length - 1 - i; j++) {
            if (ys2[j].perCapita > ys2[j + 1].perCapita) {
              let tmp = ys2[j + 1];
              ys2[j + 1] = ys2[j];
              ys2[j] = tmp;
            }
          }
        }

        that.setData({
          fujinlist: ys2
        })


      }
    })
  },
  //销量高
  xiaoliang: function () {

    let that = this;
    console.log(that.data.latitude1);
    console.log(that.data.longitude1);
    wx.request({
      url: 'http://192.168.1.105:8081/com.crazyBird/agro/getNearShopList', // 仅为示例，并非真实的接口地址
      type: 'GET',
      data: {
        longitude: that.data.longitude1,
        latitude: that.data.latitude1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.itemShop);
        var returnArr = that.data.fujinlist;
        var ys = that.data.ys;
        for (var i = 0; i < res.data.itemShop.length; i++) {
          if (returnArr.length < res.data.itemShop.length) {
            returnArr.push(res.data.itemShop[i]);
          }
      
          if (ys.length < res.data.itemShop.length) {
            ys.push(res.data.itemShop[i]);
          }


          //  returnArr[i].distance=returnArr[i].distance.toFixed(1);
          switch (returnArr[i].stype) {
            case 1:
              returnArr[i].stype = '水果商铺';
              break;
            case 2:
              returnArr[i].stype = '蔬菜商铺';
              break;
            case 3:
              returnArr[i].stype = '畜牧商铺';
              break;
            case 4:
              returnArr[i].stype = '旅游商铺';
              break;
            case 5:
              returnArr[i].stype = '学农商铺';
              break;
            case 6:
              returnArr[i].stype = '聚点商铺';
              break;
            case 7:
              returnArr[i].stype = '散户商铺';
              break;
            case 8:
              returnArr[i].stype = '其他商铺';
              break;
          }
        
        }
  
        // that.setData({
        //   fujinlist: returnArr
        // })
        var ys2 = that.data.ys;

        for (var i = 0; i < res.data.itemShop.length; i++) {
          ys2[i].stype = returnArr[i].stype;
          // ys2[i].distance = returnArr[i].distance.toFixed(1);
    

        }
        for (let i = 0; i < ys2.length - 1; i++) {
         
          for (let j = 0; j < ys2.length - 1 - i; j++) {
            if (ys2[j].monthlySale < ys2[j + 1].monthlySale) {
              let tmp = ys2[j + 1];
              ys2[j + 1] = ys2[j];
              ys2[j] = tmp;
            }
          }
        }

        that.setData({
          fujinlist: ys2
        })


      }
    })
  },
  // 附近商家
  funjin: function () {

    let that = this;
    console.log(that.data.latitude1);
    console.log(that.data.longitude1);
    wx.request({
      url: 'http://192.168.1.105:8081/com.crazyBird/agro/getNearShopList', // 仅为示例，并非真实的接口地址
      type: 'GET',
      data: {
        longitude: that.data.longitude1,
        latitude: that.data.latitude1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.itemShop);
        that.setData({
          fujinlist:[]
        })
        var returnArr = that.data.fujinlist;
        for (var i = 0; i < res.data.itemShop.length; i++) {
          returnArr.push(res.data.itemShop[i]);
          console.log(returnArr[i].stype);
          //  returnArr[i].distance=returnArr[i].distance.toFixed(1);
          switch (returnArr[i].stype) {
            case 1:
              returnArr[i].stype = '水果商铺';
              break;
            case 2:
              returnArr[i].stype = '蔬菜商铺';
              break;
            case 3:
              returnArr[i].stype = '畜牧商铺';
              break;
            case 4:
              returnArr[i].stype = '旅游商铺';
              break;
            case 5:
              returnArr[i].stype = '学农商铺';
              break;
            case 6:
              returnArr[i].stype = '聚点商铺';
              break;
            case 7:
              returnArr[i].stype = '散户商铺';
              break;
            case 8:
              returnArr[i].stype = '其他商铺';
              break;
          }
        }
        that.setData({
          fujinlist: returnArr
        })
        console.log("成功了");
        console.log(that.data.fujinlist);
      }
    })
  },
  //为你优选
  youxuan: function () {
    // console.log("我已经执行了");
    let that = this;
    wx.request({
      url: 'http://192.168.1.105:8081/com.crazyBird/agro/getShopList', // 仅为示例，并非真实的接口地址
      type: 'GET',
      data: {
        typeId: 3
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.itemShop);
        var returnArr = that.data.youxuanlist;
        for (var i = 0; i < res.data.itemShop.length; i++) {
          returnArr.push(res.data.itemShop[i]);
        }
        that.setData({
          youxuanlist: returnArr
        })
        console.log(returnArr);
      }
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  vote: function (event) {
    console.log(event.currentTarget.id);
    let key = event.currentTarget.id;
    if (key == "水果超市") {
      wx.navigateTo({
        url: '../Mall/Mall?id=水果超市'
      })
    } else if (key == "蔬菜农场") {
      wx.navigateTo({
        url: '../Mall/Mall?id=蔬菜农场'
      })
    }
    else if (key == "畜牧农场") {
      wx.navigateTo({
        url: '../Mall/Mall?id=畜牧农场'
      })
    }
    else if (key == "旅游产业") {
      wx.navigateTo({
        url: '../Mall/Mall?id=旅游产业'
      })
    }
    else if (key == "学农商品") {
      wx.navigateTo({
        url: '../Mall/Mall?id=学农商品'
      })
    }
    else if (key == "聚会商品") {
      wx.navigateTo({
        url: '../Mall/Mall?id=聚会商品'
      })
    }
    else if (key == "散户商品") {
      wx.navigateTo({
        url: '../Mall/Mall?id=散户商品'
      })
    }
    else if (key == "其他商品") {
      wx.navigateTo({
        url: '../Mall/Mall?id=其他商品'
      })
    }

  },
  tolocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {

        that.setData({
          latitude1: res.latitude,
          longitude1: res.longitude,
        })
        that.setData({
          location: res.name
        })
        that.funjin();


      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  // //是否授权
  // getauthSetting: function () {
  //   wx.getSetting({
  //     success: res => {
  //       // console.log(res.authSetting['scope.userInfo'])
  //       if (res.authSetting['scope.userInfo']) {
  //       } else {
  //         console.log(res)
  //         wx.navigateTo({
  //           url: '/pages/start/start',
  //         })
  //       }
  //     }
  //   })
  // },


  //轮播图
  // setImgBroadcast: function () {
  //   // console.log(222);
  //   var that = this;
  //   let infoOpt = {
  //     url: '/affaris/broad',
  //     type: 'GET',
  //     data: {

  //     },
  //     header: {
  //       'content-type': 'application/json',
  //       // 'authorization': wx.getStorageSync("authorization"),
  //     },


  //   }
  //   let infoCb = {}
  //   infoCb.success = function (data) {
  //     console.log(data.tags);
  //     that.setData({
  //       imgUrlsloca: data.tags
  //     })
  //   }

  //   sendAjax(infoOpt, infoCb, () => {
  //     // that.onLoad()
  //     // wx.setStorageSync('G_needUploadIndex', true)
  //   });

  // },
  getLocation: function (e) {
    var that = this;
    //初始化
    qmapSDK = new qqMap({
      key: 'AKPBZ-LS6WV-PXWPE-UE2NV-YGZIV-ARBMI'
    })
    //获取地址
    wx.getLocation({
      success: function (res) {
        type: 'wgs84'
        qmapSDK.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (e) {


            var location = e.result.address;
            console.log(location);
            that.setData({
              location: location
            })
          }
        })
      },
    })
  },





  // },
  // vote: function () {
  //     wx.navigateTo({
  //       url: '../vote/index',
  //     })
  // },
  // currentaffairs: function () {
  //   // console.log('123123');
  //   wx.switchTab({
  //     url: '../currentaffairs/currentaffairs',
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // login.wxLogin(0, function (res) {
    //   wx.setStorageSync("userinfo", res)
    // console.log(wx.getStorageSync('userinfo'))

    // })
    // that.test();
    that.setImgBroadcast();
    that.youxuan();
    // that.setvoteBroadcast();
    // that.getnewmes();
    qqmapsdk = new QQMapWX({
      key: 'AKPBZ-LS6WV-PXWPE-UE2NV-YGZIV-ARBMI'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let vm = this;
    vm.getUserLocation();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(wx.getStorageSync('userinfo'))

  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        vm.setData({
          latitude1: latitude,
          longitude1: longitude,
        })
        vm.funjin();
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(res.result.address)
        vm.setData({
          location: res.result.address
        })
        console.log(vm.data.location)

        // let province = res.result.ad_info.province
        // let city = res.result.ad_info.city
        // vm.setData({
        //   province: province,
        //   city: city,
        //   latitude: latitude,
        //   longitude: longitude
        // })

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
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
  //跳转详情页
  // detailPage: function (e) {
  //   var id = e.currentTarget.dataset.id;
  //   wx.navigateTo({
  //     url: '../currentaffairs/detailPage/detailPage?id=' + id
  //   });
  // },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this;

    that.setData({


      imgUrls: [
        // 'https://s2.ax1x.com/2019/03/04/kOHW0U.png',
        // 'https://s2.ax1x.com/2019/03/04/kOHIh9.png'
      ],
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      circular: true,
      //位置数据
      location: '加载中',
      latitude1: '',
      longitude1: '',
      //选项卡颜色数据
      color1: 'rgba(0,0,0,0.5)',
      color2: 'rgba(0,0,0,0.5)',
      color3: 'rgba(0,0,0,0.5)',
      flag1: false,
      flag2: false,
      flag3: false,
      youxuanlist: [],
      fujinlist: [],
    })

    that.setImgBroadcast();
    that.youxuan();
    qqmapsdk = new QQMapWX({
      key: 'AKPBZ-LS6WV-PXWPE-UE2NV-YGZIV-ARBMI'
    });
    that.getUserLocation();
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

  },
  //设置位置
  /**
   * pos:显示位置在container中的位置
   * index：显示位置的clubs索引
   */
  // setPos: function (pos, index) {
  //   let container = [];
  //   let p2 = pos;
  //   let p1 = this.findPrePos(p2);
  //   let p0 = this.findPrePos(p1);
  //   let p3 = this.findNextPos(p2);
  //   let p4 = this.findNextPos(p3);
  //   let i2 = index;
  //   let i1 = this.findPreIndex(i2);
  //   let i0 = this.findPreIndex(i1);
  //   let i3 = this.findNextIndex(i2);
  //   let i4 = this.findNextIndex(i3);
  //   container[p0] = this.data.clubs[i0];
  //   container[p1] = this.data.clubs[i1];
  //   container[p2] = this.data.clubs[i2];
  //   container[p3] = this.data.clubs[i3];
  //   container[p4] = this.data.clubs[i4];
  //   this.setData({
  //     container
  //   })
  // },
  // /**
  //  * container中的位置
  //  */
  // findNextPos: function (pos) {
  //   if (pos != 4) {
  //     return pos + 1;
  //   }
  //   return 0;

  // },
  // findPrePos: function (pos) {
  //   if (pos != 0) {
  //     return pos - 1;
  //   }
  //   return 4;
  // },


  toSearch: function () {
    console.log("dasas");
    wx.navigateTo({
      url: '../secondHand/secondHandSearch',
    })
  },
})