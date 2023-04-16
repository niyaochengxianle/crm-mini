// pages/custom/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: {current: 1, size: 30, keyWord:'',masterId:null},
    loading: false
  },
  setVal(e){
    this.setData({
        ['page.keyWord']:e.detail
    })
  },
  toDetail(e) {
    let task = e.currentTarget.dataset.task
    wx.navigateTo({url: '/pages/custom/detail?id=' + task.id})
},
  // 拨打电话
  Tel: function (e) {
  	var tel = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: tel,
      success: function () {
        // console.log("拨号成功！")
      },
      fail: function () {
        // console.log("拨号失败！")
      }
    })
  },
  toPlan(e){
    let task = e.currentTarget.dataset.task
    wx.navigateTo({url: '/pages/custom/sales?id=' + task.id})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onSearch(){
    var that = this;
    this.setData({
      ['page.current']:1,
      list:[],
    })
    that.init() 
  },
onLoad() {
    var that = this;
    that.init()
},
      /**
* 页面相关事件处理函数--监听用户下拉动作
*/
onPullDownRefresh: function () { 
  console.log(1);
    var that = this;
    this.setData({
      ['page.current']:1,
      list:[],
    })
    setTimeout(function () {
        that.init() 
    }, 500);
},
// 上滑加载
onReachBottom(){
    let that=this
    let current = this.data.page.current+1
    this.setData({
      ['page.current']:current,
    })
    setTimeout(function () {
      that.init() 
  }, 500);
},
init() {
    var that = this
    let masterId = wx.getStorageSync('personId')
    var query = {
        current: that.data.page.current,
        size: that.data.page.size,
        keyWord: that.data.page.keyWord,
        masterId:masterId
    }
    that.setData({
        loading: true
    })
    // 请求数据
    app.wxRequest('GET','/channel/customer',query,e=>{
      var res = e.data
      if (res.code ==200) {
        let arr = that.data.list.concat(res.data)
        that.setData({
            list: arr,
        })
      } else {
        wx.showToast({
            title: '获取数据失败，请稍后再试',
            icon: 'none',
            duration: 2000
        })
       }
      }, err => {
          wx.showToast({
              title: '获取数据失败，请稍后再试',
              icon: 'none',
              duration: 2000
          })

      }, res => {
          wx.stopPullDownRefresh()
          that.setData({
              loading: false
          })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})