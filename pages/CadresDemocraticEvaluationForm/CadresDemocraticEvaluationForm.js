// pages/CadresDemocraticEvaluationForm/CadresDemocraticEvaluationForm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
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
    console.log('radio发生change事件，携带的value值为：', e.detail.value)
  },
  /**
   * 
   * textarea
   */
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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