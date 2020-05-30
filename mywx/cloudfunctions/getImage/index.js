// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await db.collection("Images").where({
    diary_id: event.diary_id,
    id_user: event.user_id,
  }).get({
    success(res){
      console.log("请求成功", res)
    },
    fail(err){
      console.log("请求失败", err)
    },
  })

}