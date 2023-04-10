
function request(option){
    if(wx.env.token){
        if(option.header){
        option.header.Authorization = `Bearer ${wx.env.token}`
        }else{
            option.header={'Authorization':  `Bearer ${wx.env.token}`}
        }
    }
    if(option.url.startsWith('/')){
        option.url = `${wx.env.baseUrl}${option.url}`
    }
    wx.request(option);
}

export {
    request
}
