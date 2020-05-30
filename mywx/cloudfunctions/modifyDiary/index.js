// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
    await db.collection("Dairies").add({
      data: {
        content: event.content,
        diary_id: my_id,
        id_user: event.user_id
      }
    })
    await db.collection("Properties").add({
      data: {
        id_diary: my_id,
        id_user: event.user_id,
        date_write: event.date,
        emotion: event.emotion,
        is_time: event.is_time,
        permission: event.permission,
        weather: event.weather,
        year: ""
      }
    })
    if(event.is_time){
      await db.collection("Properties").where({
        id_diary: my_id,
        id_user: event.user_id,
      }).update({
        data: {
          year: event.year
        }
    })
  }
}