// miniprogram/pages/timer/timer.js

const app = getApp()
const db = wx.cloud.database();//初始化数据库
Page({

  /**页面的初始数据 */
  data: {
    length: 0,
    times: [],
    times2: [],
    user_id: '',
    diaryid: '1590399306189-649',
  },
  onLoad: function (options) {
    let today = new Date()
    let str_today = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    var cardList = []
    let that = this
    db.collection("Users").where({
      openid: getApp().globalData.openid,
    }).get({
      success(res) {
        console.log("请求成功", res)
        that.setData({
          user_id: res.data[0].user_id
        })
        console.log(that.data.user_id)
        wx.cloud.callFunction({
          name: "getDiarylist",
          data: {
            user_id: that.data.user_id,
          },
          success(res) {
            console.log("请求云函数成功", res)
            that.setData({
              length: res.result.data.length,
              times: cardList.concat(res.result.data)
            })
            var i = 0
            let a = async function (i, original_data, that) {

              return await wx.cloud.callFunction({
                name: "getDiary",
                data: {
                  user_id: that.data.user_id,
                  diary_id: that.data.times[i].diary_id
                },
                success(res) {
                  console.log("请求云函数成功", res)
                  let my_list = that.data.times2
                  if (res.result.data[0].is_time && (new Date(str_today) >= new Date(res.result.data[0].year))) {
                    var dict = {}
                    dict['diary_id'] = original_data.diary_id
                    dict['content'] = original_data.content
                    dict['id_user'] = original_data.id_user
                    dict['diary_date'] = res.result.data[0].date_write
                    dict['mood'] = res.result.data[0].emotion
                    dict['authority'] = res.result.data[0].permission
                    dict['times'] = res.result.data[0].is_time
                    dict['year'] = res.result.data[0].year
                    dict['title'] = res.result.data[0].title
                    dict['weather'] = res.result.data[0].weather
                    dict['img_url'] = res.result.data[0].img_url
                    my_list.push(dict)
                  }

                  that.setData({
                    times2: my_list
                  })
                },
                fail(err) {
                  console.log("请求云函数失败", err)
                }
              })

            }
            for (i = 0; i < that.data.length; i++) {
              a(i, that.data.times[i], that)
            }
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
  },
  totimer_detail(e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    app.globalData.content = this.data.times2[index].content  // 获取goodsList[index].num
    app.globalData.diary_date = this.data.times2[index].diary_date  // 获取goodsList[index].num
    app.globalData.mood = this.data.times2[index].mood  // 获取goodsList[index].num
    app.globalData.authority = this.data.times2[index].authority  // 获取goodsList[index].num
    app.globalData.times = this.data.times2[index].times  // 获取goodsList[index].num
    app.globalData.year = this.data.times2[index].year  // 获取goodsList[index].num
    app.globalData.imgbox = this.data.times2[index].imgbox  // 获取goodsList[index].num
    app.globalData.background = this.data.times2[index].background
    app.globalData.title = this.data.times2[index].title  // 获取goodsList[index].num
    app.globalData.weather = this.data.times2[index].weather  // 获取goodsList[index].num
    app.globalData.diaryid = this.data.times2[index].diaryid  // 获取goodsList[index].num

    wx.navigateTo({
      url: '../timer-detail/timer-detail',
    })
  },
})