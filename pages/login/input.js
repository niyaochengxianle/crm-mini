const app = getApp()

Page({
    data: {
        phone: '15348796547',
        password: '1234567',
        // phone:'',
        // password:'',
        loading: false,
        code:'',
        wxOpenId:'',
        nickName:'',
    },
    // 登录
    login() {
        if (!this.data.phone) {
            wx.showToast({
                title: '请输入账号',
                icon: 'none',
                duration: 2000
            })
            return
        }
        if (!this.data.password) {
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
        var obj = {
            code:this.data.code,
            type:'0',
            phone:this.data.phone,
            password:this.data.password
        }
        var that=this
        wx.request({
            url: wx.env.baseUrl + `/wechat`,
            method: "POST",
            data:obj,
            success(e) {
                const resp = e.data;
                if (resp.code === "200") {
                    const personId = resp.data.personId;
                    const type = resp.data.type;
                    const person = resp.data.person;
                    app.globalData.userInfo=person
                    wx.setStorageSync('person', person);
                    that.updatePas(person)
                    wx.setStorageSync('personId', personId);
                    wx.setStorageSync('type',type );
                    wx.showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 2000
                    })
                    wx.redirectTo({url: '/pages/index/index'})
                }else{
                    console.log(resp.data)
                    wx.showToast({
                        title: resp.data,
                        icon: 'fail',
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
            complete(){
                that.setData({
                    loading: false,
                });
            }
        })
    },
    login1() {
        this.setData({
            loading: true,
        });
        var obj = {
            code:this.data.code,
            type:'1',
        }
        var that=this
        wx.request({
            url: wx.env.baseUrl + `/wechat`,
            method: "POST",
            data:obj,
            success(e) {
                const resp = e.data;
                if (resp.code === "200") {
                    const personId = resp.data.personId;
                    const type = resp.data.type;
                    const person = resp.data.person;
                    that.globalData.userInfo=person
                    wx.setStorageSync('person', person);
                    wx.setStorageSync('personId', personId);
                    wx.setStorageSync('type',type );
                    wx.showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 2000
                    })
                    wx.redirectTo({url: '/pages/index/index'})
                }else{
                    wx.redirectTo({
                      url: '/pages/sales/index',
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
            complete(){
                that.setData({
                    loading: false,
                });
            }
        })
    },
    login2() {
        this.setData({
            loading: true,
        });
        var obj = {
            code:this.data.code,
            type:'2',
        }
        var that=this
        wx.request({
            url: wx.env.baseUrl + `/wechat`,
            method: "POST",
            data:obj,
            success(e) {
                const resp = e.data;
                console.log(resp)
                if (resp.code === "200") {
                    const personId = resp.data.personId;
                    const type = resp.data.type;
                    const person = resp.data.person;
                    wx.setStorageSync('person', person);
                    wx.setStorageSync('personId', personId);
                    wx.setStorageSync('type',type );
                    that.globalData.userInfo=person
                    wx.showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 2000
                    })
                    wx.redirectTo({url: '/pages/index/index'})
                }else{
                    wx.showToast({
                        title: resp.data,
                        icon: 'none',
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
            complete(){
                that.setData({
                    loading: false,
                });
            }
        })
    },
    onLoad: function (options) {
        wx.login({
            success:(key)=>{
              this.setData({
                  code:key.code,
              })
            //   let url="https://api.weixin.qq.com/sns/jscode2session?appid="+wx.env.appKey+"&secret="+wx.env.appSecret+"&js_code="+this.data.code+"&grant_type=authorization_code"
            //   wx.request({
            //       url:url,
            //       success:(res)=>{
            //         this.setData({
            //             wxOpenId:res.data.openid,
            //         })
            //       }
            //   })
            }
        })
    },
});
