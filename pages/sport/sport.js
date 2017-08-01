// pages/sport/sport.js
//获取应用实例
var app = getApp()

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    leftTitle:'累计100+Km',
    leftDesc:'持续运动',
    rightDesc:'消耗1000+卡路里',
    userInfo: {},
    // 展示地图需要的参数Start
    longitude: wx.getStorageSync('longitude'),
    latitude: wx.getStorageSync('latitude'),
    markers: [{
      iconPath: "../../image/map_point.png",
      id: 0,
      title: '当前所在位置，适合跑起来~~',
      longitude: wx.getStorageSync('longitude'),
      latitude: wx.getStorageSync('latitude'),
      width: 50,
      height: 50
    }],
    controls: [{
      id: 1,
      iconPath: "../../image/wechatHL.png",
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
    // 展示地图需要的参数End
  },
 // map 
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  // map
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('sport location:' + wx.getStorageSync('longitude'))
    console.log('sport location:' + wx.getStorageSync('latitude'))
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
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