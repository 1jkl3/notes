class wechatConfig {
  static instance;
  constructor(data) {
    this.config = null;
    this.data = data || null;
    this.jsApiList = [
      "checkJsApi",
      "updateAppMessageShareData",
      "updateTimelineShareData",
      "onMenuShareWeibo",
      "getLocation",
      "openLocation",
      "chooseWXPay",
      "scanQRCode",
    ];
    this.share = {};
    this.init();
  }
  // 单例模式
  static getInstance(data) {
    if (!wechatConfig.instance) {
      Object.defineProperty(wechatConfig, "instance", {
        value: new wechatConfig(data),
      });
    }
    return wechatConfig.instance;
  }
  // 初始化
  init() {
    wx.config({
      debug: false,
      appId: this.data.appId,
      timestamp: parseInt(this.data.timestamp),
      nonceStr: this.data.nonceStr,
      signature: this.data.signature,
      jsApiList: this.jsApiList,
    });
    this.checkAPi()
      .then(() => {
        return new Promise((resolve, reject) => {
          wx.ready(() => {
            resolve(true);
          });
          wx.error((err) => {
            reject(err);
          });
        });
      })
      .catch((err) => {
        reject(err);
      });
  }
  // 设置数据
  setData(data) {
    this.data = data;
    this.init();
  }
  // 修改jsapi
  setjsApiList(list) {
    this.jsApiList = list;
  }
  // 设置公共分享信息
  setShareInfo(info) {
    this.share = info;
  }
  // 验证api是否可用
  checkAPi() {
    return new Promise((resolve, reject) => {
      wx.checkJsApi({
        jsApiList: this.jsApiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function (res) {
          resolve(res);
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        },
        fail: function (err) {
          reject(err);
        },
      });
    });
  }
  // 分享到朋友或QQ
  shareFriend(info) {
    info = Object.assign(this.share, info);
    const { title, desc, link, imgUrl } = info;
    return new Promise((resolve, reject) => {
      wx.updateAppMessageShareData({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: function (errMsg) {
          resolve(errMsg);
        },
        fail: function (err) {
          reject(err);
        },
        cancel: function (errMsg) {
          reject(errMsg);
        },
      });
    });
  }
  // 分享到朋友圈或QQ空间
  shareMoments(info) {
    info = Object.assign(this.share, info);
    const { title, link, imgUrl } = info;
    return new Promise((resolve, reject) => {
      wx.updateTimelineShareData({
        title, // 分享标题
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: function (errMsg) {
          resolve(errMsg);
        },
        fail: function (err) {
          reject(err);
        },
        cancel: function (errMsg) {
          reject(errMsg);
        },
      });
    });
  }
  // 分享到微博
  shareWeiBo(info) {
    info = Object.assign(this.share, info);
    const { title, desc, link, imgUrl } = info;
    return new Promise((resolve, reject) => {
      wx.onMenuShareWeibo({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: function (msg) {
          // 用户确认分享后执行的回调函数
          resolve(msg);
        },
        cancel: function (err) {
          // 用户取消分享后执行的回调函数
          reject(err);
        },
        fail: function (err) {
          reject(err);
        },
      });
    });
  }
  // 打开地图
  openMap(info) {
    const { latitude, longitude, name, address, scale = 1, infoUrl } = info;
    wx.openLocation({
      latitude, // 纬度，浮点数，范围为90 ~ -90
      longitude, // 经度，浮点数，范围为180 ~ -180。
      name, // 位置名
      address, // 地址详情说明
      scale, // 地图缩放级别,整形值,范围从1~28。默认为最大
      infoUrl, // 在查看位置界面底部显示的超链接,可点击跳转
    });
  }
  // 获取地图位置信息
  getMap() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          resolve(res);
        },
        fail: function (err) {
          reject(err);
        },
        cancel: function (err) {
          reject(err);
        },
      });
    });
  }
  // 扫一扫
  scanCode(result) {
    return new Promise((resolve, reject) => {
      wx.scanQRCode({
        needResult: result || 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          if (result === 1) {
            // 当needResult 为 1 时，扫码返回的结果
            resolve(res.resultStr);
          } else {
            resolve(res);
          }
        },
      });
    });
  }
  // 微信支付
  wechatPay(info) {
    const {
      timestamp = 0,
      nonceStr,
      package,
      signType = "MD5",
      paySign,
    } = info;
    return new Promise((resolve, reject) => {
      wx.chooseWXPay({
        timestamp: parseInt(timestamp), // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr, // 支付签名随机串，不长于 32 位
        package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign, // 支付签名
        success: function (res) {
          // 支付成功后的回调函数
          resolve(res);
        },
        fail: function (err) {
          reject(err);
        },
        cancel: function (err) {
          reject(err);
        },
      });
    });
  }
}
export default wechatConfig;
