// pages/sales/view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    isEdit:false,
    info:{},
    loading:false,
    imgSrc:'',
  },
  //获取二维码
  getScanCode(id,type){
    let url=wx.env.baseUrl+'/wechat/getQrCode/'+id+'/'+type
    let that = this
      wx.request({
        url: url,
        method:'get',
        success(e){
          let res = e.data
          if(res.code==='200'){
            that.setData({
              imgSrc:wx.env.groupUrl+res.data
            })
          }
        },fail(e){
          wx.showToast({
              title: '获取二维码失败',
              icon: 'none',
              duration: 2000
          })
        },complete(e){

        }
      })
  },

  //获取业务员详情
  getInfo(id){
    this.setData({
      loading:true
    })
    let that = this
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
  setVal(e){
    this.setData({
      ['info.name']:e.detail
    })
  },
  setVal1(e){
    this.setData({
      ['info.phone']:e.detail
    })
  },
  //打开二维码显示
  showPopup() {
    this.setData({ show: true });
  },
  // 关闭二维码显示
  onClose() {
    this.setData({ show: false });
  },
  // 编辑
  showEdit() {
    this.setData({ isEdit: true });
  },
  // 取消编辑
  closeEdit(){
    this.setData({ isEdit: false });
  },
  // 保存编辑信息
  save(){
    this.setData({
      loading:true,
    })
    let that=this
    wx.request({
      url: wx.env.baseUrl+'/channel/staff',
      method:'post',
      data:that.data.info,
      success(e){
        let res = e.data
        if(res.code=='200'){
          wx.showToast({
            title: '编辑成功',
            icon:'none',
            duration:2000
          })
          that.setData({
            loading:false,
            isEdit:false
          })
        }
      },fail(e){},complete(e){
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
    let id = wx.getStorageSync('personId')
    this.getInfo(id)
    this.getScanCode(id,1)
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