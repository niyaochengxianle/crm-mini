// pages/custom/reg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customInfo:{
      "areaCode": "",
      "areaName": "",
      "channelId": "",
      "channelName": "",
      "masterId": 1,
      "masterName": "",
      "name": "",
      "openId": "",
      "phone": "",
    },
    loading:false
  },
  setVal(e){
    this.setData({
      ['customInfo.name']:e.detail
    })
  },
  setVal1(e){
    this.setData({
      ['customInfo.phone']:e.detail
    })
  },
  save(){
    this.setData({
      loading:true,
    })
    let that=this
    wx.request({
      url: wx.env.baseUrl+'/channel/customer',
      method:'post',
      data:that.data.customInfo,
      success(e){
        let res = e.data
        if(res.code=='200'){
          wx.showModal({
            title: '提示',
            content: '注册成功，即将前往登录',
            success (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/login/input',
                })
              }
            }
          })
        }
      },fail(e){},complete(e){
        that.setData({
          loading:false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   ['customInfo.masterId']:options.masterId
    // })
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