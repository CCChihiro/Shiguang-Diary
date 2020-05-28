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
  // delete applylist, add refuselist
  var my_id = event.user_id
  var friend_id = event.friend_id
  try {
    db.collection("ApplyList").where({
      from_id: friend_id,
      to_id: my_id
    }).remove()
  } catch (e) {
    console.error(e)
  }
  try {
    return await db.collection("RefuseList").add({
      data: {
        from_id: my_id,
        to_id: friend_id
      }
    })
  } catch (e) {
    console.error(e)
  }
}