// miniprogram/pages/timer/timer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    times: [
      {title: '这是题目1',  diary_date: '2020.5.26',weather: '雨', mood: '哭', },
      { title: '这是题目2',   diary_date: '2020.5.27', weather: '晴', mood: '',},
      { title: '这是题目3',   diary_date: '2020.5.28', weather: '多云', mood: '', },
      { title: '这是题目4',  diary_date: '2020.5.29', weather: '大雨', mood: '',},
      { title: '这是题目5',   diary_date: '2020.5.30', weather: '雪', mood: '', },
    ]
    

  },
  totimer_detail(e){
    var index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../timer-detail/timer-detail',
    })
  },
})