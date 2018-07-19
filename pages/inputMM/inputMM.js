const app = getApp()
const config = require('../../config/config.js')

Page({
  data: {
    // 输入框参数设置
    inputData: {
      input_value: "",//输入框的初始内容
      value_length: 0,//输入框密码位数
      isNext: false,//是否有下一步的按钮
      get_focus: true,//输入框的聚焦状态
      focus_class: true,//输入框聚焦样式
      value_num: [1, 2, 3, 4, 5, 6],//输入框格子数
      height: "98rpx",//输入框高度
      width: "604rpx",//输入框宽度
      see: false,//是否明文展示
      interval: true,//是否显示间隔格子
    },
    num: 1,
    phoneNum:''
  },

  // 当组件输入数字6位数时的自定义函数
  sendSecmsg() {
    if (getApp().data.isReset){
      getApp().data.isReset = false
      wx.reLaunch({
        url: '../info/info',
      })
    }else if(getApp().data.isClose == 0){
      this.sendMsg()
    wx.redirectTo({
      url:'../clock/clock',
    })
    // 模态交互效果
    wx.showToast({
      title: '安全信息发送成功',
      icon: 'success',
      duration: 2000
    })
    }else{
      getApp().data.isClose = 0
      wx.reLaunch({
        url: '../index/index',
      })
    }
  },

  sendRiskmsg() {
    if (getApp().data.isReset){
      wx.showToast({
        title: '密码错误',
        icon: 'loading',
        duration: 2000
      })
    }else if(getApp().data.isClose == 0){
      this.sendMsg()
    wx.redirectTo({
      url: '../clock/clock',
    })
    // 模态交互效果
    wx.showToast({
      title: '危险信息发送成功',
      icon: 'success',
      duration: 2000
    })
    }else{
      getApp().data.isClose = 0
      wx.reLaunch({   
        url: '../index/index',
      })
    }
  },

  codeError() {
    // 模态交互效果
    wx.showToast({
      title: '密码错误',
      icon: 'loading',
      duration: 2000
    })
  },

//服务器发送信息
  sendMsg: function () {
    wx.request({
      url: `${config.api + '/msg'}`,
      data: {
        phoneNum: getApp().data.phoneNum
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
      }
    })
  },

  onload: function () {
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
      }
    })
  }

})
