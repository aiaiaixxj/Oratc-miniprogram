// var app = require('../../resource/js/util.js');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '', //姓名
    phone: '', //手机号
    code: '', //验证码
    iscode: null, //用于存放验证码接口里获取到的code
    codename: '获取验证码',
    accountId:null  //存放账户id
  },
  //获取input输入框的值
  // getNameValue:function(e){
  //   this.setData({
  //     name:e.detail.value
  //   })
  // },
  getPhoneValue: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getCodeValue: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  getCode: function () {
    var a = this.data.phone;
    var _this = this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      wx.request({

        'url': app.globalData.URL + "/app/member-login-phonecode.jspx",
        method: 'post',
        data: {
          phone: this.data.phone,
          accountId: this.data.accountId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          console.log(res.data);
          console.log(res.data.json);
          console.log(JSON.parse(res.data.json));
          wx.showToast({
              title:res.data.msg ,
                 icon: 'none',
                 duration: 2000
               })
          // if(res.data.msg=='手机号已绑定'){
          //   wx.showToast({
          //     title: '手机号已绑定!',
          //     icon: 'none',
          //     duration: 1000
          //   })
          // }
          // if(res.data.msg=='手机号码已绑定账号，请使用原账号登录！'){
          //   wx.showToast({
          //     title: '手机号码已绑定账号，请使用原账号登录！',
          //     icon: 'none',
          //     duration: 1000
          //   })
          // }
          let mycode = JSON.parse(res.data.json)
          _this.setData({
            iscode: mycode.code
          })
          var num = 61;
          var timer = setInterval(function () {
            num--;
            if (num <= 0) {
              clearInterval(timer);
              _this.setData({
                codename: '重新发送',
                disabled: false
              })
            } else {
              _this.setData({
                codename: num + "s"
              })
            }
          }, 1000)
        }
      })
    }
  },
  //获取验证码
  getVerificationCode() {
    console.log("click")
    this.getCode();
    var _this = this
    _this.setData({
      disabled: true
    })
  },
  //提交表单信息
  save: function () {
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    // if(this.data.name == ""){
    //   wx.showToast({
    //     title: '姓名不能为空',
    //     icon: 'none',
    //     duration: 1000
    //   })
    //   return false;
    // }
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.code == "") {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (this.data.code != this.data.iscode) {
      console.log(this.data.code, this.data.iscode)
      wx.showToast({
        title: '验证码错误',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      // wx.setStorageSync('name', this.data.name);
      wx.setStorageSync('phone', this.data.phone);

      wx.redirectTo({
        url: '../DemocraticEvaluationForm/DemocraticEvaluationForm',
      });
      wx.request({
        'url': app.globalData.URL + "/app/member-save-phone.jspx",
        method: 'post',
        data: {
          phone: this.data.phone,
          accountId: this.data.accountId,
          code:this.data.iscode
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          console.log(res.data);
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
        accountId: wx.getStorageSync('accountId')
      }
    )
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