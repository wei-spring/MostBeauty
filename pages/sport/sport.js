//index.js
//获取应用实例
var WXBizDataCrypt = require('../../utils/WXBizDataCrypt.js');
var AppId = 'wx9a471cc91843df63'
var AppSecret = '07157b6e2216b6c022f70d85d7658334'

var app = getApp()

Page({
  data: {
    encryptedData: {}
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据


    //调用登录接口，获取 code
    wx.login({
      success: function (res) {
        //发起网络请求
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: AppId,
            secret: AppSecret,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: 'GET',
          success: function (res) {
            var pc = new WXBizDataCrypt(AppId, res.data.session_key)
            wx.getUserInfo({
              success: function (res) {
                var data = pc.decryptData(res.encryptedData, res.iv)
                console.log('解密后 data: ', data)
              }
            })
          },
          fail: function (res) { },
          complete: function (res) { }
        });
      }
    });



    // wx.login({
    //   success: function(code){
    //   console.log('code:'+code.code)
    //     wx.request({
    //       url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + AppId + '&secret=' + AppSecret+'&js_code='+code.code+'&grant_type=authorization_code',
    //       data: {},
    //       header: {
    //         'content-type': 'application/json'
    //       },
    //       success: function (res) {
    //         console.log('res12:'+res)
    //       }
    //     })

    //     // wx.getWeRunData({
    //     //   success(res) {
    //     //     const encryptedData = res.encryptedData
    //     //     console.log("res:" + JSON.stringify(res))
    //     //     var pc = new WXBizDataCrypt(AppId, res.data.session_key)
    //     //     var data = pc.decryptData(res.encryptedData, res.iv)
    //     //     console.log('解密后 data: ', data)
    //     //     that.setData({
    //     //       encryptedData: encryptedData
    //     //     })
    //     //   }
    //     // })

    //   }
    // })
    
    //显示分享按钮
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage: function () {
    return {
      title: '最美搜藏',
      path: '/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

})
