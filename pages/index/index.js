//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    motto: '每日一句',
    time: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
    userInfo: {}
  },
  //头像点击事件处理函数
  bindUserViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //每日一句点击事件处理函数
  bindDailyViewTap: function () {
    wx.navigateTo({
      url: '../daily/daily'
    })
  },
  //运动点击事件处理函数
  bindSportViewTap: function () {
    wx.navigateTo({
      url: '../sport/sport'
    })
  },
  onLoad: function () {
    console.log('启动小程序初始化')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    console.log('获取头像信息初始化完毕')
    console.log('开始获取金山词霸每日一句JSON')
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
