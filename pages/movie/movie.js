var util = require('../../utils/util.js')
Page({
  data: {
    currentTab: 0,
    winWidth: 0,
    winHeight: 0,
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    imgUrls: [
      "images/hb1.jpg",
      "images/hb2.jpg",
      "images/hb3.jpg",
    ],
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
  onLoad: function (e) {
    var page = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        page.setData({ winWidth: res.windowWidth });
        page.setData({ winHeight: res.windowHeight });
      }
    });
    this.loadMovies();
  },
  switchNav: function (e) {
    var id = e.currentTarget.id;
    this.setData({ currentTab: id });
  },

  have1: function () {
    wx.navigateTo({
      url: '../have1/have1',
      success: function (res) {
        console.log(res);
      },
      fail: function () {
        //fail
      },
      complete: function () {
        //complete
      }
    })
  },

  have2: function () {
    wx.navigateTo({
      url: '../have2/have2',
      success: function (res) {
        console.log(res);
      },
      fail: function () {
        //fail
      },
      complete: function () {
        //complete
      }
    })
  },

  change: function () {
    wx.navigateTo({
      url: '../change/change',
      success: function (res) {
        console.log(res);
      },
      fail: function () {
        //fail
      },
      complete: function () {
        //complete
      }
    })
  },


  loadMovies: function () {
    var page = this;
    var key = "0df993c66c0c636e29ecbb5344252a4a";
    wx.request({
      url: 'https://api.douban.com/v2/movie/nowplaying?apikey=' + key, method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res);
        var subjects = res.data.entries;
        console.log(subjects)
        var size = subjects.length;//电影总数量
        var len = parseInt(size / 3);//每行放置3个电影，计算出需要多少行
        console.log(len);
        console.log(subjects);
        page.setData({ movies: subjects });
        page.setData({ winHeight: (len + 1) * 230 });//动态的设置电影内容的高度
      }
    })
  },
  loadDetail: function (e) {
    var id = e.currentTarget.id;
    console.log(id)
    wx.navigateTo({
      url: '../movieDetail/movieDetail?id=' + id
    })
  },
  // 选中
  select: function (e) {
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