// pages/course/index.js
const moment = require('../../utils/moment.js')
moment.locale('en', {
  longDateFormat: {
      l: "YYYY-MM-DD",
      L: "YYYY-MM-DD HH:mm:ss",
  }
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{},
    timeVisible1: false,
    timeVisible2: false,
    currentDate: new Date(moment().format('YYYY-MM-DD HH:mm')).getTime(),
    minDate: new Date(moment().format('YYYY-MM-DD')).getTime(),
    maxDate: moment().add(100, 'day')._d.getTime(),
    endMaxDate: moment().add(100, 'day')._d.getTime(),
    filter(type, options) {
        if (type === 'minute') {
            return options.filter((option) => option % 30 === 0);
        }
        return options;
    },
  },
  selectTime1(val) {
    this.setData({
        timeVisible1: true
    })
  },
  selectTime2(val) {
      this.setData({
          timeVisible2: true
      })
  },
  // 确认时间
  confirmTime1(val) {
      this.setData({
          'form.leaveStartTime': moment(val.detail).format('YYYY-MM-DD HH:mm:ss'),
          timeVisible1: false
      })
      this.timeVisible1 = false
      if (this.data.form.leaveStartTime && this.data.form.leaveEndTime) {
          this.testTime(this.data.form.leaveStartTime, this.data.form.leaveEndTime)
      }
  },
  // 确认时间
  confirmTime2(val) {
      this.setData({
          'form.leaveEndTime': moment(val.detail).format('YYYY-MM-DD HH:mm:ss'),
          timeVisible2: false
      })
      if (this.data.form.leaveStartTime && this.data.form.leaveEndTime) {
          this.testTime(this.data.form.leaveStartTime, this.data.form.leaveEndTime)
      }
  },
  clearTime1() {
      this.setData({
          'form.leaveStartTime': '',
          timeVisible1: false
      })
  },
  clearTime2() {
      this.setData({
          'form.leaveEndTime': '',
          timeVisible2: false
      })
  },
  closeTime1() {
      this.setData({
          timeVisible1: false
      })
  },
  closeTime2() {
      this.setData({
          timeVisible2: false
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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