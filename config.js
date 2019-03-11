/**
 * 小程序配置文件
 */

// var host = "http://192.168.0.156:5000"
// var host = "http://192.168.0.188:8086/"
//var host = "http://192.168.0.188:8080/"
//开发

// var host = "http://192.168.1.112:8080/crazyBird

// var host = "http://192.168.1.103:8080/crazyBird"

//正式
var host = "http://192.168.43.243:8081/com.crazyBird"
var wss ="wss://www.sxscott.com/crazyBird/websocket/"
//本地
//var host ="http://smartdove.iask.in:17946/api"
//var host ="http://192.168.0.143:8086/api"
//var host="https://buguanjiatest.site/api"
//var host = "http://192.168.0.168:8080/"
// var host = "http://192.168.43.160:8080/crazyBird"
// var host = "http://192.168.1.102:8080/crazyBird"
var config = {
  host,wss,
  // 登录地址，用于建立会话
  loginUrl: `${host}/user/login`,

  bindingUrl: `${host}/user/binding`,

  //失误招领图片上传

  uploadFile: `${host}/upload/avatar`,

  //获取手机号
  getphoneUrl: `${host}/user/deciphering`,
  //第三方平台登录
  plantLoginUrl: `${host}/user/account/platform/login`,

  //头像上传
  avatarurl: host + "/upload/avatar",

  // 通用上传
  picurl: host + "/upload/pic",

  // 绑定账号
  bindurl: host + "/user/account/weixinapp/bind",

  // 我的样品间
  companysUrl: `${host}/companys`,

  // 个人设置详情
  settingsUrl: `${host}/user/account/settings`,

  //查看公开的样品详情
  samplePublicUrl: `${host}/samples/public/detail`,

  // 样品列表
  samplesUrl: `${host}/samples`,

  // 样品详情
  tunnelUrl: `${host}/samples/{sampleId}`,

  // 获取样品备注
  remarksUrl: `${host}/samples/{sampleId}/remarks`,


  // 获取标记云
  cloudUrl: `${host}/tags/cloud`,

  // 获取标记
  tagUrl: `${host}/tags`,



  //获取公司
  companysUrl: `${host}/companys`,

  //添加样品标记
  tagsUrl: `${host}/samples/tags`,

  //样品图片上传
  samplepicUrl: `${host}/upload/samplepic`,

  //生成手机验证码
  checkCodeUrl: `${host}/user/account/checkCode`,

  //绑定小程序账户
  bindUrl: `${host}/user/account/weixinapp/bind`,

  //获取小程序码
  codeUrl: host + "/weixinApp/codeUrl",

  //创建展会
  exposUrl: `${host}/expos`,

  //添加小程序账户
  weixinappUrl: `${host}/user/account/weixinapp`,

  //获取个人名片
  mycardUrl: `${host}/user/account/my/card`,

  //名片图片上传
  mycardUploadUrl: `${host}/upload/mycard`,

  //展会名片图片上传
  expoUploadUrl: `${host}/upload/expo/contactPic`,

  //展会样品图片上传
  expoSampleUploadUrl: `${host}/upload/expo/samplePic`,

  //获取小程序页面二维码
  qrUrl: `${host}/weixinApp/qrUrl`,

  //获取分享名片和样品
  shareUrl: `${host}/expos/contacts/share`,

  //获取用户个人资料
  userInfoUrl: `${host}/user/account`,

  //样品篮子

  sampleSelectUrl: `${host}/samples/selects`,
  //分享链接
  singalShareUrl: `${host}/sample/share_singal.html`,

  //分享链接
  shareListUrl: `${host}/samples/share/list`,

  //分享链接
  shareDetailUrl: `${host}/samples/share/detail`,

  //分享链接
  usersUrl: `${host}/companys/users`,

  //分享多个样品链接
  samplesShareUrl: `${host}/samples/share`,

  //获取客户样品间样品列表
  customerUrl: `${host}/samples/share/customer`,

  //获取供应商样品间样品列表
  supplierUrl: `${host}/samples/share/supplier`,

  //获取我分享出去的查看者列表
  viewersUrl: `${host}/samples/share/customer/viewers`,

  //获取用户个人公开资料
  userpubUrl: `${host}/user/account/public`
};

module.exports = config
