// pages/locate/locate_student/locate_student.js
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    check_in_code: '',
    longitude: '',
    latitude: '',
    provinces: '',
    citys: '',
    distance:''
  },

  watchCode: function (event) {
    this.setData({
      check_in_code: event.detail.value
    })
  },

  submit: function () {
    let vm=this.data
    db.collection('checkin').where({
      check_in_id:this.data.check_in_code
    })
    .get({
      success: function (res) {
        if(res.data!=''){
        console.log("数据获取成功")
        wx.setStorage({
          key: 'std_locate',
          data: res.data[0],
        })
        wx.getStorage({
          key: 'std_locate',
          success: function (res) {
            console.log(res.data)
            var lat1 = vm.latitude || 0;
            var lng1 = vm.longitude || 0;
            var lat2 = res.data.std_latitude || 0;
            var lng2 = res.data.std_longitude || 0;
            var rad1 = lat1 * Math.PI / 180.0;
            var rad2 = lat2 * Math.PI / 180.0;
            var a = rad1 - rad2;
            var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
            var r = 6378137;
            if ((r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))).toFixed(0) <= 1000) {
              wx.getStorage({
                key: 'real_name',
                success: function (res) {
                  db.collection('checkin_user').add({
                    data: {
                      check_in_id: vm.check_in_code,
                      check_in_signal: true,
                      check_in_date: Date,
                      check_in_name: res.data
                    }
                  })
                    .then(res => {
                      console.log("上传成功")
                      wx.showToast({
                        title: '签到完成',
                        icon: 'success',
                        duration: 3000
                      }),
                        setTimeout(function () {
                        wx.redirectTo({
                          url: '../../user/user'
                        })
                        }, 600)
                    })
                    .catch(console.error)
                }
              })
            }
            else {
              console.log("上传失败")
              wx.showToast({
                title: '位置检查错误，请重新检查位置设置',
                icon: 'none',
                duration: 3000
              })
              setTimeout(function () {
                wx.redirectTo({
                  url: '../../user/user'
                })
              }, 600)
            }
          },
        })
        }
        else{
          console.log("数据空")
          wx.showToast({
          title: '没有找到本次签到',
          icon: 'none',
          duration: 3000
        }),
          setTimeout(function () {
              wx.redirectTo({
                url: '../../user/user'
               })
            }, 600)
        }
        
      },
      fail: function () {
        console.log("数据获取失败")
        wx.showToast({
          title: '出现错误',
          icon: 'none',
          duration: 3000
        })
      }
    })

   
  },

  /**
   * 生命周期函数--监听页面加载
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