var app = getApp()

Page({
  /* 页面的初始数据 */
  data: {
    newFriend:[{nickname:'这是备注',name:'apple',portrait:'来看看吧~',friend_id:'123',cover:'../../images/code-cloud-callback-config.png',new_message:'true',status:'申请加你为好友'},
    {nickname:'这是备注',name:'apple',portrait:'来看看吧~',friend_id:'' ,cover:'',new_message:'true',status:'申请加你为好友'}
  ],

  refFriend:[{nickname:'这是备注',name:'apple',portrait:'来看看吧~',friend_id:'123',cover:'../../images/code-cloud-callback-config.png'},
  {nickname:'这是备注',name:'apple',portrait:'来看看吧~',friend_id:'' ,cover:''}
],
  temp_id:'',
  temp_nickname:'',
  showModal: false,
showFind:false,
showDelete:false,
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
   var t1 = 'newFriend[' + this.data.temp_id +'].nickname'  // 获取goodsList[index].num
   var t2='newFriend[' + this.data.temp_id +'].new_message'
   var t3='newFriend[' + this.data.temp_id +'].status'
   console.log(t2)
   this.setData({
    showModal:false,
    [t1]:this.data.temp_nickname,
    [t2]:false,
    [t3]:'已同意'
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
     var newFriend=this.data.newFriend;
     newFriend.splice(this.data.temp_id,1);
     this.setData({
      showDelete:false,
      newFriend:newFriend,
     })
    },


 })