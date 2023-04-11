// pages/admin/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
  },
  // 下线业务员
  toOffline(){

  },
  getInfo(id){
    var that = this
    wx.request({
      url: wx.env.baseUrl +"/channel/staff/"+id,
      method:'get',
      success(e){
        var res = e.data
        if(res.code==='200'){
          that.setData({
            info:res.data
          })
        }else{
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
        })
        }
      },fail(e){
        wx.showToast({
          title: e.errMsg,
          icon: 'none',
          duration: 2000
        })
      },complete(e){
        console.log(e)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!options.id){
      wx.showToast({
          title: '获取参数失败，请重新进入',
          icon: 'none',
          duration: 2000
      })
      return false
    }else{
      console.log(1)
       this.getInfo(options.id)
    }
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