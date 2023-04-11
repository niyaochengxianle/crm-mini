// const http = require('../../../utils/httpUtil.js')
// const app = getApp()
Page({
    data: {
        list: [
          {
            name:'name',
            code:'code',
            text:'text'
          },
          {
            name:'name',
            code:'code',
            text:'text'
          },
          {
            name:'name',
            code:'code',
            text:'text'
          }
        ],
        page: {current: 1, size: 100, total: 0,keyword:''},
        loading: false
    },
    onLoad() {
        var that = this;
        // that.init()
    },
          /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh: function () { 
        var that = this;
        setTimeout(function () {
            // that.init() 
        }, 500);
    },
    // 上滑加载
    onReachBottom(){
      console.log('加载')
    },
    init() {
        var that = this
        var query = {
            current: that.data.page.current,
            size: that.data.page.size,
        }
        that.setData({
            loading: true
        })
        // 请求数据
        // app.wxRequest('GET', '/tech/courseSelectTask/page', query, e => {
        //     var res = e.data
        //     if (res.code === 0) {
        //         that.setData({
        //             list: res.data.records,
        //         })
        //     } else {
        //         wx.showToast({
        //             title: '获取数据失败，请稍后再试',
        //             icon: 'none',
        //             duration: 2000
        //         })
        //     }
        // }, err => {
        //     wx.showToast({
        //         title: '获取数据失败，请稍后再试',
        //         icon: 'none',
        //         duration: 2000
        //     })

        // }, res => {
        //     wx.stopPullDownRefresh()
        //     that.setData({
        //         loading: false
        //     })
        // })
    },
    toDetail(e) {
        let task = e.currentTarget.dataset.task
        wx.navigateTo({url: '/pages/admin/detail?id=' + task.id})

    },
});