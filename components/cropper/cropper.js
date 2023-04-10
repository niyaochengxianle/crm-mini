import WeCropper from './we-cropper.js'

const app = getApp()
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50
Component({
    properties: {},
    data: {
        cropperOpt: {
            id: 'cropper',
            targetId: 'targetCropper',
            pixelRatio: device.pixelRatio,
            width,
            height,
            scale: 2.5,
            zoom: 8,
            cut: {
                x: (width - 300) / 2,
                y: (height - 300) / 2,
                width: 300,
                height: 300
            },
            boundStyle: {
                color: "#04b00f",
                mask: 'rgba(0,0,0,0.8)',
                lineWidth: 1
            }
        },
        dataInfo: {},
        // 是否还原
        isReduction: false
    },
    methods: {
        onLoad(options) {
            const data = JSON.parse(options.data)
            this.setData({
                dataInfo: data,
            })
            if (data.src) {
                this.data.src = data.src;
            }
            this.init();
        },
        // 初始化
        init() {
            const {
                    cropperOpt
                } = this.data,
                src = this.data.src;
            cropperOpt.boundStyle.color = "#04b00f";
            this.setData({
                cropperOpt
            })
            this.cropper = new WeCropper(cropperOpt)
                .on('ready', (ctx) => {
                    if (src) {
                        ctx.pushOrign(src);
                    }
                })
                .on('beforeImageLoad', (ctx) => {
                    wx.showToast({
                        title: '上传中',
                        icon: 'loading',
                        duration: 20000
                    })
                })
                .on('imageLoad', (ctx) => {
                    wx.hideToast()
                })
        },
        // 触摸开始
        touchStart(e) {
            const isReduction = this.data.isReduction;
            this.cropper.touchStart({
                touches: e.touches.filter(i => i.x !== undefined)
            });
            if (!isReduction) {
                this.setData({
                    isReduction: true
                })
            }
        },
        // 移动
        touchMove(e) {
            this.cropper.touchMove({
                touches: e.touches.filter(i => i.x !== undefined)
            })
        },
        // 触摸结束
        touchEnd(e) {
            this.cropper.touchEnd(e)
        },
        // 完成
        getCropperImage() {
            let that = this;
            that.cropper.getCropperImage().then((src) => {
                let pages = getCurrentPages();
                let prevPage = pages[pages.length - 2]; //pages.length - 2上一页
                prevPage.afterCropper(src)
                wx.navigateBack();
            }).catch(e => {
                wx.showToast({title: '获取图片地址失败', icon: 'none', duration: 2000})
            })
        },
        // 还原
        reduction() {
            const isReduction = this.data.isReduction,
                that = this;
            if (!isReduction) return;
            this.cropper.reduction().then(() => {
                that.setData({
                    isReduction: !isReduction
                })
            });
        },
        // 取消
        cancel() {
            wx.navigateBack();
        }
    }
})