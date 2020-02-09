//sort.js
var app = getApp
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    //用户个人信息
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    }
  },
  /**
   *点击添加地址事件
   */
  add_address_fun: function () {
    wx.navigateTo({
      url: 'add_address/add_address',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
      }
    })
  },

  /**
   *位置共享函数
   */
  onlocate: function (event) {
    console.log(event.currentTarget.id);
    wx.switchTab({
      url: '../locate/locate',
    })
  },
  /**
   *文件共享函数
   */
  onshare: function (event) {
    console.log(event.currentTarget.id);
    wx.switchTab({
      url: '../share/share',
    })
  },
  /**
   * 小游戏函数
   */
  ongame: function (event) {
    console.log(event.currentTarget.id);
    wx.switchTab({
      url: '../game/game',
    })
  },
  /**
   * 联系老师函数
   */
  onconnect: function (event) {
    console.log(event.currentTarget.id);
    wx.switchTab({
      url: '../contect/contect',
    })
  },
    /**
   * 个人信息函数
   */
  onpersonmation: function (event) {
    console.log(event.currentTarget.id);
    wx.switchTab({
      url: '../personmation/personmation',
    })
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
