// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await db.collection('ApplyList')
      .add({
        data: {
          from_id: event.from_id,
          to_id: to_id,
          time: Date.now
        }
      })
  } catch (e) {
    console.error(e)
  }
}