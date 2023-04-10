// pages/custom/sales.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio:1,
    list: [
      {
        name:'叶灵泷',
        code:'2',
        phone:13222445566,
        text:'text'
      },
      {
        name:'叶灵泷',
        code:'1',
        phone:'13222445567',
        text:'text'
      },
      
    ]
  },
  onChange(event) {
    console.log(event)
    this.setData({
      radio: event.detail,
    });
  },

  onClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });
  },
  toBack(){
    wx.navigateTo({url: '/pages/custom/list'})
  },
  confirmSale(){},
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