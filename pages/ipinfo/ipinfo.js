// pages/ipinfo/ipinfo.js
var util = require('../../utils/util.js');
var wxCharts=require('../../utils/wxcharts-min.js');
const app = getApp();
var radarChart = null;
var columnChart = null;
var pieChart = null;
var chartData = {
  main: {
    title: '年龄分布',
    categories: ['19岁及以下', '20~29岁', '30~39岁', '40~49岁','50岁及以上']
  }
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ipinfo:{},
    zhishu:[],
    ciyun:[]
  },
  touchHandler: function (e) {
    console.log(radarChart.getCurrentDataIndex(e));
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    var thisipid = getnowurlargs().ipid;
    wx.request({
      url: 'https://www.xpedia.cc/api/getIpDetail?id=' + thisipid + '&time=2017-10-05',//请求地址
      data: {//发送给后台的数据
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        // console.log(res.data.ip);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
          ipinfo: calcnumber(res.data.ip)
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    });
    wx.request({
      url: 'https://www.xpedia.cc//api/getRadar?id=' + thisipid,//请求指数列表
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        console.log(res.data.data.value);//res.data相当于ajax里面的data,为后台返回的数据
        var zhishuarray=res.data.data.value;
        that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
          zhishu:res.data
        });
        //拿到数据后，这里开始画图
        var windowWidth = 350;
        try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }

        radarChart = new wxCharts({
          canvasId: 'radarCanvas',
          type: 'radar',
          categories: ['作者名气', '主流导向', '读者互动', '更新频率', '情节质量', '改编潜力'],
          series: [{
            name: '指数',
            data: zhishuarray
          }],
          width: windowWidth,
          height: 250,
          extra: {
            radar: {
              max: 10
            }
          }
        });
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    }),
      wx.request({
      url: 'https://www.xpedia.cc/api/getWordData?id=' + thisipid,//请求地址
        data: {//发送给后台的数据
        },
        header: {//请求头
          "Content-Type": "applciation/json"
        },
        method: "GET",//get为默认方法/POST
        success: function (res) {
          console.log("词云图");
          console.log(res.data.data);//res.data相当于ajax里面的data,为后台返回的数据
          that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
            ciyun: matchcolor(res.data.data)
          })
        },
        fail: function (err) { },//请求失败
        complete: function () { }//请求完成后执行的函数
      });
    wx.request({
      url: 'https://www.xpedia.cc/api/getCrowdPortrait?id=' + thisipid,//请求地址
      data: {//发送给后台的数据
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        console.log("性别分布");
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        var windowWidth = 320;
        var list=res.data.data.ageOption;
        var sexlist=res.data.data.sexOption;
        try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }

        columnChart = new wxCharts({
          canvasId: 'columnCanvas',
          type: 'column',
          animation: true,
          categories: chartData.main.categories,
          series: [{
            name: '指数',
            data: list,
            format: function (val, name) {
              return val.toFixed(2) + '%';
            }
          }],
          yAxis: {
            format: function (val) {
              return val + '%';
            },
            title: '年龄分布',
            min: 0
          },
          xAxis: {
            disableGrid: false,
            type: 'calibration'
          },
          extra: {
            column: {
              width: 15
            }
          },
          width: windowWidth,
          height: 200,
        });
        pieChart = new wxCharts({
          animation: true,
          canvasId: 'pieCanvas',
          type: 'pie',
          series: [{
            name: '男',
            data: sexlist[0],
          }, {
            name: '女',
            data: sexlist[1],
          }],
          width: windowWidth,
          height: 300,
          dataLabel: true,
        });
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    });
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
function getnowurlargs(){
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  var options = currentPage.options    //如果要获取url中所带的参数可以查看options
  return options;
}
function calcnumber(mmn){
  mmn.data.clicks = mmn.data.clicks/10000;
  mmn.data.recommendations = mmn.data.recommendations/10000;
  mmn.data.tickets = mmn.data.tickets/100;
  mmn.data.words = mmn.data.words/10000;
  mmn.heat=mmn.heat/10000;
  return mmn;
}
function matchcolor(mmn){
  var colors = ['#30A9DE', '#E53A40', '#EFDC05', '#090707', '#A593E0', '#E003DA', '#000000', '#566270', '#F6B352', '#F68657', '#383A3F', '#1F2124', '#D7ccc1', '#8CD790', '#77AF9C', '#285943', '#D499B9', '#9055A2', '#2E294E', '#011638', '#FBcFB9', '#FDD692', '#EC7357', '#754F44', '#C5E99B', '#8FBC94', '#548687', '#56445D', '#E71D36', '#2EC4B6', '#EF0F09', '#011627', '#DE6449', '#791E94', '#0ce0e0', '#41D3BD', '#5CAB7D', '#5A9367', '#44633F', '#3F4B3B', '#FFBC42', '#D81159', '#8F2D56', '#218380', '#E3E36A', '#C16200', '#881600', '#49010F', '#379392','#4FB0C6'];
  for (var i=0;i<mmn.length;i++){
    mmn[i].uid=colors[i];
  }
  return mmn;
}