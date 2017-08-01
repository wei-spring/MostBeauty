// weather.js
var cityUtil = require('../../utils/city.js');

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    weatherInfo: {},
    clientHeight: 0,
    background: [
      'url(../../image/weather-1.png)', 
      'url(../../image/weather-2.png)', 
      'url(../../image/weather-3.png)'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      /**
     * 获取当前定位的城市的天气情况
     */
      var cityCode = cityUtil.getCityCode(userInfo.city)
      console.log('cityCode:' + cityCode)
      wx.request({
        url: 'https://tj.nineton.cn/Heart/index/all',
        data: {
          city: cityCode
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          that.setData({
            weatherInfo: res.data
          })
        }
      })
    })
    //获取设备的高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight-50
        });
      }
    });
  
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