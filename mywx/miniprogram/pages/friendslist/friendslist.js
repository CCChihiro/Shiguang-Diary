var app = getApp()

Page({
  /* 页面的初始数据 */
  data: {
    array:[{nickname:'这是备注',name:'apple',portrait:'来看看吧~',friend_id:'123',cover:'../../images/code-cloud-callback-config.png'},
    {nickname:'这是备注',name:'apple',portrait:'来看看吧~',friend_id:'' ,cover:''}
  ],
  temp_id:'',
  temp_nickname:'',
  showModal: false,
showFind:false,
showDelete:false,
new_friendid:''
},
/***跳转好友日记 */
tofriendDiary(e){
    /****获取点击的好友id赋给全局变量friend_id */
  var index = e.currentTarget.dataset.index
  app.globalData.friend_diary=this.data.array[index].friend_id
   console.log(app.globalData.friend_diary)
  wx.navigateTo({
    url: "../friendDiary/friendDiary"
  })
},

/****修改备注 */
  /** 控制显示 */
  eject:function(e){
    var index = e.currentTarget.dataset.index
    this.setData({
      showModal:true,
      temp_id:index
     })
    },
  /**点击返回按钮隐藏 */
  back:function(){
   this.setData({
    showModal:false
   })
  },
  /**获取input输入值*/
  wish_put:function(e){
    this.setData({
      temp_nickname:e.detail.value,
    })
  },
  /** 点击确定按钮获取input值并且关闭弹窗 */
  ok:function(){
   console.log(this.data.temp_nickname)
   var temp = 'array[' + this.data.temp_id +'].nickname'  // 获取goodsList[index].num
   console.log(temp)
   this.setData({
    showModal:false,
    [temp]:this.data.temp_nickname
   })
  },

/**添加好友 */
newFriend:function(e){
  wx.navigateTo({
    url: '../message/message',
  })
  },


/****查找好友 */
  findFriend:function(e){
    this.setData({
      showFind:true,
     })
    },
  /**点击返回按钮隐藏  */
  new_back:function(){
   this.setData({
    showFind:false
   })
  },
  /** 获取input输入值 */
  new_wish_put:function(e){
    this.setData({
      new_friendid:e.detail.value,
    })
  },
  /**点击确定按钮获取input值并且关闭弹窗*/
  new_ok:function(){
   this.setData({
    showFind:false,
   })
  },



    /** 控制显示 */
    deleteFriend:function(e){
      var index = e.currentTarget.dataset.index
      this.setData({
        showDelete:true,
        temp_id:index
       })
      },
    /**点击返回按钮隐藏 */
    del_back:function(){
     this.setData({
      showDelete:false
     })
    },
    /** 点击确定按钮获取input值并且关闭弹窗 */
    del_ok:function(){

     var array=this.data.array;
     array.splice(this.data.temp_id,1);
     this.setData({
      showDelete:false,
      array:array,
      
     })
    },


 })