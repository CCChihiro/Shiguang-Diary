// miniprogram/pages/writeDiary/writeDiary.js
const app = getApp()
const db = wx.cloud.database();//初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: '',
    picker1Value: 0,
    dateValue: '今天是...',
    timerValue: '　请预约日期...',
    img_url: '',
    fileIDs: [],//上传云存储后的返回值
    isChecked1: false,
    timerBool: false,
    content: '这是正文1', diary_date: 1002, weather: '', mood: '', authority: '',
    times: '', year: '', img_url: [], title: '', diary_id: ''
  },

  datePickerBindchange: function (e) {
    this.setData({
      dateValue: e.detail.value
    })
  },
  timerPickerBindchange: function (e) {
    this.setData({
      timerValue: e.detail.value
    })
  },
  imgDelete1: function (e) {
    this.setData({
     img_url: ''
    });
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  
  // 选择图片 &&&
  addPic1: function (e) {
    var img_url = this.data.img_url;
    console.log(img_url)
    var that = this;

    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        if (img_url.length == 0) {
          img_url = tempFilePaths
        } else if (5 > img_url.length) {
          img_url = img_url.concat(tempFilePaths);
        }
        that.setData({
          img_url: img_url
        });
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
        // 上传图片
        const cloudPath = "img/" + new Date().getTime() + "-" + Math.floor(Math.random() * 1000)
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            that.setData({
              img_url: res.fileID
            })
            console.log('[上传文件] 成功：', res)
          },
          fail: e => {

            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },


  //提交表单
  formSubmit: function (e) {
    let that = this
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let { content, diary_date, weather, mood, authority, times, year, img_url, background, title, details } = e.detail.value;
    that.setData({
      title, content, diary_date, weather, mood, authority, times, year, img_url, background, details
    })
    var id = new Date().getTime() + "-" + Math.floor(Math.random() * 1000)
    var my_id = id
    app.globalData.img_url = that.data.img_url
    app.globalData.content = that.data.content  // 获取goodsList[index].num
    app.globalData.diary_date = that.data.diary_date  // 获取goodsList[index].num
    app.globalData.mood = that.data.mood  // 获取goodsList[index].num
    app.globalData.authority = that.data.authority  // 获取goodsList[index].num
    app.globalData.times = that.data.times  // 获取goodsList[index].num
    app.globalData.year = that.data.year  // 获取goodsList[index].num
    app.globalData.background = that.data.background  // 获取goodsList[index].num
    app.globalData.title = that.data.title  // 获取goodsList[index].num
    app.globalData.weather = that.data.weather  // 获取goodsList[index].num
    app.globalData.diaryid = my_id
    db.collection("Users").where({
      openid: getApp().globalData.openid,
    }).get({
      success(res) {
        console.log("请求成功", res)
        that.setData({
          user_id: res.data[0].user_id
        })
        wx.cloud.callFunction({
          name: "addDiary",
          data: {
            diary_id: my_id,
            content: that.data.content,
            user_id: that.data.user_id,
            date: that.data.diary_date,
            emotion: that.data.mood,
            is_time: that.data.times,
            permission: that.data.authority,
            weather: that.data.weather,
            year: that.data.year,
            title: that.data.title,
            img_url: that.data.img_url
          },
          success(res) {
            console.log("请求云函数addDiary成功", res)
          },
          fail(err) {
            console.log("请求云函数失败", err)
          }
        })
      },
      fail(err) {
        console.log("请求失败", err)
      },
    })
    wx.navigateTo({
      url: '../timer-detail/timer-detail',
    })
  },
  //公开/隐私权限
  switch1Change: function (e) {
    console.log(e.detail.value)
    var changedData = {};
    changedData['isChecked1'] = !this.data['isChecked1'];
    this.setData(changedData);
  },

  //时光机
  switch2Change: function (e) {
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
  },
})