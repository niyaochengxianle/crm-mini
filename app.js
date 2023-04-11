// app.js
const http = require('./utils/httpUtil')

App({
    onLaunch(option) {
        if (option.path) {
            wx.setStorageSync('path', option.path);
        }
        wx.env.baseUrl = 'http://47.108.58.40:22115';
        wx.env.appId = 'wx3950cca53460d310';//小程序appId
        // wx.env.appKey = '57C0D1EEA84340D7';//微校appKey
    
        wx.env.tips = '系统开小差了，请稍后再试';
        // 登录
        const that = this;
        // that.getToken();
    },
    getToken() {
        // let storePath = wx.getStorageSync('path')
        // let indexPath = 'pages/login/login'
        // let loginPath = 'pages/login/login'
        // if (storePath && storePath !== indexPath) {
        //     if (wx.env.token) {
        //         wx.navigateTo({url: '/' + wx.getStorageSync('path')})
        //     } else {
        //         wx.navigateTo({url: '/' + loginPath})
        //     }
        // }
    },
    /**
     * 封装request请求
     * method： 请求方式
     * url: 请求地址
     * query： 要传递的参数
     * success： 请求成功回调函数
     * fail： 请求失败回调函数
     * complete： 请求完成回调函数
     **/
    wxRequest(method, url, query, success, fail, complete) {
        http.request({
            url: url,
            method: method,
            data: query,
            // request成功请求，无论返回什么状态码，都会走success
            success: (res) => {
                if (res.statusCode === 200) {
                    success(res);
                } else {
                    fail(res)
                }
            },
            fail: (err) => {
                fail(err)
            },
            complete(res) {
                complete(res)
            }
        })
    },
    globalData: {
        userInfo: null,
    }
})
