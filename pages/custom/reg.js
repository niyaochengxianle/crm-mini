// pages/custom/reg.js
const areaList= require('../../utils/areaArr')
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
    info:{},
    loading:false,
    show:false,
    areaList:[],
  },
  checkPhone(phone){
    return /^1[2-9]\d{9}$/.test(phone)
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
    if(!this.data.customInfo.name){
      wx.showToast({
      title: '请输入姓名',
      icon:'none'
      })
      return false
    }
    let check = this.checkPhone(this.data.customInfo.phone)
    if(!check){
      wx.showToast({
        title: '请输入正确手机号',
        icon:'none'
      })
      return false
    }
  if(!this.data.customInfo.areaName){
    wx.showToast({
      title: '请选择区域',
      icon:'none'
    })
    return false
}
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
   //打开选择市区
   showPopup() {
    this.setData({ show: true });
  },
  // 关闭选择市区
  onClose() {
    this.setData({ show: false });
  },
  confirmArea(e){
    let arr = e.detail.values
    let code = arr[0].code+'_'+arr[1].code
    let val=arr[0].name+'_'+arr[1].name
    this.setData({
        ['customInfo.areaName']:val,
        ['customInfo.areaCode']:code
    })
    this.onClose()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      areaList:areaList.areaList,
      ['customInfo.masterId']:options.id,
    })
    this.getInfo(options.id)
  },
  getInfo(id){
    this.setData({
      loading:true
    })
    var that = this
    wx.request({
      url: wx.env.baseUrl +"/channel/staff/"+id,
      method:'get',
      success(e){
        var res = e.data
        if(res.code==='200'){
          that.setData({
            info:res.data,
            loading:false
          })
          that.setData({
            'customInfo.areaName':that.data.info.areaName,
            'customInfo.areaCode':that.data.info.areaCode,
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