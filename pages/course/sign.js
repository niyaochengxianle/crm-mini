// pages/course/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signInfo:{
      lessonId:'',
      customerId:'',
      openId:'',
    },
    msg:'扫码签到成功',
    loading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.getCode()
    if(option.scene){
      let scene =decodeURIComponent(option.scene)
      let arr = scene.split(',')
      let id = arr[0]
      // let typePage = arr[1]
      this.setData({
        ['signInfo.lessonId']:id,
      })
    } 
    this.setData({
      ['signInfo.customerId']:wx.getStorageSync("personId"),
    })
  },
  getCode(){
    let that = this
    wx.login({
        success:(key)=>{
            wx.setStorageSync('wxCode', key.code);
            console.log(key.code,'sign,code')
            wx.request({
              url: wx.env.baseUrl+'/wechat?code='+key.code,
              success(e){
                  let res = e.data
                  if(res.code=='200'){
                    wx.setStorageSync('wxOpenId', res.data);
                    that.setData({
                      ['signInfo.openId']:res.data,
                    })
                    that.signCourse()
                  }else{
                      wx.showToast({
                        title: '请重新进入小程序',
                        icon:'none',
                        duration:'2000'
                      })
                  }
              },fail(e){
                wx.showToast({
                    title: '请重新进入小程序',
                    icon:'none',
                    duration:'2000'
                  })
              }
            })
        }
    })
  },
  signCourse(){
    console.log(this.data.signInfo)
    this.setData({
      loading:true
    })
    let that = this
    wx.request({
      url: wx.env.baseUrl+'/lesson/sign',
      method:'post',
      data:that.data.signInfo,
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