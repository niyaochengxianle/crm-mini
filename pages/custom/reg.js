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
      "staffId": "",
      "masterName": "",
      "name": "",
      "openId": "",
      "phone": "",
      "hopePlace":'',
    },
    info:{},
    loading:false,
    show:false,
    code:'',
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
  setValP(e){
    this.setData({
      ['customInfo.hopePlace']:e.detail
    })
  },
  save(){
    console.log(this.data.customInfo)
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
            showCancel:false,
            success (res) {
              if (res.confirm) {
                wx.redirectTo({
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
  onLoad: function (option) {
    this.getCode()
    if(option.scene){
      let scene =decodeURIComponent(option.scene)
      let arr = scene.split(',')
      let id = arr[0]
      // let typePage = arr[1]
      this.setData({
        ['customInfo.staffId']:id,
      })
      this.getInfo(id)
    } 
    this.setData({
      areaList:areaList.areaList,
    })
    this.getInfo(options.id)
  },
  getCode(){
    console.log('getCode')
    let that = this
    wx.login({
        success:(key)=>{
            wx.setStorageSync('wxCode', key.code);
            console.log(key.code,'reg,code')
            wx.request({
              url: wx.env.baseUrl+'/wechat?code='+key.code,
              success(e){
                  let res = e.data
                  if(res.code=='200'){
                    wx.setStorageSync('wxOpenId', res.data);
                    that.setData({
                      ['customInfo.openId']:res.data,
                    })
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