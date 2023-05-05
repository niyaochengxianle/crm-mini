const app = getApp()

Page({
    data: {
        // phone: '15348796547',
        // password: '1234567',
        phone:'',
        password:'',
        loading: false,
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
            openId:wx.getStorageSync('wxOpenId'),
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
            openId:wx.getStorageSync('wxOpenId'),
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
    //游客登录
    login2() {
        this.setData({
            loading: true,
        });
        var obj = {
            openId:wx.getStorageSync('wxOpenId'),
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
        let scene =decodeURIComponent(options.scene)
        let arr = scene.split(',')
        let id = arr[0]
        let typePage = arr[1]
        //0管理员邀请业务员 1业务员邀请客户 ,2进入课程签到
        if(typePage==0){
            console.log('业务员')
           let toUrl= '/pages/sales/reg?id='+ id +'&type='+typePage
           wx.redirectTo({
             url: toUrl,
           })
           return
        }
        if(typePage==1){
            let toUrl= '/pages/custom/reg?id='+ id +'&type='+typePage
            wx.redirectTo({
              url: toUrl,
            })
            return
         }
         if(typePage==2){
            let toUrl= '/pages/course/sign?id='+ id +'&type='+typePage
            wx.redirectTo({
              url: toUrl,
            })
            return
         }
    },
});
