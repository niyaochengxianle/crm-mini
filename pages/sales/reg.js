// pages/sales/reg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    salesInfo:{
      "areaCode": "",
      "areaName": "",
      "channelId": "",
      "channelName": "",
      "masterId": '',
      "masterName": "",
      "name": "",
      "openId": "",
      "phone": "",
    },
    info:{},
    code:'',
    loading:false
  },
  setVal(e){
    this.setData({
      ['salesInfo.name']:e.detail
    })
  },
  setVal1(e){
    this.setData({
      ['salesInfo.phone']:e.detail
    })
  },
  checkPhone(phone){
    return /^1[2-9]\d{9}$/.test(phone)
  },
  save(){
    console.log(this.data.salesInfo)
    let that = this
    if(!this.data.salesInfo.name){
      wx.showToast({
      title: '请输入姓名',
      icon:'none'
      })
      return false
    }
    let check = this.checkPhone(this.data.salesInfo.phone)
    if(!check){
      wx.showToast({
        title: '请输入正确手机号',
        icon:'none'
      })
      return false
    }
    if(!this.data.salesInfo.openId){
      wx.showToast({
      title: '未获取到openId',
      icon:'none'
      })
      return false
    }
    that.setData({
      loading:true,
    })
    wx.request({
      url: wx.env.baseUrl+'/channel/staff',
      method:'post',
      data:that.data.salesInfo,
      success(e){
        let res = e.data
        if(res.code=='200'){
          wx.showModal({
            title: '提示',
            content: '注册成功，即将前往登录',
            success (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/login/input',
                })
              }
            }
          })
        }else{
          wx.showToast({
            title: res.data,
            icon:'none',
            duration:2000,
          })
          that.setData({
            loading:false,
          })
        }
      },fail(e){
        wx.showToast({
          title: e,
          icon:'none',
          duration:2000,
        })

      },complete(e){
        that.setData({
          loading:false,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.getCode()
    console.log(option)
    if(option.scene){
      let scene =decodeURIComponent(option.scene)
      let arr = scene.split(',')
      let id = arr[0]
      // let typePage = arr[1]
      this.setData({
        ['salesInfo.masterId']:id,
      })
      this.getInfo(id)
    } 
  },
  getInfo(id){
    console.log(id)
    this.setData({
      loading:true
    })
    var that = this
    wx.request({
      url: wx.env.baseUrl +"/channel/master/"+id,
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
  getCode(){
    console.log('getCode')
    let that = this
    wx.login({
        success:(key)=>{
            wx.setStorageSync('wxCode', key.code);
            wx.request({
              url: wx.env.baseUrl+'/wechat?code='+key.code,
              success(e){
                  let res = e.data
                  console.log(res,'reg-sus')
                  if(res.code=='200'){
                    wx.setStorageSync('wxOpenId', res.data);
                    that.setData({
                      ['salesInfo.openId']:res.data,
                    })
                  }else{
                      wx.showToast({
                        title: '请重新进入小程序',
                        icon:'none',
                        duration:'2000'
                      })
                  }
              },fail(e){
                console.log(e,'fail')
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