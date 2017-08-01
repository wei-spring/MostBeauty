//app.js
var Bmob = require('utils/bmob.js')
Bmob.initialize("468667afd0fefc349f1b92aea1320683", "2140f6e0d49c51a0720f8426a40f10ac");

App({
  onLaunch: function () {

    // 获取用户经纬度
    wx.getLocation({
      //type: 'gcj02', //国测局坐标,可以调用微信内置地图跟Map组件有出入
      type: 'wgs84',   //返回的是GPS坐标,可以显示当前在Map的位置
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        wx.setStorageSync(
          "latitude",
           latitude
        )
        wx.setStorageSync(
          "longitude",
          longitude
        )
      }
    })
    // 微信运动页面地图展示当前位置
    var user = new Bmob.User();//开始注册用户
    var newOpenid = wx.getStorageSync('openid')
    if (!newOpenid) {
      wx.login({
        success: function (res) {
          user.loginWithWeapp(res.code).then(function (user) {
            var openid = user.get("authData").weapp.openid;
            console.log(user, 'user', user.id, res);

            if (user.get("nickName")) {
              // 第二次访问
              console.log(user.get("nickName"), 'res.get("nickName")');

              wx.setStorageSync('openid', openid)
            } else {

              //保存用户其他信息
              wx.getUserInfo({
                success: function (result) {

                  var userInfo = result.userInfo;
                  var nickName = userInfo.nickName;
                  var avatarUrl = userInfo.avatarUrl;

                  var u = Bmob.Object.extend("_User");
                  var query = new Bmob.Query(u);
                  // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
                  query.get(user.id, {
                    success: function (result) {
                      // 自动绑定之前的账号
                      result.set('nickName', nickName);
                      result.set("userPic", avatarUrl);
                      result.set("openid", openid);
                      result.save();

                    }
                  });

                }
              });
            }
          }, function (err) {
            console.log(err, 'errr');
          });

        }
      });
    }
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})