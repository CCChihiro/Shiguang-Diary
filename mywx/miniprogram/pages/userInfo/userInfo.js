// miniprogram/pages/userInfo/userInfo.js
let photoUrl = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '昵称',
    portrait: '简介',
    cover: '../../images/cover.jpg',
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
    if (name.length == 0 && portrait.length== 0) {
      this.setData({
        showModal: false
      })
    }
    else{
    if (portrait.length != 0) {
      this.setData({
        portrait,
        showModal: false
      })
    }
    if (name.length != 0 ) {
      this.setData({
        name,
        showModal: false
      })
    }}



  },

})