// app.js
const http = require('./utils/httpUtil')

App({
    onLaunch(option) {
        if (option.path) {
            wx.setStorageSync('path', option.path);
        }
        wx.env.baseUrl = 'https://crm.bjzqlaw.com/zqApi';
        wx.env.groupUrl = 'https://crm.bjzqlaw.com';
        wx.env.appSecret="aeb28780b5b7a09519a937e0d4701c56",
        wx.env.appKey="wxe3e8a7da016f7fc9"
        wx.env.tips = '系统开小差了，请稍后再试';
        if(option.scene==1011 || option.scene==1012 || option.scene==1013 || option.scene==1047 || option.scene==1048 || option.scene==1049){
            let scene =decodeURIComponent(option.query.scene)
            let arr = scene.split(',')
            let id = arr[0]
            let type = arr[1]
            //0管理员邀请业务员 1业务员邀请可 ,2进入课程签到
            if(type==0){
                console.log('业务员')
               let toUrl= '/pages/sales/reg?id='+ id +'&type='+type
               wx.navigateTo({
                 url: toUrl,
               })
            }
            if(type==1){
                console.log('客户')
                let toUrl= '/pages/custom/reg?id='+ id +'&type='+type
                wx.navigateTo({
                  url: toUrl,
                })
             }
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
    globalData: {
        userInfo: null,
    }
})
