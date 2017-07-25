//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    motto: '每日一句',
    time: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
    userInfo: {},
    dailyInfo:{},
    startDate: '2012-01-01',
    endDate: new Date().toJSON().slice(0, 10).replace(/-/g, '-')
  },
  //头像点击事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindDateChange: function (e) {
    this.setData({
      time: e.detail.value
    })
    this.onLoad();
  },
  //阅读按钮点击事件处理函数
  bindReadTap:function(){
    console.log('点击发音了')
    wx.showToast({
      title: '嗷~~出错了',
      icon: 'loading',
      duration: 2000
    })
    wx.downloadFile({
      url: 'https://news.iciba.com/admin/tts/2017-05-26-day', //音频资源文件
      header: {
        'content-type': 'application/octet-stream'
      },
      success: function (res) {
        if (res.errMsg === 'downloadFile:ok'){
          console.log('下载成功保存地址:' + res.tempFilePath)
          wx.playVoice({
            filePath: res.tempFilePath+'.mp3'
          })
        }
      }
    })
    wx.getSavedFileList({
      success: function (res) {
        console.log('save file:'+JSON.stringify(res))
      },
      fail: function(error){
        console.log('save file error:' + JSON.stringify(error))
      }
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
    wx.request({
      url: 'https://open.iciba.com/dsapi/',
      data: {
        date: this.data.time
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        /**
         * {
              'sid':'' #每日一句ID
              'tts': '' #音频地址
              'content':'' #英文内容
              'note': '' #中文内容
              'love': '' #每日一句喜欢个数
              'translation':'' #词霸小编
              'picture': '' #图片地址
              'picture2': '' #大图片地址
              'caption':'' #标题
              'dateline':'' #时间
              's_pv':'' #浏览数
              'sp_pv':'' #语音评测浏览数
              'tags':'' #相关标签
              'fenxiang_img':'' #合成图片，建议分享微博用的
            }
         */
        res.data.translation = res.data.translation.replace("词霸小编：", "")
        that.setData({
          dailyInfo: res.data
        })
      }
    })
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
