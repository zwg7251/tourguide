// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.js');
var wxMarkerData = [];

Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    rgcData: {}
  },

  changetopolice: function () {
    wx.redirectTo({
      url: '../police/police',
    })
  },
  changetohospital: function () {
    wx.redirectTo({
      url: '../hospital/hospital',
    })
  },
  changetoFP: function () {
    wx.redirectTo({
      url: '../index/index',
    })
  },


  makertap: function (e) {
    var that = this;
    var id = e.markerId;
  },

  onLoad: function () {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'V2oixhT9mM5UTvbQpMhayZAGncbAnkVF'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
      
    that.setData({
      markers: wxMarkerData,
      desc: wxMarkerData[0].desc,
      address: wxMarkerData[0].address,
      business:wxMarkerData[0].business
    });
    }
    BMap.regeocoding({
      fail: fail,
      success: success,
      iconPath: '../../libs/marker_red.png',
      iconTapPath: '../../libs/marker_red.png'
    });
  },
  onShareAppMessage: function () {
    let that = this;
    return {
      title: '我的当前位置', // 转发后 所显示的title
      path: '/pages/locate/locate?id=123', // 相对的路径
      success: (res) => {    // 成功后要做的事情
        console.log(res.shareTickets[0])
        // console.log

        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: (res) => {
            that.setData({
              isShow: true
            })
            console.log(that.setData.isShow)
          },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }

  }
})