
const app = getApp()
const db = wx.cloud.database();//初始化数据库

Page({
  data: {
    nowPgae: 1,
    startX: 0,
    slider: false,
    animationData: {},
    showDelete: false,

    title: '', content: '', weather: '', diary_date: '', mood: '', authority: '', times: '', year: '',
    imgbox: [], background: '',diaryid:'', user_id:''


  },
  touchstart(e) {
    this.setData({
      startX: e.changedTouches[0].clientX,
    })
  },
  onLoad: function (options) {
    this.setData({
      content:app.globalData.content,
      diary_date:app.globalData.diary_date,
      weather:app.globalData.weather,
      mood:app.globalData.mood,
      authority:app.globalData.authority,
      times:app.globalData.times,
      year:app.globalData.year,
      imgbox:app.globalData.imgbox,
      background:app.globalData.background, 
      title:app.globalData.title,
      diaryid:app.globalData.diaryid
  })
  },

  /***跳转写日记 */
  towriteDiary() {
    wx.navigateTo({
      url: '../writeDiary/writeDiary',
    })
  },
  /***跳转修改日记 */
  toeditDiary() {
        app.globalData.content= this.data.content  // 获取goodsList[index].num
        app.globalData.diary_date= this.data.diary_date  // 获取goodsList[index].num
        app.globalData.mood= this.data.mood  // 获取goodsList[index].num
        app.globalData.authority= this.data.authority  // 获取goodsList[index].num
        app.globalData.times=this.data.times  // 获取goodsList[index].num
        app.globalData.year = this.data.year  // 获取goodsList[index].num
        app.globalData.imgbox= this.data.imgbox  // 获取goodsList[index].num
        app.globalData.background= this.data.background  // 获取goodsList[index].num
        app.globalData.title= this.data.title  // 获取goodsList[index].num
        app.globalData.weather = this.data.weather  // 获取goodsList[index].num
        app.globalData.diaryid = this.data.diaryid  // 获取goodsList[index].num
    wx.navigateTo({
      url: '../editDiary/editDiary',
    })
  },

  /***删除日记 */
  deleteDiary: function (e) {
    this.setData({
      showDelete: true,
    })
  },
  /**点击返回按钮隐藏 */
  del_back: function () {
    this.setData({
      showDelete: false
    })
  },
  /** 点击确定按钮获取input值并且关闭弹窗 */
  del_ok: function () {
    this.setData({
      showDelete: false,

    })
    let that = this
    db.collection("Users").where({
      openid: getApp().globalData.openid,
    }).get({
      success(res) {
        console.log("请求成功", res)
        that.setData({
          user_id: res.data[0].id
        })
        wx.cloud.callFunction({
          name: "deleteDiary",
          data: {
            user_id: that.data.user_id,
            diary_id: that.data.diaryid
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
            diary_id: that.data.diaryid
          },
          success(res){
            console.log("请求云函数成功", res)
          },
          fail(err){
            console.log("请求云函数失败", err)
          }
        })

      },
      fail(err) {
        console.log("请求失败", err)
      },
    })
  },
})
