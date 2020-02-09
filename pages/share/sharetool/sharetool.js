// pages/share/sharetool/sharetool.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      doc_url:'',
      doc_type:''
  },

  watchUrl: function (event) {
    this.setData({
      doc_url: event.detail.value
    })
  },
  watchType: function (event) {
    this.setData({
      doc_type: event.detail.value
    })
  },


  submit: function (e) {
    db.collection('docs').add({
      data: {
        doc_url: this.data.doc_url,
        doc_type: this.data.doc_type,
      }
    })
      .then(res => {
        console.log("上传成功")
        wx.showToast({
          title: '已完成',
          icon: 'success',
          duration: 3000
        })
      })
      .catch(console.error)
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