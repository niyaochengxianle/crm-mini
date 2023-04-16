// pages/custom/sales.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio:null,
    customId:null,
    list: [],
    page: {current: 1, size: 1000, keyWord:'',masterId:null},
    loading: false,
    obj:{
      customerIds:null,
      id:null,
    }
  },
  setVal(e){
    this.setData({
        ['page.keyWord']:e.detail
    })
  },
  onSearch(){
    var that = this;
    this.setData({
      ['page.current']:1,
      list:[],
    })
    that.init() 
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
    app.wxRequest('GET','/channel/staff',query,e=>{
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
  onChange(event) {
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
  confirmSale(){
    if(!this.data.radio){
      wx.showToast({
        title: '请选择业务员',
        duration:2000,
        icon:'none'
      })
      return false
    }
    if(!this.data.obj.customerIds){
      wx.showToast({
        title: '参数丢失，请重新进入页面',
        duration:2000,
        icon:'none'
      })
      return false
    }
    this.setData({
      loading:true,
      'obj.id':this.data.radio
    })
    let that = this
    wx.request({
      url: wx.env.baseUrl+'/channel/staff/distribute',
      method:'post',
      data:this.data.obj,
      success(e){
        let res= e.data
        if(res.code=='200'){
          wx.showToast({
            title: '分配成功',
            duration:2000,
            icon:'none'
          })
          wx.navigateTo({
            url: '/pages/custom/list',
          })
        }else{
          wx.showToast({
            title: '出错了，请稍后再试',
            duration:2000,
            icon:'none'
          })
        }
      },
      fail(e){
        wx.showToast({
          title: '出错了，请稍后再试',
          duration:2000,
          icon:'none'
        })
      },
      complete(e){
        that.setData({
          loading:false,
          'obj.customerIds':null
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        'obj.customerIds':options.id
      })
      this.init()
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