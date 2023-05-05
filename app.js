// app.js
const http = require('./utils/httpUtil')

App({
    onLaunch(option) {
        wx.env.baseUrl = 'https://crm.bjzqlaw.com/zqApi';
        wx.env.groupUrl = 'https://crm.bjzqlaw.com';
        wx.env.tips = '系统开小差了，请稍后再试';
        this.getCode();
        let type= wx.getStorageSync('type')
        if(type==1||type==3||type==6){
            this.check()
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
    getCode(){
        wx.login({
            success:(key)=>{
                wx.setStorageSync('wxCode', key.code);
                wx.request({
                  url: wx.env.baseUrl+'/wechat?code='+key.code,
                  success(e){
                      let res = e.data
                      if(res.code=='200'){
                        wx.setStorageSync('wxOpenId', res.data);
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
    getInfo(){
        let id = wx.getStorageSync('personId')
        if(!id){
            wx.redirectTo({
              url: '/pages/login/input',
            })
        }
        wx.request({
          url: wx.env.baseUrl +"/channel/staff/"+id,
          method:'get',
          success(e){
            var res = e.data
            if(res.code==='200'){
                console.log(res.data.isEnable)
              if(res.data.isEnable===false){
                  wx.redirectTo({
                    url: '/pages/login/input',
                  })
              }
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
          }
        })
      },
      check(){
          let that =this
        setInterval(
        function () {
            // TODO 你需要无限循环执行的任务
            that.getInfo()
        }, 2000);       
      },
    globalData: {
        userInfo: null,
    }
})
