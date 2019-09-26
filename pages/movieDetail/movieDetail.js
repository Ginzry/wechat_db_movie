var util = require('../../utils/util.js')
var count=0;
Page({
  data: {
    textarea: "",
    maxTextLen: 200,
    // 默认长度
    textLen: 0,
    item_id: 0,
    discussShow: [],
    user: "",
    popTop: 0, //弹出点赞评论框的位置
    popWidth: 0, //弹出框宽度
    isShow: true, //判断是否显示弹出框
    item_data: [],
    keys: [],
    currentTab: 0,
    winWidth: 0,
    winHeight: 0,
    movie: {},
    popular_reviews:[],
    directors: [],
    answer:[],
    casts: [], 
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../images/cc-star-o.png',
    selectedSrc: '../../images/cc-star.png',
    halfSrc: '../../images/cc-star-half.png',
    key: 0,//评分
  },
  onLoad: function (e) {
    var page = this;
    var key = "0df993c66c0c636e29ecbb5344252a4a";
    wx.request({
      url: 'https://api.douban.com/v2/movie/subject/' + e.id + '?apikey=' + key, header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res);
        var movie = res.data;
        page.setData({ movie: movie });
        page.setData({ directors: movie.directors });
        page.setData({ casts: movie.casts,popular_reviews:movie.popular_comments });
        wx.setNavigationBarTitle({
          title: movie.title
        })
      }
    });
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        page.setData({ winWidth: res.windowWidth });
        page.setData({ winHeight: res.windowHeight });
      }
    });
  },
  switchNav: function (e) {
    var id = e.currentTarget.id;
    this.setData({ currentTab: id });
  },
  selectLeft: function (e) {
    var key = e.currentTarget.dataset.key
    if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
      //只有一颗星的时候,再次点击,变为0颗
      key = 0;
    }
    count = key
    this.setData({
      key: key
    })

  },
  //点击右边,整颗星
  selectRight: function (e) {
    var key = e.currentTarget.dataset.key
    count = key
    this.setData({
      key: key
    })
  },
  TouchDiscuss: function (e) {
    // this.data.isShow = !this.data.isShow
    // 动画
    var that = this
    var dis = this.data.discussShow
    var index = 0
    console.log(that.data.discussShow)
    var index = parseInt(e.currentTarget.dataset["index"])
    dis[index] = true
    that.setData({
      discussShow: dis
    })

  },
  startRating: function (e) {
    wx.showModal({
      title: '分数',
      content: "" + count,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  getWords(e) {
    let page = this;
    // 设置最大字符串长度(为-1时,则不限制)
    let maxTextLen = page.data.maxTextLen;
    // 文本长度
    let textLen = e.detail.value.length;
    page.setData({
      maxTextLen: maxTextLen,
      textLen: textLen,
      textarea: e.detail.value
    });

  },
  submitData: function (e) {
    let date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    var param = {}
    if (this.data.item_id > -1) {
      param.item_id = this.data.item_id
    } else {
      param.item_id = ""
    }
    param.answer = []
    param.question = this.data.textarea
    param.time = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo //用户基本信息
        param.user = userInfo.nickName

      }
    })
    if (this.data.textarea.length > 0) {
      this.setData({textarea:""});
      wx.showToast({
        title: '评论成功'
      })
    } else {
      wx.showToast({
        title: '评论内容为空'
      })
    }
  }
})