// pages/CadresDemocraticEvaluationForm/CadresDemocraticEvaluationForm.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    questionId: null,
    accountId: null,
    optionIds: null,
    themeName: '',
    questionArray: null,
    optionId: null,
    remark: '',
    focus: false,
    flag: false,
    hiddenBeforeStep: false,
    hiddenNextStep: false,
    hiddenComplete: false,
    totalpage: null,
    pageno: 1,
    radioList: [],
    infoLIst: [{
      name: "唐三",
      birthDay: "1999.2.19",
      BeforeDuty: ["男主1号", "男主2号", "男主3号"],
      AfterDuty: ["男主4号", "男主5号", "男主6号"],
      employmentPeriod: "2021.1.1"
    }, ],
    requiredCount: 0,
    selectedQuestionList: [],
  },
  /**
   * 
   * 完成评价
   */
  Complete() {

    if (this.data.selectedQuestionList.length < this.data.requiredCount) {
      wx.showToast({
        title: '请完成所有必选项之后再进行下一步操作!',
        icon: 'none',
        duration: 2000
      })
    } else {

      wx.request({
        url: app.globalData.URL + '/app/member-end.jspx', //自己的服务接口地址
        method: 'post',
        data: {
          accountId: this.data.accountId,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
       
          console.log(res.data);
          var e = JSON.parse(res.data.json);
          console.log(e);
        },
        fail: function () {
          console.log('系统错误')
        }
      })

     
        wx.navigateTo({
          url: '../EvaluationComplete/EvaluationComplete',
        })
     
        // wx.showToast({
        //   title: '已完成对所有干部的评价！',
        //   icon: 'none',
        //   duration: 2000
        // })
      

    }

  },
  /**
   * 
   * 上一位 
   */
  BeforeStep() {
    var that = this;

    that.setData({
      pageno: that.data.pageno - 1
    })
    if (that.data.pageno == 1) {
      that.setData({
        pageno: 1
      })
    }
    if (that.data.pageno < that.data.totalpage) {
      that.onLoad();
    }

    console.log("that.data.pageno", that.data.pageno);
  },
  /**
   * 
   * 下一位 
   */
  NextStep() {

    if (this.data.selectedQuestionList.length < this.data.requiredCount) {
      wx.showToast({
        title: '请完成所有必选项之后再进行下一步操作!',
        icon: 'none',
        duration: 2000
      })
    } else {


      var that = this;

      if (that.data.pageno == that.data.totalpage) {
        that.setData({
          pageno: that.data.totalpage
        })
        console.log("当前页等于总页数", that.data.pageno, that.data.totalpage)
      } else {
        that.setData({
          pageno: that.data.pageno + 1
        })
        console.log("当前页小于总页数", that.data.pageno, that.data.totalpage)
        that.onLoad();
      }

      console.log("that.data.pageno", that.data.pageno);
      // if (this.data.selectedQuestionList.length > 0) {
      //   console.log("已完成评价！");
      // } else {
      //   wx.showToast({
      //     title: '已完成对该干部的评价!',
      //     icon: 'none',
      //     duration: 1500
      //   })
      // }
    }
  },
  /**
   * 
   * 单项选择
   */
  radiochange: function (e) {
    var item = e.detail.value //  
    console.log('radio发生change事件，携带的value值为：', e.detail.value);
    //循环选中的数组，取出对应的数据进行数组拼接 
    // for (var i = 0; i < item.length; i++) {
    var row = item.split(",")
    //将数组进行分割 
    var questionId = row[0] //数组下表的第一个
    var optionId = row[1].concat(',')
    this.setData({
      questionId: questionId,
      optionId: optionId
    })
    // }
 
    if (this.data.selectedQuestionList.indexOf(questionId) == -1) {
      this.data.selectedQuestionList.push(questionId);
    }
    wx.request({
      url: app.globalData.URL + '/app/member-option-save.jspx', //自己的服务接口地址
      method: 'post',
      data: {
        accountId: this.data.accountId,
        optionIds: this.data.optionId,
        questionId: this.data.questionId,
        remark: this.data.remark
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        var e = JSON.parse(res.data.json);
      }
    })
  },
  /**
   * 
   * 多项选择
   */
  check(e) {
    let questionId = e.currentTarget.dataset.id;
    console.log("当前checkBox事件：", e.currentTarget.dataset.id);
    this.setData({
      questionId: questionId
    })
    if (this.data.flag == true) {
      this.setData({
        questionId: questionId,
        optionId: '',
        remark: ''
      })
      wx.request({
        url: app.globalData.URL + '/app/member-option-save.jspx', //自己的服务接口地址
        method: 'post',
        data: {
          accountId: this.data.accountId,
          optionIds: this.data.optionId,
          questionId: this.data.questionId,
          remark: this.data.remark
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data);
          var e = JSON.parse(res.data.json);
        }

      })
    }
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail)
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    var item = e.detail.value //
    var questionId = [];
    var optionId = [];
    //循环选中的数组，取出对应的数据进行数组拼接 
    for (var i = 0; i < item.length; i++) {
      var row = item[i].split(",")
      //将数组进行分割 
      questionId = questionId.concat(row[0]) //数组下表的第一个为
      optionId = optionId.concat(row[1])
    }
    console.log("多选事件", questionId);
    console.log("多选事件", optionId);
    if (optionId.length > 0) {
      var questionId = row[0] //数组下表的第一个为
      var optionId = row[1].concat(',')
      this.setData({
        questionId: questionId,
        optionId: optionId,
        flag: false
      })
      wx.request({
        url: app.globalData.URL + '/app/member-option-save.jspx', //自己的服务接口地址
        method: 'post',
        data: {
          accountId: this.data.accountId,
          optionIds: this.data.optionId,
          questionId: this.data.questionId,
          remark: this.data.remark
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data);
          var e = JSON.parse(res.data.json);
        }
      })
    } else {
      this.setData({
        flag: true
      })
      console.log("数组为空，多选数组为空");
    }
  },
  /**
   * 
   * textarea绑定事件
   */
  handleJumpPage(e) {
    var that = this;
    let questionId = e.currentTarget.dataset.id;
    console.log("当前handleJumpPage事件：", e.currentTarget.dataset.id);
    that.setData({
      questionId: e.currentTarget.dataset.id
    })
  },
  /**
   * 
   * textarea
   */
  bindTextAreaBlur: function (e) {
    var that = this;
    console.log("okok");
    console.log(e.detail.value);
    this.setData({
      remark: e.detail.value
    })
    console.log("remark类型：", typeof (that.data.remark))
    wx.request({
      url: app.globalData.URL + '/app/member-option-save.jspx', //自己的服务接口地址
      method: 'post',
      data: {
        accountId: that.data.accountId,
        optionIds: '',
        questionId: that.data.questionId,
        remark: that.data.remark
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        var e = JSON.parse(res.data.json);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (that.data.pageno == that.data.totalpage && that.data.pageno == 1) {
      that.setData({
        hiddenNextStep: true,
        hiddenBeforeStep: true,
        hiddenComplete: false
      })
    }
    if (that.data.pageno == 1) {
      that.setData({
        hiddenBeforeStep: true,
        hiddenNextStep: false,
        hiddenComplete: true
      })
    }
    if (that.data.pageno != 1 && that.data.pageno != that.data.totalpage) {
      that.setData({
        hiddenBeforeStep: false,
        hiddenNextStep: false,
        hiddenComplete: true
      })
    }
    if (that.data.pageno == 1 && that.data.pageno == that.data.totalpage) {
      that.setData({
        hiddenBeforeStep: true,
        hiddenNextStep: true,
        hiddenComplete: false
      })
    }
    if (that.data.pageno == that.data.totalpage) {
      that.setData({
        hiddenNextStep: true,
        hiddenBeforeStep: false,
        hiddenComplete: false
      })
    }

    console.log("调用onload", that.data.pageno);
    that.setData({
      accountId: wx.getStorageSync('accountId'),
      selectedQuestionList: [],
      requiredCount: 0
    })

    wx.request({
      url: app.globalData.URL + '/app/member-theme2-list.jspx', //自己的服务接口地址
      method: 'post',
      data: {
        accountId: that.data.accountId,
        pageNo: that.data.pageno
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        var e = JSON.parse(res.data.json);
        console.log(e);
        that.setData({
          themeName: e.themeName,
          questionArray: e.questionArray,
          totalpage: e.totalpage
        })
        //  console.log("questionArray[1]", that.data.questionArray[1]);
        for (var i = 0; i < that.data.questionArray.length; i++) {
          var question = that.data.questionArray[i];
          // console.log("question flag=>" + question.flag);
          if (question.flag == 0) {
            that.data.requiredCount++;
            for (var j = 0; j < question.optionArray.length; j++) {
              var option = question.optionArray[j];
              if (option.check != null && option.check == 1) {
                if (that.data.selectedQuestionList.indexOf(question.questionId) == -1) {
                  that.data.selectedQuestionList.push(question.questionId);
                }
              }
            }
          }
        }

        console.log("requiredCount=>" + that.data.requiredCount);
        console.log("that.selectedQuestionList.length=>" + that.data.selectedQuestionList.length);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})