// pages/course/index.js
const weCropper = require('../../components/cropper/we-cropper.js')
const moment = require('../../utils/moment.js')
const areaList= require('../../utils/areaArr')
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
    loading:false,
    name:'',
    form:{
        name:'',
        beginDate:'',
        endDate:'',
        dutyPerson:'',
        description:'',
        signPerson:'',
        areaName:'',
        areaCode:'',
    },
    timeVisible1: false,
    timeVisible2: false,
    currentDate: new Date(moment().format('YYYY-MM-DD HH:mm')).getTime(),
    minDate: new Date(moment().format('YYYY-MM-DD')).getTime(),
    maxDate: moment().add(100, 'day')._d.getTime(),
    endMaxDate: moment().add(100, 'day')._d.getTime(),
    areaList:[],
  },
  setVal(e){
      this.setData({
          ['form.name']:e.detail
      })
  },
setVal1(e){
    this.setData({
        ['form.dutyPerson']:e.detail
    })
},
    setVal2(e){
        this.setData({
            ['form.signPerson']:e.detail
        })
    },
    setVal3(e){
        this.setData({
            ['form.description']:e.detail
        })
    },
  //提交课程
  subCourse(){
    if(!this.data.form.name){
        wx.showToast({
        title: '请输入课程名称',
        icon:'none'
        })
        return false
    }
    if(!this.data.form.beginDate){
        wx.showToast({
          title: '请选择开课日期',
          icon:'none'
        })
        return false
    }
    if(!this.data.form.endDate){
        wx.showToast({
          title: '请选择结束日期',
          icon:'none'
        })
        return false
    }
    if(!this.data.form.dutyPerson){
        wx.showToast({
          title: '请输入课程负责人',
          icon:'none'
        })
        return false
    }
    if(!this.data.form.signPerson){
        wx.showToast({
          title: '请输入签到负责人',
          icon:'none'
        })
        return false
    }
    if(!this.data.form.areaName){
        wx.showToast({
          title: '请选择课程区域',
          icon:'none'
        })
        return false
    }
    if(!this.data.form.description){
        wx.showToast({
          title: '请输入课程简介',
          icon:'none'
        })
        return false
    }
      this.setData({
          loading:true
      })
      let that = this
      wx.request({
        url:wx.env.baseUrl+ '/lesson',
        method:'post',
        data:this.data.form,
        success(e){
            let res = e.data
            if(res.code==='200'){
                wx.navigateTo({
                  url: '/pages/course/list',
                })
            }
        },fail(e){
            console.log(e)
            wx.showToast({
              title: '提交课程失败，请稍后再试',
              icon:'none'
            })
        },complete(e){
            that.setData({
                loading:false
            })
        }
      })
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
          'form.beginDate': moment(val.detail).format('YYYY-MM-DD'),
          timeVisible1: false
      })
      this.timeVisible1 = false
      if (this.data.form.beginDate && this.data.form.endDate) {
          this.testTime(this.data.form.beginDate, this.data.form.endDate)
      }
  },
  // 确认时间
  confirmTime2(val) {
      this.setData({
          'form.endDate': moment(val.detail).format('YYYY-MM-DD'),
          timeVisible2: false
      })
      if (this.data.form.beginDate && this.data.form.endDate) {
            this.testTime(this.data.form.beginDate, this.data.form.endDate)
        }
  },
  testTime(date1, date2) {
    if (moment(date1).isSameOrBefore(date2)) {
       
    } else {
        wx.showToast({
            title: '结束日期小于开始日期，请重新选择',
            duration: 2000,
            icon: "none"
        })
        this.setData({
            'form.endDate':null
        })
        
    }
},
  clearTime1() {
      this.setData({
          'form.beginDate': '',
          timeVisible1: false
      })
  },
  clearTime2() {
      this.setData({
          'form.endDate': '',
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
            ['form.areaName']:val,
            ['form.areaCode']:code
        })
        this.onClose()
      },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        areaList:areaList.areaList
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