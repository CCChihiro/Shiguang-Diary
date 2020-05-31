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
    open_id: getApp().globalData.open_id,
    user_id: ''
  },

  onLoad: function (options) {
    var that = this;
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        that.setData({
          [name]: res.userInfo.nickName,
          [avatar]: res.userInfo.avatarUrl,
        })
        console.log(name)
      }
    })
    db.collection("Users").where({
      openid: that.open_id
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
            open_id: that.open_id,
            nickname: that.name,
            portrait: '',
            cover: '',
          }
        })
      }
    })
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
            console.log("xianshitup")
            wx.cloud.callFunction({
              name: "setUserCover",
              data: {
                openid: getApp().globalData.openid,
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
        wx.cloud.callFunction({
          name: "setUserPortrait",
          data: {
            openid: getApp().globalData.openid,
            portrait: portrait
          }
        })
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
      }
    }



  },

})