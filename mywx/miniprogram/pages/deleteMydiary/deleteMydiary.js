// miniprogram/pages/deleteMydiary/deleteMydiary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: 'zyx',
    diary_id: '1590399306189-649'
  },

  deleteMydiary: function () {
    let that = this
    wx.cloud.callFunction({
      name: "deleteDiary",
      data: {
        user_id: that.data.user_id,
        diary_id: that.data.diary_id
      },
      success(res){
        console.log("请求云函数成功", res)
      },
      fail(err){
        console.log("请求云函数失败", err)
      }
    })
    wx.cloud.callFunction({
      name: "deleteProperty",
      data: {
        user_id: that.data.user_id,
        diary_id: that.data.diary_id
      },
      success(res){
        console.log("请求云函数成功", res)
      },
      fail(err){
        console.log("请求云函数失败", err)
      }
    })
  }
})