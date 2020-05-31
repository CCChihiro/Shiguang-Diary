// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection("Dairies").where({
    id_user: event.user_id
  }).get({
    success(res){
      console.log("请求成功", res)
    },
    fail(err){
      console.log("请求失败", err)
    },
  })
}