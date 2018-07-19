// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.js');
var wxMarkerData = [];
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    rgcdata: {},
    placeData: {}
  },

  changetolocate: function () {
    wx.redirectTo({
      url: '../locate/locate',
    })
  },

  changetopolice: function () {
    wx.redirectTo({
      url: '../police/police',
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
    that.showSearchInfo(wxMarkerData, id);
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
    }

    // 发起POI检索请求 
    BMap.search({
      "query": '医院',
      fail: fail,
      success: success,
      // 此处需要在相应路径放置图片文件 
      iconPath: '../../libs/marker_red.png',
      // 此处需要在相应路径放置图片文件 
      iconTapPath: '../../libs/marker_red.png'
    });

  },
  showSearchInfo: function (data, i) {
    var that = this;
    that.setData({
      placeData: {
        title: '名称：' + data[i].title + '\n',
        address: '地址：' + data[i].address + '\n',
        telephone: '电话：' + data[i].telephone
      }
    });
  },


})