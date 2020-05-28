// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
const apply_list = db.collection("ApplyList")

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // delete applylist, add friends
  var my_id = event.user_id
  var friend_id = event.friend_id
  var friend_nickname = event.friend_nickname
  try {
    apply_list.where({
      from_id: friend_id,
      to_id: my_id
    }).remove()
    return await db.collection("Friends").add({
      data: {
        my_id: my_id,
        friend_id: friend_id
      }
    })
  } catch (e) {
    console.error(e)
  }
}