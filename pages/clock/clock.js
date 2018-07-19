var total_micro_second 


/* 毫秒级倒计时 */
function count_down(that) {
  // 渲染倒计时时钟
  that.setData({
    clock: date_format(total_micro_second)
  });

  if (total_micro_second <= 0) {
    that.setData({
      clock: "请点击确定进行安全确认",
      disabled:false
    });
    // timeout则跳出递归
    return;
  }
  setTimeout(function () {
    // 放在最后--
    total_micro_second -= 1000;
    count_down(that);
  }, 1000)
}

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  //var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));

  return hr + ":" + min + ":" + sec + " " ;
}

// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}

Page({
  data: {
    clock: '',
    disabled:true
  },

  onSubmit:function(){
    wx.reLaunch({
      url: '../inputMM/inputMM',
    })
  },

  onClose:function(){
    getApp().data.isClose = 1
     wx.navigateTo({
       url:'../inputMM/inputMM'
     })
  },



  onLoad: function () {
    total_micro_second = getApp().data.timeSet*60*1000
    count_down(this);
  },

  onShow:function(){
    getApp().data.isClose = 0
    console.log(getApp().data.isClose)
  },


  onUnload:function(){
    total_micro_second = 0
  }
});