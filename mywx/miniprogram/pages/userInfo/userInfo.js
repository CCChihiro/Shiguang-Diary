// miniprogram/pages/userInfo/userInfo.js
var app = getApp()
let photoUrl = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '昵称',
    avatar: '',
    portrait: '简介',
    cover: '../../images/cover.jpg',
    openid: '',
    user_id: '',
    login: false,
    uploaded: false
  },


  onGetUserInfo: function (e) {
    var that = this
    console.log(e)
    var d = e.detail.userInfo
    that.setData({
      avatar: d.avatarUrl,
      name: d.nickName,
      isHide: true,
      login: true
    })

    wx.setStorageSync("name", d.nickName)
    wx.setStorageSync("avatar", d.avatarUrl)
    var db = wx.cloud.database()
    // todo: add user & set user
    that.openid = getApp().globalData.openid
    db.collection("Users").where({
      openid: that.openid
    }).get({
      success(res) {
        console.log(res.data)
        if (res.data && res.data.length > 0) {
          console.log("Old User", res.data[0].user_id)
          wx.setStorageSync("user_id", res.data[0].user_id)
          wx.setStorageSync("openid", res.data[0].openid)
        } else {
          console.log("Nes User")
          var avatar = d.avatarUrl,
            name = d.nickName,
            user_id;
          if (!user_id) {
            that.user_id = that.getUserId()
          }
          wx.cloud.callFunction({
            name: 'addUser',
            data: {
              user_id: user_id,
              openid: that.openid,
              nickname: that.name,
            },
            success: function success(res) {
              wx.showToast({
                title: "注册成功"
              })
              console.log("Cloud add user", res, res.result.openid)
              console.log("Add user success.")
              db.collection("Users").where({
                user_id: user_id
              }).get({
                success: function success(res) {
                  wx.setStorageSync("openid", res.data[0].openid)
                },
                fail: function (err) {
                  console.log("OpenId 缓存失败")
                }
              })
            }
          })
        }
      }
    })
    this.onLoad();
  },

  getUserId: function getUserId() {
    var user_id = Date.now() + (Math.random() * 1e5).toFixed(0);
    console.log("user id", user_id)
    wx.setStorageSync("user_id", user_id)
    return user_id
  },
  getOpenid: function getOpenid() {
    var that = this
    wx.cloud.callFunction({
      name: "getOpenid",
      complete: function complete(res) {
        console.log("cloud get open id", res.result.openid)
        that.setData({
          openid: res.result.openid
        })
      }
    })
  },
  onLoad: function (options) {
    var that = this;
    that.getOpenid()
    var openid = this.data.openid,
      user_id = wx.getStorageSync("user_id"),
      avatar = wx.getStorageSync("avatar"),
      name = wx.getStorageSync("name"),
      portrait = wx.getStorageSync("portrait"),
      cover = wx.getStorageSync("cover");
    if (user_id) {
      this.setData({
        isHide: true,
        user_id: user_id,
        avatar: avatar,
        name: name,
        portrait: portrait,
      })
    }
    if (cover) {
      this.setData({
        cover: cover
      })
    }
    /**
     * 获取用户信息
     */
    /*
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        that.setData({
          [name]: res.userInfo.nickName,
          [avatar]: res.userInfo.avatarUrl,
        })
        // console.log(this.name)
      }
    })
    var db = wx.cloud.database()
    db.collection("Users").where({
      openid: that.openid
    }).get({
      success(res) {
        // 已用过本小程序
        console.log("请求成功", res)
        that.setData({
          user_id: res.data[0].id,
          portrait: res.data[0].portrait,
          cover: res.data[0].cover
        })
      },
      fail(err) {
        // 添加用户到Users表
        console.log("请求失败", err)
        wx.cloud.callFunction({
          name: "addUser",
          data: {
            user_id: new Date().getTime(),
            openid: that.openid,
            nickname: that.name,
            portrait: '',
          }
        })
      }
    })
    */
  },

  uploadPhoto() {
    // 1.选择图片
    wx.chooseImage({

      success: chooseResult => {

        // 将图片上传至云存储空间
        console.log("选取图片已完成")
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: new Date().getTime() + '.png',
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          // 成功回调
          success: res => {
            console.log("上传中······")
            console.log('上传成功，fileID为：', res.fileID)
            photoUrl = res.fileID
            //2.显示图片
            this.setData({
              cover: photoUrl
            })
            wx.setStorageSync("cover", photoUrl)
            console.log("Show pic")
            wx.cloud.callFunction({
              name: "setUserCover",
              data: {
                openid: that.openid,
                cover: that.photoUrl
              }
            })

          },
        })
      },
    })
  },
  /** 控制显示 */
  eject: function (e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      showModal: true,
      temp_id: index
    })
  },
  /**点击返回按钮隐藏 */
  back: function () {
    this.setData({
      showModal: false
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let { name, portrait } = e.detail.value;
    if (name.length == 0 && portrait.length == 0) {
      this.setData({
        showModal: false
      })
    }
    else {
      if (portrait.length != 0) {
        this.setData({
          portrait,
          showModal: false
        })
        console.log("pp")
        wx.cloud.callFunction({
          name: "setUserPortrait",
          data: {
            openid: getApp().globalData.openid,
            portrait: portrait
          }
        })
        wx.setStorageSync("portrait", portrait)
        console.log("ppok")
      }
      if (name.length != 0) {
        this.setData({
          name,
          showModal: false
        })
        wx.cloud.callFunction({
          name: "setUserNickname",
          data: {
            openid: getApp().globalData.openid,
            nickname: name
          }
        })
        wx.setStorageSync("name", name)
      }
    }



  },

})