const app = getApp()
const db = wx.cloud.database();//初始化数据库
Page({
  /**
   * 页面的初始数据
   */
  data:{
    picker1Value:0,

  fileIDs: [],//上传云存储后的返回值
  isChecked1: false,
    timerBool: false,
    details:'',
   content:'这是原来的正文1',diary_date:'原日期',weather:'原天气',mood:'原心情',authority:'true',
    times:'true',year:'2015.5.10',imgbox:['../../images/cover.jpg'],background:'', title:'原题目',

  },
  onLoad: function (options) {
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
      })
      },
  datePickerBindchange:function(e){
    this.setData({
      diary_date:e.detail.value
    })
  },
  timerPickerBindchange:function(e){
    this.setData({
      year:e.detail.value
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
   // 选择图片 &&&
   addPic1: function (e) {
    var imgbox = this.data.imgbox;
    console.log(imgbox)
    var that = this;
    var n = 5;
    if (5 > imgbox.length > 0) {
     n = 5 - imgbox.length;
    } else if (imgbox.length == 5) {
     n = 1;
    }
    wx.chooseImage({
     count: n, // 默认9，设置图片张数
     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
     success: function (res) {
      // console.log(res.tempFilePaths)
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths
      if (imgbox.length == 0) {
       imgbox = tempFilePaths
      } else if (5 > imgbox.length) {
       imgbox = imgbox.concat(tempFilePaths);
      }
      that.setData({
       imgbox: imgbox
      });
     }
    })
   },
   
   //图片
   imgbox: function (e) {
    this.setData({
      imgbox: e.detail.value
    })
   },

   //发布按钮
   fb: function (e) {
    if (!this.data.imgbox.length) {

    } else {
      //上传图片到云存储
      wx.showLoading({
       title: '上传中',
      })
      let promiseArr = [];
      for (let i = 0; i < this.data.imgbox.length; i++) {
       promiseArr.push(new Promise((reslove, reject) => {
        let item = this.data.imgbox[i];
        let suffix = /\.\w+$/.exec(item)[0];//正则表达式返回文件的扩展名
        wx.cloud.uploadFile({
         cloudPath: new Date().getTime() + suffix, // 上传至云端的路径
         filePath: item, // 小程序临时文件路径
         success: res => {
          this.setData({
           fileIDs: this.data.fileIDs.concat(res.fileID)
          });
          console.log(res.fileID)//输出上传后图片的返回地址
          reslove();
          wx.hideLoading();
          wx.showToast({
           title: "上传成功",
          })
         },
         fail: res=>{
          wx.hideLoading();
          wx.showToast({
           title: "上传失败",
          })
         }
   
        })
       }));
      }
      Promise.all(promiseArr).then(res => {//等数组都做完后做then方法
       console.log("图片上传完成后再执行")
       this.setData({
        imgbox:[]
       })
      })
     }
   },
   //提交表单
   formSubmit: function (e) {  
    console.log('form发生了submit事件，携带数据为：', e.detail.value);  
    let { content,diary_date,weather,mood,authority,times,year,imgbox,background,title,details } = e.detail.value;  
    this.setData({  
      title,content,diary_date,weather,mood,authority,times,year,imgbox,background, details
    })  
    },  

   //公开/隐私权限
   switch1Change: function (e){
    console.log(e.detail.value)
            var changedData = {};
            changedData['isChecked1'] = !this.data['isChecked1'];
            this.setData(changedData);
        

  },
  //时光机
  switch2Change: function (e){
      console.log('switch2 发生 change 事件，携带值为', e.detail.value)
    },


})