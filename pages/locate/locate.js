// pages/locate/locate.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**`
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('users').where({
      realname: db.command.neq(''),
    }).get({
      success: function (res) {
        if(res.data[1].usertype[1].checked){
          console.log("是学生")
          wx.redirectTo({
          url: './locate_student/locate_student',
        })}
        else{
          console.log("是老师")
          wx.getStorage({
            key: 'username',
            success: function(res) {
              db.collection('checkin').where({
                tip: false,
                teacher: res.data
              }).get({
                success: function (a) {
                  console.log(a.data)
                  if (a.data.length != 0){
                  wx.setStorage({
                    key: 'check_in_code',
                    data: a.data[0].check_in_id
                  })
                  wx.setStorage({
                    key: 'check_id',
                    data: a.data[0]._id
                  })
                  }
                  if (a.data.length != 0)
                    wx.redirectTo({
                      url: './locate_teacher/show/show',
                    })
                  else
                    wx.redirectTo({
                      url: './locate_teacher/locate_teacher',
                    })
            },
          })
            }
          })
        }
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