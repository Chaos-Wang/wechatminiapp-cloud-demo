// pages/login/personal/personal.js
const db = wx.cloud.database()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_type: [
      { name: '我是老师', value: '0' },
      { name: '我是学生', value: '1', checked: true }
    ],
    userclass:'',
    realname:''
  },

  radioChange: function (e) {
    console.log('user_type发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.user_type;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      user_type: radioItems
    });
  },

  watchRealname: function (event) {
    this.setData({
      realname:event.detail.value
    }) 
  },
  watchClass: function (event) {
    this.setData({
      userclass: event.detail.value
    }) 
  },


submit:function(e){
  db.collection('users').add({
    data: {
      user_class : this.data.userclass,
      realname:this.data.realname,
      usertype:this.data.user_type
    }
  })
    .then(res => {
      console.log(res),
      wx.redirectTo({
        url: '../../user/user',
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