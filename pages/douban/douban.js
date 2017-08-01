// weather.js
var cityUtil = require('../../utils/city.js');

var app = getApp()

Page({

  data: {
    movieInfo:{},
    hotMovieArray:[],
    otherMovieArray:[]
  },

  toDetail: function (e) {
    console.log('点击了item:' + e.currentTarget.dataset.item.title)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&city=%E5%8C%97%E4%BA%AC&start=0&count=20&client=&udid=',
      data: {
      },
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        that.setData({
          movieInfo: res.data,
          hotMovieArray: res.data.subjects.slice(0,4),
          otherMovieArray: res.data.subjects.slice(5) ,
        })
      }
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