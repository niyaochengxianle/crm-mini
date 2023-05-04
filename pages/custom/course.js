// pages/custom/course.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames:[],
    active:0,
    page: {current: 1, size: 30, keyWord:'',masterId:null,type:0},
    loading: false,
    list:[],
    signInfo:{
      courseId:'',
      customerId:'',
    }
  },
  tapScan: function() {
    wx.scanCode({
      success: function(res) {
        // let scene =decodeURIComponent(res.scene)
        // let arr = scene.split(',')
        // let id = arr[0]
        // let typePage = arr[1]
        // this.setData({
        //   ['signInfo.courseId']:id,
        //   ['signInfo.customerId']:wx.getStorageSync("personId")
        // })
        // this.signCourse()
      }
    })
  },
  signCourse(){
    that.setData({
      loading:true
    })
    let that = this
    wx.request({
      url: wx.env.baseUrl+'/lesson/sign',
      method:'post',
      data:that.signInfo,
      success(e){
        const resp = e.data;
        if (resp.code === "200") {
          wx.showToast({
            title: "课程签到成功",
            icon: 'fail',
            duration: 2000
          })
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
            })
        }
      },fail(e){
        wx.showToast({
            title: '签到失败',
            icon: 'fail',
            duration: 2000
        })
      },complete(){
        that.setData({
          loading:false
        })
      }
    })
  },
  onChange(e){
    this.setData({
      active:e.detail.index,
      ['page.type']:e.detail.index,
      list:[],
    })
    this.init()
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
        keyword: that.data.page.keyWord,
        type: that.data.page.type,
        customerId:masterId
    }
    that.setData({
        loading: true
    })
    // 请求数据
    app.wxRequest('GET','/lesson/mini/list/customer',query,e=>{
      var res = e.data
      if (res.code ==200) {
        let arr = that.data.list.concat(res.data)
        that.setData({
            list: arr,
        })
        this.getActives()
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
  getActives(){
    let s = this.data.list.length
    if(s>0){
      let arr=[]
      for(let i=0; i<s;i++){
          arr.push(i+'')
      }
      this.setData({
        activeNames:arr
      })
    }else{
      this.setData({
        activeNames:[]
      })
    }
  },
  toAdd(){
    console.log(1)
    wx.navigateTo({
      url: '/pages/course/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.init()
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
