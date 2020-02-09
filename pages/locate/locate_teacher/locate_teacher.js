// pages/locate/locate_teacher/locate_teacher.js
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check_in_code:'',
    longitude: '',
    latitude: '',
    provinces: '',
    citys: '',
  },

  watchCode: function (event) {
    this.setData({
      check_in_code: event.detail.value
    })
  },
  generate: function (e) {
    var vm=this
    wx.getStorage({
      key: 'username',
      success: function (res) {
        db.collection('checkin').add({
          data: {
            check_in_id: vm.data.check_in_code,
            tip: false,
            teacher:res.data,
            std_longitude:vm.data.longitude,
            std_latitude:vm.data.latitude,
            std_province: vm.data.provinces,
            std_city:vm.data.citys,
          }
        })
          .then(res => {
            console.log(res),
              wx.redirectTo({
                url: './show/show',
              })
          })
          .catch(console.error)
      }
    })
    
  },
   /* 生命周期函数--监听页面加载
   */


  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'OP6BZ-NOJRQ-N2652-GHW4A-J6AD6-LRBMP'
    });
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
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
    let vm = this
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        // console.log(JSON.stringify(res));
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
          provinces: province,
          citys: city,
          latitude: latitude,
          longitude: longitude
        })

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