// app.js
const http = require('./utils/httpUtil')

App({
    onLaunch(option) {
        if (option.path) {
            wx.setStorageSync('path', option.path);
        }
        wx.env.baseUrl = 'https://test.tech.kuairui.tech';
        wx.env.appId = 'wx3950cca53460d310';//小程序appId
        // wx.env.appKey = '57C0D1EEA84340D7';//微校appKey
    
        wx.env.tips = '系统开小差了，请稍后再试';
        // 登录
        const that = this;
        // that.getToken();
    },
    getToken() {
        let storePath = wx.getStorageSync('path')
        let indexPath = 'pages/login/login'
        let loginPath = 'pages/login/login'
        if (storePath && storePath !== indexPath) {
            if (wx.env.token) {
                wx.navigateTo({url: '/' + wx.getStorageSync('path')})
            } else {
                wx.navigateTo({url: '/' + loginPath})
            }
        }
    },
    jump(path) {
        if (wx.env.token) {
            wx.navigateTo({url: path})
        } else {
            wx.navigateTo({url: '/pages/login/login'})
        }
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
    // 获取用户信息 不登录则无权限
    getUserInfo() {
        const that = this;
        that.wxRequest('GET', '/admin/user/info', null, e => {
            const data = e.data.data
            if (e.data.code === 0) {
                that.globalData.userInfo = data.sysUser
                wx.setStorageSync('user', data.sysUser)
                setTimeout(() => {
                    wx.redirectTo({url: '/pages/index/index'})
                }, 1000);
            } else {
                const msg = e.data.msg
                wx.showModal({
                    cancelColor: "#999999",
                    confirmColor: "#1ba784",
                    title: msg ? msg : '获取用户信息失败，请联系管理员'
                })
            }
        }, err => {
            wx.showModal({
                cancelColor: "#999999",
                confirmColor: "#1ba784",
                title: '获取用户信息失败，请稍后重试'
            })
        }, res => {
        })
    },
    globalData: {
        userInfo: null,
    }
})
