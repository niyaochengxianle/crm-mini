// pages/course/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signInfo:{
      courseId:'',
      customerId:'',
    },
    msg:'扫码签到成功',
    loading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ['signInfo.courseId']:options.id,
      ['signInfo.customerId']:wx.getStorageSync("personId")
    })
    if(!this.data.signInfo.courseId){
      wx.navigateTo({
        url: '/pages/login/input',
      })
    }else{
      this.signCourse()
    }
  },
  signCourse(){
    this.setData({
      loading:true
    })
    let that = this
    wx.request({
      url: wx.env.baseUrl+'/lesson/sign',
      method:'post',
      data:that.signInfo,
      success(e){
        const resp = e.data;
        if (resp.code === "200") {
          that.setData({
            loading:false
          })
        }else{
            wx.showToast({
                title: resp.data,
                icon: 'fail',
                duration: 2000
            })
            that.setData({
              loading:false,
              msg:resp.data
            })
        }
      },fail(e){
        wx.showToast({
            title: '签到失败',
            icon: 'fail',
            duration: 2000
        })
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