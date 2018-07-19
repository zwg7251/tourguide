var app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto:'Hello World',
    userInfo:{}
  },

  changetoMap: function () {
    wx.navigateTo({
      url: '../locate/locate',
    })
  },

  changetostart: function () {
    if (getApp().data.isSetup) {
      wx.reLaunch({
        url: '../inputMM/inputMM',
      })
    } else {
      this.dialog.showDialog();
    }
  },

  changetoset: function () {
    if (!getApp().data.isSetup){
    wx.navigateTo({
      url: '../info/info',
    })
    }else{
      getApp().data.isReset = true
      wx.navigateTo({
        url: '../inputMM/inputMM',
      })
    }
  },

  changetobook: function () {
    wx.navigateTo({
      url: '../book/book',
    })
  },

  onLoad: function () {

  },

  onReady: function () {

    //获得dialog组件

    this.dialog = this.selectComponent("#dialog");

  },



  //取消事件

  _cancelEvent() {

    console.log('你点击了取消');

    this.dialog.hideDialog();

  },

  //确认事件

  _confirmEvent() {

    console.log('你点击了确定');

    this.dialog.hideDialog();

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      getApp().data.isReset =false

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