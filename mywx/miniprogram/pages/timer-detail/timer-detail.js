
const app = getApp()

Page({
  data: {
    nowPgae: 1,
    startX: 0,
    slider: false,
    animationData: {},
    showDelete: false,

    title: '这是题目1', content: '这是正文1', weather: '雨', diary_date: '2020.5.26', mood: '哭', authority: 'false', times: 'false', year: '5年后',
    image: ['../../images/pic1.jpg', '../../images/pic1.jpg'], background: ''


  },
  touchstart(e) {
    this.setData({
      startX: e.changedTouches[0].clientX,
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
  },
})
