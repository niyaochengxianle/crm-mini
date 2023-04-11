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
                pagePath: "/pages/course/list",
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
    },
    onLoad() {
        let that = this
        let userInfo = wx.getStorageSync('person')
        let personId=wx.getStorageSync("personId")
        if(!personId){
            wx.navigateTo({
              url: '/pages/login/input',
            })
            return 
        }
        this.setData({
            channelInfo: userInfo
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
    }
})
;
