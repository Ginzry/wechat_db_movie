// pages/cinema/cinema.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1,
    c: [{
      name: "新世纪电影院",
      dis: "1.25"
    }, {
      name: "大地影院",
      dis: "2.3"
    }, {
      name: "乐天影院",
      dis: "3.1"
    }, {
      name: "17.5影院",
      dis: "4.2"
    }, {
      name: "横店电影城",
      dis: "4.9"
    }, {
      name: "万达影院",
      dis: "6.2"
    }],
    capacity: 0, //初始容量为0;
    recent: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  // 页面跳转
  switchNav: function(e) {
    var id = e.currentTarget.id;
    this.setData({
      currentTab: id
    });
    if (id == 0) {
      wx.redirectTo({
        url: '/pages/movie/movie',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },

  // 选中
  select: function(e) {
    var id = e.currentTarget.id;
    console.log(id);
    var tmp_capacity = this.data.capacity;
    var tmp_recent = this.data.recent;
    var tmp_c = this.data.c;

    var flag = false;
    var tmp_cir = tmp_capacity - 1;
    while (tmp_cir >= 0) {
      if (tmp_recent[tmp_cir] == tmp_c[id]) {
        flag = true;
      }
      tmp_cir--;
    }

    if (flag == false) {
      if (tmp_capacity == 3) {
        tmp_recent[2] = tmp_recent[1];
        tmp_recent[1] = tmp_recent[0];
        tmp_recent[0] = tmp_c[id];
      } else if (tmp_capacity == 0) {
        tmp_recent[0] = tmp_c[id];
        tmp_capacity++;
      } else {
        var tmp = tmp_capacity;
        while (tmp > 0) {
          tmp_recent[tmp] = tmp_recent[tmp - 1];
          tmp--;
        }
        tmp_recent[tmp] = tmp_c[id];
        tmp_capacity++;
      }
      
      this.setData({
        capacity: tmp_capacity
      });
      this.setData({
        recent: tmp_recent
      });
    }
    console.log(tmp_capacity);
    console.log(tmp_c);
    console.log(tmp_recent);
    
  }
})