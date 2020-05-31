// miniprogram/pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  tofriendslist(){
    wx.navigateTo({
      url: '../friendslist/friendslist',
    })
  },
  tous(){
    wx.navigateTo({
      url: '../callme/callme',
    })
  },
  touserInfo(){
    wx.navigateTo({
      url: '../userInfo/userInfo',
    })
  },
  todiary(){
    wx.navigateTo({
      url: '../diary/diary',
    })
  },
  totimer(){
    wx.navigateTo({
      url: '../timer/timer',
    })
  },
  
})