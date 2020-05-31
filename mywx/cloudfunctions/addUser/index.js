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
  return await db.collection('Users').add({
    data: {
      user_id: event.user_id,
      openid: event.openid,
      nickname: event.nickname,
      portrait: event.portrait,
      cover: event.cover
    }
  })
}