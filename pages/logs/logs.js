Page({
  data: {
    imgUrls: [
      '../../images/slider1.png',
      '../../images/slider2.png',
      '../../images/slider3.png',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 1500,
    redulist:[],
    qianlilist:[]
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    wx.request({
      url: 'https://www.xpedia.cc/api/getForecastPage?tid=0&time=2017-08-1&isIncrease=false&asc=false&pn=1',//请求地址
      data: {//发送给后台的数据
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
          redulist:res.data.ips
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    });
    wx.request({
      url: 'https://www.xpedia.cc/api/getForecastPage?tid=0&time=2017-08-1&isIncrease=true&asc=false&pn=1',//请求地址
      data: {//发送给后台的数据
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
          qianlilist: res.data.ips
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    });
  }
})