Page({

  data: {
    datalist: []
  },

  getProperties: function () {
    let that = this
    var user_id = wx.getStorageSync("user_id")
    console.log(user_id)
    wx.cloud.callFunction({
      name: "getDiarylist",
      data: {
        user_id: user_id
      },
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