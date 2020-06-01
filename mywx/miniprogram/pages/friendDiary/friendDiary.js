const app = getApp()
Page({
    data: {
        nowPgae: 1,
        startX: 0,
        slider: false,
        animationData: {},
        showDelete: false,
        cardInfoList: [
            { title: '-1', id: '-1', cover: '../../images/cover.jpg' },/*封面占位：不能删*/
            {
                title: '这是题目1', content: '这是正文1', weather: '雨', dairy_date: '2020.5.26', mood: '哭', authority: 'false', times: 'false', year: '5年后',
                image: ['../../images/pic1.jpg', '../../images/pic1.jpg'], background: ''
            },
            {
                title: '这是题目2', content: '这是正文1', dairy_date: '2020.5.27', weather: '', mood: '', authority: '', times: '', year: '',
                image: ['../../images/code-cloud-callback-config.png', '../../images/code-cloud-callback-config.png'], background: ''
            },
            { title: '这是题目3', content: '这是正文1', dairy_date: '2020.5.28', weather: '', mood: '', authority: '', times: '', year: '', image: '', background: '' },
            { title: '这是题目4', content: '这是正文1', dairy_date: '2020.5.29', weather: '', mood: '', authority: '', times: '', year: '', image: '', background: '' },
            { title: '这是题目5', content: '这是正文1', dairy_date: '2020.5.30', weather: '', mood: '', authority: '', times: '', year: '', image: '', background: '' },],
        friend_id: '',
        datalist: [],
    },
    touchstart(e) {
        this.setData({
            startX: e.changedTouches[0].clientX,
        })
    },
    touchend(e) {
        let that = this;
        let startX = this.data.startX;
        let startY = this.data.startY;
        let endX = e.changedTouches[0].clientX;
        if (this.data.slider) return;

        // 下一页(左滑距离大于30)
        if (startX - endX > 30) {
            this.setData({
                slider: true
            });
            //尾页(当前页 等于 总页数)
            if (this.data.nowPgae == this.data.cardInfoList.length) {
                this.setData({
                    slider: false
                });
                wx.showToast({ title: '已经是最后一张了', icon: 'none' });
                return;
            };

            //创建动画   5s将位置移动到-150%,-150%
            let animation = wx.createAnimation({
                duration: 500,
            });
            animation.translateX('-150%').translateY('-150%').rotate(60).step();
            this.setData({
                animationData: animation.export()
            });

            // 移动完成后
            setTimeout(function () {
                var cardInfoList = that.data.cardInfoList;
                var slidethis = that.data.cardInfoList.shift(); //删除数组第一项
                that.data.cardInfoList.push(slidethis); //将第一项放到末尾
                //创建动画   将位置归位
                let animation = wx.createAnimation({
                    duration: 0,
                });
                animation.translateX('-53%').translateY('-50%').rotate(0).step();

                that.setData({
                    cardInfoList: that.data.cardInfoList,
                    animationData: animation.export(),
                    slider: false,
                    nowPgae: that.data.nowPgae + 1
                });
            }, 500)
        }
        // 上一页
        if (endX - startX > 30) {
            this.setData({
                slider: true
            })
            //首页
            if (this.data.nowPgae == 1) {
                this.setData({
                    slider: false
                })
                wx.showToast({ title: '已经到第一张了', icon: 'none' })
                return;
            };
            //创建动画  移动到-150%,-150%
            let animation = wx.createAnimation({
                duration: 0,
            });
            animation.translateX('-150%').translateY('-150%').rotate(100).step();
            var cardInfoList = that.data.cardInfoList;
            var slidethis = that.data.cardInfoList.pop(); //删除数组末尾项
            that.data.cardInfoList.unshift(slidethis);//将删除的末尾项放到第一项
            that.setData({
                animationData: animation.export(),
                cardInfoList: that.data.cardInfoList,
            });
            setTimeout(function () {
                //创建动画   5s将位置移动到原位
                let animation2 = wx.createAnimation({
                    duration: 500,
                    // timingFunction: 'cubic-bezier(.8,.1,.2,0.8)',
                });
                animation2.translateX('-53%').translateY('-50%').rotate(0).step();
                that.setData({
                    animationData: animation2.export()
                });
                that.setData({
                    slider: false,
                    nowPgae: that.data.nowPgae - 1
                });
            }, 50)
        }
    },

    onLoad: function () {
        this.setData({
            friend_id: app.globalData.friend_diary,
        });
        console.log(this.data.friend_id);
        var that = this
        wx.cloud.callFunction({
            name: "getFriendDiaryList",
            data: {
                friend_id: that.friend_id
            },
            success(res) {
                console.log("请求云函数成功", res)
                that.setData({
                    datalist: res.result.data
                })
            },
            fail(err) {
                console.log("请求云函数失败", err)
            }
        })

    },
    /***跳转写日记 */
    towriteDiary() {
        wx.navigateTo({
            url: '../writeDiary/writeDiary',
        })
    },
    Diary() {
        wx.navigateTo({
            url: '../writeDiary/writeDiary',
        })
    },

    /***删除日记 */
    deleteDiary: function (e) {
        let index = e.currentTarget.dataset.index
        this.setData({
            showDelete: true,
            temp_id: index
        })
    },
    /**点击返回按钮隐藏 */
    del_back: function () {
        this.setData({
            showDelete: false
        })
    },
    /** 点击确定按钮获取input值并且关闭弹窗 */
    del_ok: function () {
        var cardInfoList = this.data.cardInfoList;
        cardInfoList.splice(this.data.temp_id, 1);
        this.setData({
            showDelete: false,
            cardInfoList: cardInfoList,

        })
    },
})
