Page({

  data: {
    datalist: []
  },

  getProperties: function () {
    let that = this
    wx.cloud.callFunction({
      name: "getDiarylist",
      success(res){
        console.log("请求云函数成功", res)
        that.setData({
          datalist: res.result.data
        })
      },
      fail(err){
        console.log("请求云函数失败", err)
      }
    })
  }

  
})