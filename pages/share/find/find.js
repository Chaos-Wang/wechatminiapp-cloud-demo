// pages/share/find/find.js
const db = wx.cloud.database()
var search=new Array
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: ""
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  submit:function(){
    db.collection('docs').where({
      doc_type:this.data.inputVal // 填入当前用户 openid
    }).get({
      success: function (res) {
        console.log("数据获取成功")
        search=res.data
        wx.setStorage({
          key: 'search',
          data: search,
        })
        console.log(search)
        wx.redirectTo({
          url: './search/search',
        })
        },
      fail:function(){
        console.log("数据获取失败")
        wx.showToast({
          title: '出现错误',
          icon: 'warn',
          duration: 3000
        });

      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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