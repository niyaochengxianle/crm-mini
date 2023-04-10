var CryptoJS = require('../miniprogram_npm/crypto-js/index')

function enc(data) {
    const key = 'thanks,krtech!!!'
    const iv = CryptoJS.enc.Latin1.parse(key)
// 加密
    var encrypted = CryptoJS.AES.encrypt(
        data,
        iv, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        })
    return encrypted.toString()
}

export {
    enc
}
