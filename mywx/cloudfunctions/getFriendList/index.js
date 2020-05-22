// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数

exports.main = async (event, context) => {
  try {
    return await db.collection('Friends')
      .where({
        my_id: event.user_id
      })
      .orderBy('remark', 'desc')
      .get({
        success: function (res) {
          return res
        }
      })
  } catch (e) {
    console.error(e)
  }
}