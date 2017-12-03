
//全局对象app
const app=getApp();
var deleteBookId='';
//榜单js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iplist:[],
    isDelete: false,
    index: 0,
    deleteBookId: "",
    hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    // var nickname = app.globalData.userInfo.nickName;
    // console.log(nickname);
    var nickname = 'ZhoujialingLovingyou';
    wx.request({
      url: 'https://www.xpedia.cc/api/getCollection?userId=' + nickname,//请求地址
      data: {//发送给后台的数据
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        console.log(changeresult(res.data));//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数

          iplist: changeresult(res.data)

        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    });
    // console.log(app.globalData.userInfo);输出用户信息
  },

  delet: function () {
    var bol = this.data.isDelete;
    this.setData({
      isDelete: !bol

    })
  },
  deleted: function (temp) {
    this.setData({
      hidden: false,
      deleteBookId: temp.currentTarget.id
    });
    deleteBookId = temp.currentTarget.id;
    console.log(temp.currentTarget.id);
  },
  confirm: function () {
    var that = this;
    wx.request({
      url: 'https://www.xpedia.cc/api/deleteCollection?userId=ZhoujialingLovingyou&bookId=' + deleteBookId,
      data: {
      },
      header: {
        "Content-Type": "applciation/json"
      },
      method: "POST",
      success: function () {
        wx.reLaunch({
          url: '../collection/collection'
        })
      },
      fail: function (err) { },
      complete: function () { }
    });
    this.setData({
      hidden: true
    })
  },
  cancel: function () {
    this.setData({
      hidden: true
    })
  }
})
  function changeresult(mmn) {
    for (var i = 0; i < mmn.length; i++) {
      if (mmn[i].isEnd==true) {
        mmn[i].isEnd = "完本";
      } else {
        mmn[i].isEnd = "连载中";
      }
      if(mmn[i].name.length>4){
        mmn[i].size="14px";
      } else if (mmn[i].name.length > 4){
        mmn[i].size="12px";
      }else{
        mmn[i].size="16px";
      }
    }
    return mmn;
  }