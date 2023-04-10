const app = getApp();

function dictItem(str, callback) {
    app.wxRequest('POST', '/admin/dict/item/list', {type: str}, res => {
        if (res.data.code === 0) {
            callback(res.data.data)
        } else {
            wx.showToast({
                title: '获取数据失败，请稍后再试',
                icon: 'none',
                duration: 2000
            })
        }
    }, err => {
        wx.showToast({
            title: '获取数据失败，请稍后再试',
            icon: 'none',
            duration: 2000
        })
    }, res => {
    })
}

module.exports = {
    dictItem
}
