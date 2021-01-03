// pages/DemocraticEvaluationForm/DemocraticEvaluationForm.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountId: null, //存放账户id
    themeName: null, //标题名字
    focus: false,
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
    ]
  },
  /**
   * 
   * 单项选择
   */
  radiochange: function (e) {
    console.log('radio发生change事件，携带的value值为：', e.detail.value)
  },
  /**
   * 
   * 多项选择
   */
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false;
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          console.log("i,j", i, j);
          items[i].checked = true;
          break
        }
      }
    }

    this.setData({
      items
    })
  },
  /**
   * 
   * textarea
   */
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
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

        })

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