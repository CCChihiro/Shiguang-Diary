// miniprogram/pages/modifyMydiary/modifyMydiary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    date: '',
    emotion: '',
    is_time: true,
    permission: true,
    weather: '',
    background: '',
    year: 5,
    is_image: true,
    image_path: [],
    user_id: 'zyx',
    diary_id: '1590399306189-649'
  },

  bindKeyInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  modifyMydiary: function () {
    let that = this
    wx.cloud.callFunction({
      name: "getDiary",
      data: {
        user_id: that.data.user_id,
        diary_id: that.data.diary_id
      },
      success(res){
        console.log("请求云函数成功", res)
        that.setData({
          content: res.result.data[0].content
        })
      },
      fail(err){
        console.log("请求云函数失败", err)
      }
    })
    wx.cloud.callFunction({
      name: "getProperty",
      data: {
        user_id: that.data.user_id,
        diary_id: that.data.diary_id
      },
      success(res){
        console.log("请求云函数成功", res)
        that.setData({
          weather: res.result.data[0].weather,
          date: res.result.data[0].date_write,
          emotion: res.result.data[0].emotion,
          is_time: res.result.data[0].is_time,
          permission: res.result.data[0].permission,
          background: res.result.data[0].background,
          year: res.result.data[0].year,
          is_image: res.result.data[0].is_image,
        })
      },
      fail(err){
        console.log("请求云函数失败", err)
      }
    })
    if(that.data.is_image){
      wx.cloud.callFunction({
        name: "getImage",
        data: {
          user_id: that.data.user_id,
          id_diary: that.data.diary_id
        },
        success(res){
          console.log("请求云函数成功", res)
          that.setData({
            image_path: res.result.data[0].image_path
          })
        },
        fail(err){
          console.log("请求云函数失败", err)
        }
      })
    }
    wx.cloud.callFunction({
      name: "modifyDiary",
      data: {
        user_id: that.data.user_id,
        diary_id: that.data.diary_id
      },
      data: {
        content: that.data.content,
        user_id: that.data.user_id,
        date: that.data.date,
        emotion: that.data.emotion,
        is_time: that.data.is_time,
        permission: that.data.permission,
        weather: that.data.weather,
        background: that.data.background,
        year: that.data.year,
        is_image: that.data.is_image,
        image_path: that.data.image_path,
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