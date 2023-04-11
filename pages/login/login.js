const app = getApp()
Page({
    data: {
        loading: false,
        code:'',
    },
    onLoad: function (options) {
        wx.login({
            success:(key)=>{
                console.log(key)
              this.setData({
                  code:key.code,
              })
            }
        })
    },
    // 授权登录
    baseLogin(loginInfo) {
        console.log(loginInfo)
        if(loginInfo.detail.errMsg == "getPhoneNumber:ok"){

        }
    },
    // 输入密码登录
    toInput() {
        console.log(1)
        wx.navigateTo({url: '/pages/login/input'})
    }
});
