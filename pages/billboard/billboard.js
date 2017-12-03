//榜单js
var addBookId='';
var rank='false';
var nowpage=1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeIndex: 1,
    Type: ['最新', '完本', '连载', '人气'],
    dateIndex: 2,
    Date: ['2017-06', '2017-07', '2017-08', '2017-09','2017-10'],
    iplist:[],
    isAdd: false,
    hidden: true,
    addBookId: "",
    reducolor:'#000',
    zhangfucolor:'#2db07a'
  },
  typeChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },  
  dateChange: function (e) {
    this.setData({
      dateIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    wx.request({
      url: 'https://www.xpedia.cc/api/getForecastPage?tid=0&time=2017-08-1&isIncrease=' + rank + '&asc=false&pn=' + nowpage,//请求地址
      data: {//发送给后台的数据
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
          iplist: changeresult(res.data.ips)
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    });
  },
  add: function () {
    var bol = this.data.isAdd;
    this.setData({
      isAdd: !bol
    })
  },
  added: function (temp) {
    this.setData({
      hidden: false
    })
    addBookId = temp.currentTarget.id;
  },
  confirm: function () {
    var that = this;
    wx.request({
      url: 'https://www.xpedia.cc/api/addCollection?userId=ZhoujialingLovingyou&bookId=' + addBookId,
      data: {
      },
      header: {
        "Content-Type": "applciation/json"
      },
      method: "POST",
      success: function () {
        wx.reLaunch({
          url: '../billboard/billboard'
        })
      },
      fail: function (err) { },
      complete: function () { }
    });
    this.setData({
      hidden: true
    });
  },
  cancel: function () {
    this.setData({
      hidden: true
    })
  },
  changegoodrank:function(){
    rank='true';
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    wx.request({
      url: 'https://www.xpedia.cc/api/getForecastPage?tid=0&time=2017-08-1&isIncrease=' + rank + '&asc=false&pn=1',//请求地址
      data: {//发送给后台的数据
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
          iplist: changeresult(res.data.ips),
          reducolor: '#2db07a',
          zhangfucolor: '#000'
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    });
  },
  changebadrank:function(){
    rank='false';
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    wx.request({
      url: 'https://www.xpedia.cc/api/getForecastPage?tid=0&time=2017-08-1&isIncrease=' + rank + '&asc=false&pn=1',//请求地址
      data: {//发送给后台的数据
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
          iplist: changeresult(res.data.ips),
          reducolor: '#000',
          zhangfucolor: '#2db07a'
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    });
  },
  // 下拉刷新回调接口
  onReachBottom: function () {
    // do somthing
    nowpage++;
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    wx.request({
      url: 'https://www.xpedia.cc/api/getForecastPage?tid=0&time=2017-08-1&isIncrease=' + rank + '&asc=false&pn=' + nowpage,//请求地址
      data: {//发送给后台的数据
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
          iplist:changeresult(res.data.ips)
        })
        wx.pageScrollTo({
          scrollTop: 0
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    });
  },
  onPullDownRefresh:function(){
    // do somthing
    var m=nowpage-1;
    if(m>=1){
    nowpage--;}
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    wx.request({
      url: 'https://www.xpedia.cc/api/getForecastPage?tid=0&time=2017-08-1&isIncrease=' + rank + '&asc=false&pn=' + nowpage,//请求地址
      data: {//发送给后台的数据
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
          iplist: changeresult(res.data.ips)
        })
        wx.pageScrollTo({
          scrollTop: 0
        })
      },
      fail: function (err) { },//请求失败
      complete: function () {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        }
    });
  }
})
function changeresult(mmn) {
  for (var i = 0; i < mmn.length; i++) {
    if (mmn[i].isEnd == true) {
      mmn[i].isEnd = "完本";
    } else {
      mmn[i].isEnd = "连载中";
    }
    if (mmn[i].name.length > 4) {
      mmn[i].size = "14px";
    } else if (mmn[i].name.length > 4) {
      mmn[i].size = "12px";
    } else {
      mmn[i].size = "16px";
    }
  }
  return mmn;
}