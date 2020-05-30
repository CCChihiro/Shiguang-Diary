// miniprogram/pages/timer/timer.js

const app = getApp()
Page({

  /**页面的初始数据 */
  data: {
    times: [
    {   title: '这是时光机1', content: '这是正文1', weather: '雨', diary_date: '2020.5.26', mood: '哭', authority: 'false', times: 'false', year: '5年后',
       imgbox: ['../../images/pic1.jpg', '../../images/pic1.jpg'], background: '',diaryid:''
    },
    {
      title: '这是时光机2', content: '这是正文1', diary_date: '2020.5.27', weather: '晴天', mood: '开心', authority: '', times: '', year: '',
      imgbox: ['../../images/code-cloud-callback-config.png', '../../images/code-cloud-callback-config.png'], background: '',diaryid:''
    },
    { title: '这是时光机3', content: '这是正文1', diary_date: '2020.5.28', weather: '多云', mood: '开心', authority: '', times: '', year: '', imgbox: '', background: '',diaryid:'' },
    { title: '这是时光机4', content: '这是正文1', diary_date: '2020.5.29', weather: '晴', mood: '开心', authority: '', times: '', year: '', imgbox: '', background: '',diaryid:'' },
    { title: '这是时光机5', content: '这是正文1',diary_date: '2020.5.30', weather: '晴', mood: '不开心', authority: '', times: '', year: '', imgbox: '', background: '',diaryid:'' },]
  
    

  },
  totimer_detail(e){
    var index = e.currentTarget.dataset.index
    console.log(index)
    app.globalData.content= this.data.times[index].content  // 获取goodsList[index].num
    app.globalData.diary_date= this.data.times[index].diary_date  // 获取goodsList[index].num
    app.globalData.mood= this.data.times[index].mood  // 获取goodsList[index].num
    app.globalData.authority= this.data.times[index].authority  // 获取goodsList[index].num
    app.globalData.times=this.data.times[index].times  // 获取goodsList[index].num
    app.globalData.year = this.data.times[index].year  // 获取goodsList[index].num
    app.globalData.imgbox= this.data.times[index].imgbox  // 获取goodsList[index].num
    app.globalData.background= this.data.times[index].background
    app.globalData.title= this.data.times[index].title  // 获取goodsList[index].num
    app.globalData.weather = this.data.times[index].weather  // 获取goodsList[index].num
    app.globalData.diaryid = this.data.times[index].diaryid  // 获取goodsList[index].num

    wx.navigateTo({
      url: '../timer-detail/timer-detail',
    })
  },
})