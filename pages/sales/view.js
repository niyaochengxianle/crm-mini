// pages/sales/view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    isEdit:false,
  },
  //打开二维码显示
  showPopup() {
    this.setData({ show: true });
  },
  // 关闭二维码显示
  onClose() {
    this.setData({ show: false });
  },
  // 编辑
  showEdit() {
    this.setData({ isEdit: true });
  },
  // 取消编辑
  closeEdit(){
    this.setData({ isEdit: false });
  },
  // 保存编辑信息
  save(){

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