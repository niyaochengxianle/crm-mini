const app = getApp()

Page({
    data: {
        userName: '',
        passWord: '',
        loading: false
    },
    // 登录
    login() {
        if (!this.data.userName) {
            wx.showToast({
                title: '请输入账号',
                icon: 'none',
                duration: 2000
            })
            return
        }
        if (!this.data.passWord) {
            wx.showToast({
                title: '请输入密码',
                icon: 'none',
                duration: 2000
            })
            return
        }

        this.setData({
            loading: true,
        });
        var that = this
        // 20200200120 NC193227
        var userName = this.data.userName;
        var passWord = this.data.passWord;
        var CryptoJS = require('../../utils/aesUtil')
        const password = CryptoJS.enc(passWord);
        var userInfo = {
            username: userName,
            password: encodeURIComponent(password),
            grant_type: 'password',
            scope: 'server'
        }
        wx.request({
            url: wx.env.baseUrl + `/auth/oauth/token?username=${userInfo.username}&password=${userInfo.password}&randomStr=43551621480681628&code=&grant_type=password&scope=server`,
            header: {
                isToken: false,
                'Authorization': 'Basic a3J0ZWNoOmtydGVjaA=='
            },
            method: "POST",
            success(e) {
                const resp = e.data;
                if (e.statusCode === 200) {
                    const token = resp.access_token;
                    wx.setStorageSync('token', token);
                    wx.env.token = token;
                    wx.showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 2000
                    })
                }
            },
            fail(res) {
                wx.showToast({
                    title: '登录失败，请稍后重试',
                    icon: 'none',
                    duration: 2000
                })
            },
            complete(e) {
                that.setData({
                    loading: false,
                });
                app.getUserInfo()
            }
        })
    },
});