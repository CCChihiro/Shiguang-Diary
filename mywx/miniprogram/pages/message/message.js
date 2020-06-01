var app = getApp()

Page({
  /* 页面的初始数据 */

  data: {
    newFriend: [{ nickname: '这是备注', name: 'apple', portrait: '来看看吧~', friend_id: '123', cover: '../../images/code-cloud-callback-config.png', new_message: 'true', status: '申请加你为好友',head:'../../images/head2.jpg' },
    { nickname: '这是备注', name: 'apple', portrait: '来看看吧~', friend_id: '', cover: '', new_message: 'true', status: '申请加你为好友',head:'../../images/head1.jpg' }
    ],

    refFriend: [{ nickname: '这是备注', name: 'apple', portrait: '来看看吧~', friend_id: '123',head:'../../images/head3.jpg', cover: '../../images/code-cloud-callback-config.png' },
    { nickname: '这是备注', name: 'apple', portrait: '来看看吧~', friend_id: '', cover: '',head:'../../images/code-cloud-callback-config.png' }
    ],

    //newFriend: [],
    //refFriend: [],
    user_id: '',
    temp_id: '',
    temp_nickname: '',
    showModal: false,
    showFind: false,
    showDelete: false,
  },

  getProperties: function () {
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
          name: "getApplyList",
          data: {
            user_id: that.user_id
          },
          success(res) {
            console.log("请求云函数成功", res)
            that.setData({
              newFriend: res.result.data
            })
          },
          fail(err) {
            console.log("请求云函数失败", err)
          }
        })
        wx.cloud.callFunction({
          name: "getRefuseList",
          data: {
            user_id: that.user_id
          },
          success(res) {
            console.log("请求云函数成功", res)
            that.setData({
              refFriend: res.result.data
            })
          },
          fail(err) {
            console.log("请求云函数失败", err)
          }
        })
      },
      fail(err) {
        console.log("请求失败", err)
      }
    })
  },


  /****修改备注 */
  /** 控制显示 */
  eject: function (e) {
    var index = e.currentTarget.dataset.index
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
  /**获取input输入值*/
  wish_put: function (e) {
    this.setData({
      temp_nickname: e.detail.value,
    })
  },
  /** 点击确定按钮获取input值并且关闭弹窗 */
  oktemp: function () {
    console.log(this.data.temp_nickname)
    var t1 = 'newFriend[' + this.data.temp_id +'].nickname'  // 获取goodsList[index].num
    var t2='newFriend[' + this.data.temp_id +'].new_message'
    var t3='newFriend[' + this.data.temp_id +'].status'
    console.log(t2)
    this.setData({
     showModal:false,
     [t1]:this.data.temp_nickname,
     [t2]:false,
     [t3]:'已同意'
    })
  },
  ok: function () {
    console.log(this.data.temp_nickname)
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
          name: "agreeFriend",
          data: {
            user_id: that.user_id,
            friend_id: that.data.newFriend.friend_id,
            friend_nickname: that.data.temp_nickname
          },
          success(res) {
            console.log("请求云函数成功", res)
          },
          fail(err) {
            console.log("请求云函数失败", err)
          }
        })
        console.log(this.data.temp_nickname)
        var t1 = 'newFriend[' + this.data.temp_id + '].nickname'  // 获取goodsList[index].num
        var t2 = 'newFriend[' + this.data.temp_id + '].new_message'
        var t3 = 'newFriend[' + this.data.temp_id + '].status'
        console.log(t2)
        this.setData({
          showModal: false,
          [t1]: this.data.temp_nickname,
          [t2]: false,
          [t3]: '已同意'
        })
      },
      fail(err) {
        console.log("请求云函数失败", err)
      }
    })
  },


  /** 控制显示 */
  refuseFriend: function (e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      showRefuse: true,
      temp_id: index
    })
  },
  /**点击返回按钮隐藏 */
  ref_back: function () {
    this.setData({
      showRefuse: false
    })
  },
  /** 点击确定按钮获取input值并且关闭弹窗 */
  ref_ok: function () {
    var that = this
    var newFriend = this.data.newFriend;
    newFriend.splice(this.data.temp_id, 1);
    this.setData({
      showRefuse: false,
      newFriend: newFriend,
    })
    db.collection("Users").where({
      openid: getApp().globalData.openid,
    }).get({
      success(res) {
        console.log("请求成功", res)
        that.setData({
          user_id: res.data[0].id
        })
        wx.cloud.callFunction({
          name: "refuseApply",
          data: {
            user_id: that.user_id,
            friend_id: that.data.newFriend.friend_id,
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
        console.log("请求云函数失败", err)
      }
    })
  }


})