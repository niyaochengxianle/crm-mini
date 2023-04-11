// pages/admin/invite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc:'',
    channelCode:'',
    channelName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      channelCode:options.code
    })
    this.setData({
      channelName:options.name
    })
    this.getScanCode(options.id,options.type)
  },
  getScanCode(id,type){
    let url=wx.env.baseUrl+'/wechat/getQrCode/'+id+'/'+type
    let that = this
      wx.request({
        url: url,
        method:'get',
        success(e){
          let res = e.data
          if(res.code==='200'){
            that.setData({
              imgSrc:wx.env.groupUrl+res.data
            })
          }
        },fail(e){
          wx.showToast({
              title: '获取二维码失败',
              icon: 'none',
              duration: 2000
          })
        },complete(e){

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