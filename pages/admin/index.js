const app = getApp()
Page({
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
        var that = this;
        this.setData({
          ['page.current']:1,
          list:[]
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
    toDetail(e) {
        let task = e.currentTarget.dataset.task
        wx.navigateTo({url: '/pages/admin/detail?id=' + task.id})
    },
});