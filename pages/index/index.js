const app = getApp()
Page({
    data: {
        channelInfo:{
            name:'渠道名',
            code:'No111134555',
            userName:'',
            phone:'',
            passWord:''
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
            {
                pagePath: "/pages/course/index",
                text: "课程",
                iconPath:"/image/icon/cs_1.png",
                selectedIconPath: "/image/icon/cs.png",
            },
            {
                pagePath: "/pages/index/index",
                text: "我的",
                iconPath:"/image/icon/m_1.png",
                selectedIconPath: "/image/icon/m.png",
            }
        ],
        menuList:[
            {
                path:'/pages/course/index',
                icon:'/image/icon/kcsm.png',
                text:'课程扫码'
            },
            {
                path:'/pages/custon/index',
                icon:'/image/icon/lr.png',
                text:'录入'
            },
            {
                path:'/pages/salse/view',
                icon:'/image/icon/yq.png',
                text:'客户邀请'
            },
            {
                path:'/pages/custon/list',
                icon:'/image/icon/cx.png',
                text:'客户查询'
            },
            {
                path:'/pages/custon/list',
                icon:'/image/icon/xx.png',
                text:'客户信息'
            },
            {
                path:'',
                icon:'/image/icon/qd.png',
                text:'渠道列表'
            },
        ],
        notLogin: false,
        active:0,
    },
    onLoad() {
        let that = this
        let userInfo = wx.getStorageSync('person')
        console.log(wx.getStorageSync('person'))
        this.setData({
            channelInfo: userInfo
        })
    },
    // onShow() {
    //     this.getTabBar().init() // 设置tabbar active状态
    //   },
    // 获取详细的学生信息
    getInfo(userCode) {
        app.wxRequest('GET', '/tech/student/studentNo/' + userCode, null, e => {
            const data = e.data.data
            if (e.data.code === 0) {
                this.setData({
                    'userInfo.gradeName': data.gradeName,
                    'userInfo.className': data.className,
                })
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
    toLogin() {
        wx.navigateTo({url: '/pages/login/login'})
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
        this.setData({ active: event.detail });
    },
    toPath(e){
        
        let path = e.currentTarget.dataset.url
        // app.jump(path)
        console.log(e);
    }
})
;
