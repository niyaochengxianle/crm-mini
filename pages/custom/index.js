// pages/custom/index.js
const areaList= require('../../utils/areaArr')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    showPicker:false,
    areaList:[],
    columns:[
      {text:'已分配'},
      {text:'未分配'}
    ]
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
    this.onClose()
  },
  cancelArea(e){
    this.onClose()
  },
    // 关闭选择状态
  closePicker() {
    this.setData({ showPicker: false });
  },
  showPicker(){
    this.setData({ showPicker: true });
  },
  confirmPicker(){},
  cancelPicker(){},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(areaList)
    this.setData({
      areaList:areaList.areaList
    })
    console.log(this.data.areaList)
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