const { AutojsUtil } = require("./autojsUtil.js");
const { genComment } = require("./commentGen.js");
const { Config } = require("./config.js");
const { Douyin } = require("./douyin.js");

const Robot = {
  reinit: function () {
    AutojsUtil.reloadApp(Douyin.name)
    AutojsUtil.execScriptFile("./scriptTask.js", { delay: 5000 });
    AutojsUtil.stopCurrentScriptEngine();
  },
  intoLocation: function () {
    Douyin.intoSearch()
  },
  intoVedioBySearch: function (keyWord) {
    // keyWord = "哈雷的移动城堡"
    Douyin.inputKeyWord(keyWord)

    Douyin.search()
    Douyin.zongheTab()
    Douyin.filterTab()
    Douyin.filterMostStar()
    Douyin.closeFitlerTab()
    Douyin.video()
  },
  getHotComment: function () {
    Douyin.commentTab()
    let hotComment = Douyin.getHotComment()
    Douyin.closeCommentTab()
    return hotComment
  },
  comment: function (comment) {
    Douyin.commentTab()
    Douyin.comment(comment)
    Douyin.closeCommentTab()
  },
  start: function () {
    log("机器人启动")
    AutojsUtil.reloadApp(Douyin.name)

    this.intoLocation()
    let keyword = "喜羊羊与灰太狼"
    this.intoVedioBySearch(keyword)
    AutojsUtil.s(2, 3)
    let hotComment = this.getHotComment()
    while (1) {
      AutojsUtil.s(3, 5)

      AutojsUtil.pageDownBySwipe()
      log("---> 下一个")
      AutojsUtil.s(8, 15)
      let newHotComment = genComment(hotComment)
      this.comment(newHotComment)
    }
  }
};

Robot.start()
module.exports = {
  Robot,
};
