// pages/CadresDemocraticEvaluationForm/CadresDemocraticEvaluationForm.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    questionId:null,
    accountId:null,
    optionIds:null,
    themeName:null,
    questionArray:null,
    
  
    optionId: null,
 
    remark: '',
    focus: false,
    flag: false,
    
    radioList: [{
        id: 0,
        value: "agree",
        name: "认同",
        checked: true,
        disabled: false
      },
      {
        id: 1,
        value: "baseagree",
        name: "基本认同",
        checked: false,
        disabled: false
      },
      {
        id: 2,
        value: "disagreement",
        name: "不认同",
        checked: false,
        disabled: false
      },
      {
        id: 3,
        value: "unknow",
        name: "不了解",
        checked: false,
        disabled: false
      },
    ],
    infoLIst:[
      {name:"唐三",birthDay:"1999.2.19",BeforeDuty:["男主1号","男主2号","男主3号"],AfterDuty:["男主4号","男主5号","男主6号"],employmentPeriod:"2021.1.1"},
      // {name:"小舞",birthDay:"1999.2.20",BeforeDuty:["女主1号","女主2号","女主3号"],AfterDuty:["女主4号","女主5号","女主6号"],employmentPeriod:"2021.1.2"},
      // {name:"唐昊",birthDay:"1969.2.19",BeforeDuty:["男主1号他爸","男主2号他爸","男主3号他爸"],AfterDuty:["男主4号他爸","男主5号他爸","男主6号他爸"],employmentPeriod:"2021.1.3"},
      // {name:"月儿",birthDay:"1999.2.19",BeforeDuty:["男主1号他妈","男主2号他妈","男主3号他妈"],AfterDuty:["男主4号他妈","男主5号他妈","男主6号他妈"],employmentPeriod:"2021.1.4"}
    ]
  },
  /**
   * 
   * 单项选择
   */
  radiochange: function (e) {
    // console.log('radio发生change事件，携带的value值为：', e.detail.questionId);
    // console.log('radio发生change事件，携带的value值为：', e.detail.optionId);
    var item = e.detail.value //  
    console.log('radio发生change事件，携带的value值为：', e.detail.value);

    //循环选中的数组，取出对应的数据进行数组拼接 
    // for (var i = 0; i < item.length; i++) {
    var row = item.split(",")
    //将数组进行分割 
    var questionId = row[0] //数组下表的第一个为
    var optionId = row[1].concat(',')
    this.setData({
      questionId: questionId,
      optionId: optionId
    })
    //数组下表的第二个为name 
    // }
    console.log(questionId);
    console.log(optionId)
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
    if(this.data.flag==true){
      this.setData({
        questionId: questionId,
        optionId: '',
        remark:''
      })
      wx.request({
        url: app.globalData.URL + '/app/member-option-save.jspx', //自己的服务接口地址
        method: 'post',
        data: {
          accountId: this.data.accountId,
          optionIds:  this.data.optionId,
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
    // if(this.data.newList.contains(""+id)){
    //     console.log("选中："+id);
    // } else {
    //     console.log("取消选中："+id);
    // }
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail)
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    var item = e.detail.value //

    var questionId = [];

    var optionId = []; //  选中的NAME

    //循环选中的数组，取出对应的数据进行数组拼接 
    for (var i = 0; i < item.length; i++) {
      var row = item[i].split(",")
      //将数组进行分割 
      questionId = questionId.concat(row[0]) //数组下表的第一个为
      optionId = optionId.concat(row[1])
      //数组下表的第二个为name 
    }
    console.log("多选事件", questionId);
    console.log("多选事件", optionId);
    if (optionId.length > 0) {
      var questionId = row[0] //数组下表的第一个为
      var optionId = row[1].concat(',')
      this.setData({
        questionId: questionId,
        optionId: optionId,
        flag :false
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
        flag :true
      })
      console.log("数组为空，多选数组为空");
    }
   


  },
  /**
   * 
   * textarea
   */
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    // wx.request({
    //   url: app.globalData.URL + '/app/member-option-save.jspx', //自己的服务接口地址
    //   method: 'post',
    //   data: {
    //     accountId: this.data.accountId,
    //     optionIds: this.data.optionIds,
    //     questionId:this.data.questionId,
    //     remark:this.data.remark
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    //     console.log(res.data);
    //     var e = JSON.parse(res.data.json);
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      accountId: wx.getStorageSync('accountId')
    })
    wx.request({
      url: app.globalData.URL + '/app/member-theme2-list.jspx', //自己的服务接口地址
      method: 'post',
      data: {
        accountId: that.data.accountId,
        // optionIds:  this.data.optionId,
        // questionId: this.data.questionId,
        pageno:1
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
          questionArray:e.questionArray
        })
      }})
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