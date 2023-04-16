const app = getApp()
Page({
    data: {
        channelInfo:{
            name:'',
            channelId:'',
            channelName:'',
            phone:'',
            password:''
        },
        tabList:[
            {
                pagePath: "/pages/index/index",
                text: "首页",
                iconPath: "/image/icon/h_1.png",
                selectedIconPath: "/image/icon/h.png",
            },
            {
                pagePath: "/pages/custom/list",
                text: "客户",
                iconPath: "/image/icon/c_1.png",
                selectedIconPath: "/image/icon/c.png"
            },
            //自己的课程 可扫码
            {
                pagePath: "/pages/custom/course",
                text: "课程",
                iconPath:"/image/icon/cs_1.png",
                selectedIconPath: "/image/icon/cs.png",
            },
            {
                pagePath: "/",
                text: "我的",
                iconPath:"/image/icon/m_1.png",
                selectedIconPath: "/image/icon/m.png",
            }
        ],
        menuList:[
            {
                path:'/pages/sales/index',
                // path:'/pages/sales/reg',
                icon:'/image/icon/qd.png',
                text:'业务员注册'
            },
            {
                path:'/pages/custom/reg',
                icon:'/image/icon/qd.png',
                text:'客户注册'
            },
            {
                path:'/pages/custom/course',
                icon:'/image/icon/kcsm.png',
                text:'课程扫码'
            },
            {
                path:'/pages/course/index',
                icon:'/image/icon/lr.png',
                text:'录入课程'
            },
            {
                path:'/pages/sales/view',
                icon:'/image/icon/yq.png',
                text:'客户邀请'
            },
            {
                path:'/pages/custom/list',
                icon:'/image/icon/cx.png',
                text:'客户查询'
            },
            {
                path:'/pages/custom/list',
                icon:'/image/icon/xx.png',
                text:'客户信息'
            },
            {
                path:'/pages/admin/index',
                icon:'/image/icon/qd.png',
                text:'业务员列表'
            },
        ],
        notLogin: false,
        active:0,
        isFirst:false,
        isAdmin:true,
        loading:false
    },
    onLoad() {
        let that = this
        let type = wx.getStorageSync('type')
        if(type=='0'){
            this.setData({
                isAdmin:true
            })
        }else{
            this.setData({
                isAdmin:false
            })
        }
        let userInfo = wx.getStorageSync('person')
        let personId=wx.getStorageSync("personId")
        if(!personId){
            wx.navigateTo({
              url: '/pages/login/input',
            })
            return 
        }
        if(userInfo.password=='123456'){
            this.setData({
                isFirst:true
            })
        }else{
            this.setData({
                isFirst:false
            })
        }
        this.showMenu()
        this.setData({
            channelInfo: userInfo
        })
    },
    //修改密码
    updatePas(){
        this.setData({
            loading:true
        })
        let that = this
        wx.request({
          url:wx.env.baseUrl+ '/channel/master',
          method:'post',
          data:this.data.channelInfo,
          success(e){
              let res = e.data
              if(res.code=='200'){
                  wx.showToast({
                    title: '修改成功',
                    icon:'none',
                    duration:2000
                  })
                  that.setData({
                    isFirst:false
                })
              }else{
                wx.showToast({
                    title: '请求失败，请稍后再试',
                    icon:'none',
                    duration:2000
                  })
                }
              that.getInfo()
          },
          fail(e){
            wx.showToast({
                title: '请求失败，请稍后再试',
                icon:'none',
                duration:2000
              })
          },
          complete(e){
            that.setData({
                  loading:false
              })
          }
        })
    },
    getInfo(){
        wx.request({
            url:wx.env.baseUrl+ '/channel/master'+this.data.channelInfo.id,
            method:'get',
            success(e){
                let res = e.data
                if(res.code=='200'){
                    this.setData({
                        channelInfo:res.data
                    })
                }
            }
        })
    },
    setVal(e){
        this.setData({
           [' channelInfo.passWord']:e.detail
        })
    },
    toInvite(){
        let personId=wx.getStorageSync("personId")
        let type=wx.getStorageSync("type")
        let url='/pages/admin/invite?id='+ personId +'&type='+type+'&code='+this.data.channelInfo.channelId+'&name='+this.data.channelInfo.channelName
        wx.navigateTo({url:url})

    },
    toLogin() {
        wx.navigateTo({url: '/pages/login/input'})
    },
    // 点击菜单
    toItem(e) {
        let path = e.currentTarget.dataset.url
        wx.navigateTo({
          url: path,
        })
    },
    onChange(event) {
        // event.detail 的值为当前选中项的索引
        // this.setData({ active: event.detail });
    },
    toPath(e){
        let path = e.currentTarget.dataset.url
         wx.navigateTo({
            url: path,
          })
    },
    showMenu(){
        let type = wx.getStorageSync('type')
        // 0-渠道管理员 1-渠道业务员 2-区域总经理 3-区域业务员 4-直营当地渠道管理员 5-直营当地分公司 6-直营当地分公司业务员 7-客户
        //渠道管理员 课程扫码 客户列表 客户查询 业务员列表 邀请业务员 课程列表
        //渠道业务员 课程扫码 客户列表 客户查询 客户邀请 课程列表  
        //区域总经理 课程扫码 客户列表 课程排期 邀请业务员
        //区域业务员 课程扫码 客户列表 课程列表
         //渠道管理员
        let menu = [
            {
                path:'/pages/custom/course',
                icon:'/image/icon/kcsm.png',
                text:'课程扫码'
            },
            {
                path:'/pages/custom/list',
                icon:'/image/icon/cx.png',
                text:'客户查询'
            },
            {
                path:'/pages/custom/list',
                icon:'/image/icon/xx.png',
                text:'客户信息'
            },
            {
                path:'/pages/admin/index',
                icon:'/image/icon/qd.png',
                text:'业务员列表'
            },
        ]
        //渠道业务员
        let menu1=[
            {
                path:'/pages/custom/course',
                icon:'/image/icon/lr.png',
                text:'课程扫码'
            },
            {
                path:'/pages/custom/list',
                icon:'/image/icon/cx.png',
                text:'客户查询'
            },
            {
                path:'/pages/sales/view',
                icon:'/image/icon/cx.png',
                text:'客户邀请'
            },
        ]
        //区域总经理
        let menu2=[
            {
                path:'/pages/admin/invite',
                icon:'/image/icon/qd.png',
                text:'邀请业务员'
            },
            {
                path:'/pages/custom/course',
                icon:'/image/icon/kcsm.png',
                text:'课程扫码'
            },
            {
                path:'/pages/course/list',
                icon:'/image/icon/lr.png',
                text:'录入课程'
            },
            {
                path:'/pages/admin/index',
                icon:'/image/icon/qd.png',
                text:'业务员列表'
            },
            {
                path:'/pages/custom/list',
                icon:'/image/icon/cx.png',
                text:'客户列表'
            },
        ]
        //区域业务员
        let menu3=[
            {
                path:'/pages/custom/list',
                icon:'/image/icon/kcsm.png',
                text:'课程扫码'
            },
            {
                path:'/pages/custom/list',
                icon:'/image/icon/cx.png',
                text:'客户列表'
            },
        ]
         //直营当地渠道管理员 渠道邀请 客户列表 课程列表 课程扫码
        // 直营地当地分公司 课程扫码 客户列表 客户查询 邀请业务员
        //直营地当地分公司业务员 邀请客户 客户列表 客户查询
        let menu4=[
            {
                path:'/pages/custom/course',
                icon:'/image/icon/kcsm.png',
                text:'课程扫码'
            },
            {
                path:'/pages/custom/list',
                icon:'/image/icon/cx.png',
                text:'客户列表'
            },
        ]
        let menu5=[
            {
                path:'/pages/custom/course',
                icon:'/image/icon/kcsm.png',
                text:'课程扫码'
            },
            {
                path:'/pages/admin/invite',
                icon:'/image/icon/qd.png',
                text:'邀请业务员'
            },
            {
                path:'/pages/custom/list',
                icon:'/image/icon/cx.png',
                text:'客户列表'
            },
        ]
        let menu6=[
            {
                path:'/pages/custom/list',
                icon:'/image/icon/cx.png',
                text:'客户查询'
            },
            {
                path:'/pages/sales/view',
                icon:'/image/icon/cx.png',
                text:'客户邀请'
            },
        ]
        let menu7=[
              {
                path:'/pages/custom/list',
                icon:'/image/icon/cx.png',
                text:'客户列表-查询'
            },
        ]
        if(type==0){
            this.setData({
                menuList:menu
            })
        }
        if(type==1){
            this.setData({
                menuList:menu1
            })
        }
        if(type==2){
            this.setData({
                menuList:menu2
            })
        }
        if(type==3){
            this.setData({
                menuList:menu3
            })
        }
        if(type==4){
            this.setData({
                menuList:menu4
            })
        }
        if(type==5){
            this.setData({
                menuList:menu5
            })
        }
        if(type==6){
            this.setData({
                menuList:menu6
            })
        }

    },
})
;
