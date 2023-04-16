// pages/custom/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    info:{}

  },
  // 拨打电话
  Tel: function (e) {
    var tel = e.currentTarget.dataset.tel;
    let task = e.currentTarget.dataset.task
    let id =task.id
    let type = task.type
    let that = this
    wx.makePhoneCall({
      phoneNumber: tel,
      success: function () {
        if(type!=2){
          that.toUpdate(id)
        }
      },
      fail: function () {
        // console.log("拨号失败！")
      }
    })
  },
  toUpdate(id){
    let that=this
    wx.request({
      url: wx.env.baseUrl+'/channel/customer/'+id+'/2',
      method:'put',
      success(e){
        let res = e.data
        if(res.code=='200'){
          that.getInfo(id)
        }
      },
    })
  },
  getInfo(id){
    this.setData({
      loading:true
    })
    var that = this
    wx.request({
      url: wx.env.baseUrl +"/channel/customer/"+id,
      method:'get',
      success(e){
        var res = e.data
        if(res.code==='200'){
          that.setData({
            info:res.data,
            loading:false
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
    if(!options.id){
      wx.showToast({
          title: '获取参数失败，请重新进入',
          icon: 'none',
          duration: 2000
      })
      return false
    }else{
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