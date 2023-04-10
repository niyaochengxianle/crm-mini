// pages/custom/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        name:'叶灵泷',
        code:'code',
        text:'text'
      },
      {
        name:'叶灵泷',
        code:'code',
        text:'text'
      },
      {
        name:'叶灵泷',
        code:'code',
        text:'text'
      }
    ],
    page: {current: 1, size: 100, total: 0,keyword:''},
    loading: false
  },
  // 拨打电话
  Tel: function (e) {
  	var tel = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: tel,
      success: function () {
        console.log("拨号成功！")
      },
      fail: function () {
        console.log("拨号失败！")
      }
    })
  },
  toPlan(){
    wx.navigateTo({url: '/pages/custom/sales'})
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