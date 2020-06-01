const app = getApp()

const db = wx.cloud.database();//初始化数据库

Page({

  /**

   * 页面的初始数据

   */

  data: {

    picker1Value: 0,



    fileIDs: [],//上传云存储后的返回值

    isChecked1: false,

    timerBool: false,

    details: '',

    user_id: '',

    img_url: '',

    content: '这是原来的正文1', diary_date: '原日期', weather: '原天气', mood: '原心情', authority: 'true',

    times: 'true', year: '2015.5.10', imgbox: ['../../images/cover.jpg'], background: '', title: '原题目', diaryid: ''



  },

  onLoad: function (options) {

    this.setData({

      content: app.globalData.content,

      diary_date: app.globalData.diary_date,

      weather: app.globalData.weather,

      mood: app.globalData.mood,

      authority: app.globalData.authority,

      times: app.globalData.times,

      year: app.globalData.year,

      imgbox: app.globalData.imgbox,

      background: app.globalData.background,

      title: app.globalData.title,

      diaryid: app.globalData.diaryid,

      img_url: app.globalData.img_url,

    })

  },

  datePickerBindchange: function (e) {

    this.setData({

      diary_date: e.detail.value

    })

  },

  timerPickerBindchange: function (e) {

    this.setData({

      year: e.detail.value

    })

  },

  imgDelete1: function (e) {

    let that = this;

    let index = e.currentTarget.dataset.deindex;

    let imgbox = this.data.imgbox;

    imgbox.splice(index, 1)

    that.setData({

      imgbox: imgbox

    });

  },

  addPic1: function (e) {

    //选择图片

    let that = this;

    wx.chooseImage({

      count: 1,

      sizeType: ['compressed'],

      sourceType: ['album', 'camera'],

      success: function (res) {



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

    console.log('form发生了submit事件，携带数据为：', e.detail.value);

    let { content, diary_date, weather, mood, authority, times, year, imgbox, background, title, details } = e.detail.value;

    this.setData({

      title, content, diary_date, weather, mood, authority, times, year, imgbox, background, details

    })

    let that = this

    app.globalData.img_url = that.data.img_url

    app.globalData.content = that.data.content  // 获取goodsList[index].num

    app.globalData.diary_date = that.data.diary_date  // 获取goodsList[index].num

    app.globalData.mood = that.data.mood  // 获取goodsList[index].num

    app.globalData.authority = that.data.authority  // 获取goodsList[index].num

    app.globalData.times = that.data.times  // 获取goodsList[index].num

    app.globalData.year = that.data.year  // 获取goodsList[index].num

    app.globalData.imgbox = that.data.imgbox  // 获取goodsList[index].num

    app.globalData.background = that.data.background  // 获取goodsList[index].num

    app.globalData.title = that.data.title  // 获取goodsList[index].num

    app.globalData.weather = that.data.weather  // 获取goodsList[index].num

    app.globalData.diaryid = that.data.diaryid

    db.collection("Users").where({

      openid: getApp().globalData.openid,

    }).get({

      success(res) {

        console.log("请求成功", res)

        that.setData({

          user_id: res.data[0].user_id

        })

        wx.cloud.callFunction({

          name: "deleteDiary",

          data: {

            user_id: that.data.user_id,

            diary_id: that.data.diaryid

          },

          success(res) {

            console.log("请求云函数成功", res)

          },

          fail(err) {

            console.log("请求云函数失败", err)

          }

        })

        wx.cloud.callFunction({

          name: "deleteProperty",

          data: {

            user_id: that.data.user_id,

            diary_id: that.data.diaryid

          },

          success(res) {

            console.log("请求云函数成功", res)

          },

          fail(err) {

            console.log("请求云函数失败", err)

          }

        })

        wx.cloud.callFunction({

          name: "addDiary",

          data: {

            diary_id: that.data.diaryid,

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

            console.log("请求云函数成功", res)

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