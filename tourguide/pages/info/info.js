// info.js

Page({
  data: {
    send:false,
    disabled: true,
    buttonType: 'default',
    phoneNum: '',
    securityMM: '',
    riskMM: '',
    securityMM1: '',
    riskMM1: '',
    timePeriod: '',
    hidsec:true,
    hidrisk:true
  },

  // 手机号部分
  inputPhoneNum: function (e) {
    let phoneNum = e.detail.value
    if (phoneNum.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNum)
      if (checkedNum) {
        this.setData({
          phoneNum: phoneNum
        })
        console.log('phoneNum' + this.data.phoneNum)
        this.setData({
          send: true
        })  //电话号码正确就显示确定按钮
        this.activeButton()   //所有信息填写才能点击确定
      }
    } else {
      this.setData({
        phoneNum: '',
        send: false,
        disabled: true,
        
      }) 
    }
  },

  checkPhoneNum: function (phoneNum) {
    let str = /^1\d{10}$/
    if (str.test(phoneNum)) {
      return true
    } else {
      wx.showToast({
        title: '手机号不正确'
      })
      return false
    }
  },

  // 安全密码
  addsecurityMM: function (e) {
    let securityMM = e.detail.value
    if(securityMM.length===6){
     this.setData({
       securityMM : e.detail.value,
     })
    }
    this.activeButton()
    console.log('securityMM: ' + this.data.securityMM)
  },
  //确认安全密码
  addsecurityMM1: function (e) {
    let securityMM1 = e.detail.value
    if(securityMM1.length===6){
      if (securityMM1!=this.data.securityMM) {
         this.setData({
          securityMM1: null,
          tip:'提示：与原密码不一致，请重新输入'
         })
      }else{this.setData({
           securityMM1:e.detail.value,
           tip:''
          })
       }
    }
    this.activeButton()
    console.log('securityMM: ' + this.data.securityMM1)
  },

  // 报警密码
  addriskMM: function (e) {
    let riskMM = e.detail.value
    if (riskMM.length === 6){
    this.setData({
      riskMM: e.detail.value,
    })
    }
    this.activeButton()
    console.log('riskMM: ' + this.data.riskMM)
  },
//确认报警密码
  addriskMM1: function (e) {
    let riskMM1 = e.detail.value
    if(riskMM1.length===6){
    if (riskMM1 != this.data.riskMM) {
      this.setData({
        riskMM1: null,
        tip: '提示：与原密码不一致，请重新输入'
      })
    } else {
      this.setData({
        riskMM1: e.detail.value,
        tip:''
      })

    }
    }
    this.activeButton()
    console.log('securityMM: ' + this.data.riskMM1)
  },

  // 时间间隔
  addtimePeriod: function (e) {
    this.setData({
      timePeriod: e.detail.value
    })
    if (this.data.timePeriod < 10) {
      this.setData({
        timePeriod: null,
        tip: '提示：时间需设置在10分钟以上'
      })
    }
    this.activeButton()
    console.log('timePeriod: ' + this.data.timePeriod)
  },

  

  // 按钮
  activeButton: function () {
    let { phoneNum, securityMM, securityMM1, riskMM, riskMM1,timePeriod } = this.data
    if (phoneNum && securityMM && riskMM && riskMM1&&securityMM1&&timePeriod) {
      this.setData({
        disabled: false,
       
      })
    } else {
      this.setData({
        disabled: true,
        
      })
    }
  },

  onSubmit: function (e) {
    if (this.data.securityMM === this.data.riskMM ) {
      this.setData({
        tip: '提示：安全密码和报警密码不能相同'
      })
    } else {
        getApp().data.isSetup = true , 
        getApp().data.riskCode = this.data.riskMM,
        getApp().data.securityCode = this.data.securityMM, 
        getApp().data.phoneNum = this.data.phoneNum,   
        getApp().data.timeSet = this.data.timePeriod //设置完成
        wx.reLaunch({
          url:'../index/index'
        })
    }
  }
})

