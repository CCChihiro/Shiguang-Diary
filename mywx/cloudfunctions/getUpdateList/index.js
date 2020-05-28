// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

const friend_list = cloud.callFunction({
  name: 'getFriendList',
  data: {
    user_id: event.user_id
  }
})

// 云函数入口函数

exports.main = async (event, context) => {
  return await db.collection('Diaries')
  .aggregate()
  .lookup({
    from: 'friend_list',
    localField: 'user_id',
    foreignField: 'friend_id',
    as: 'UpdateList'
  })
  .orderBy('time', 'desc')
  .get({
    success: function (res) {
      return res
    }
  })
  .then(res => console.log(res))
  .catch(e => console.error(e))
}