// pages/DemocraticEvaluationForm/DemocraticEvaluationForm.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountId: null, //存放账户id
    themeName: null, //标题名字
    questionArray: null,
    optionId: null,
    questionId: null,
    remark: '',
    focus: false,
    flag: false,
    radioList: [{
        id: 0,
        value: "good",
        name: "好",
        checked: true,
        disabled: false
      },
      {
        id: 1,
        value: "normal",
        name: "一般",
        checked: false,
        disabled: false
      },
      {
        id: 2,
        value: "bad",
        name: "不好",
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
    items: [{
        value: 'CAN',
        name: '加拿大'
      },
      {
        value: 'CHN',
        name: '中国',

      },
      {
        value: 'BRA',
        name: '巴西'
      },
      {
        value: 'UK',
        name: '英国'
      }
    ],
    questionArray_0_optionArray: [

    ],
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
  handleJumpPage(e){
    let questionId = e.currentTarget.dataset.id;
    console.log("当前handleJumpPage事件：", e.currentTarget.dataset.id);
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
    console.log("okok");
    console.log(e.detail.value)
    wx.request({
      url: app.globalData.URL + '/app/member-option-save.jspx', //自己的服务接口地址
      method: 'post',
      data: {
        accountId: this.data.accountId,
        optionIds: this.data.optionIds,
        questionId:this.data.questionId,
        remark:this.data.remark
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
    that.setData({
      accountId: wx.getStorageSync('accountId')
    })
    wx.request({
      url: app.globalData.URL + '/app/member-theme1-list.jspx', //自己的服务接口地址
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
        console.log(e.questionArray);
        that.setData({
          themeName: e.themeName,
          questionArray: e.questionArray,

        })
        var values = function (object) {
          var values = [];
          for (var property in object)
            values.push(object[property]);
          return values;
        }


        //4.解密成功后 获取自己服务器返回的结果
      },
      fail: function () {}
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