const { AutojsUtil } = require("./autojsUtil.js");
const { genComment } = require("./commentGen.js");
const { Config } = require("./config.js");
const { Douyin } = require("./douyin.js");
const { LocalStorage } = require("./localStorage.js");

const Robot = {
  reinit: function () {
    AutojsUtil.reloadApp(Douyin.name);
    AutojsUtil.execScriptFile("./scriptTask.js", { delay: 5000 });
    AutojsUtil.stopCurrentScriptEngine();
  },
  intoLocation: function () {
    Douyin.intoSearch();
  },
  intoVedioBySearch: function (keyWord) {
    // keyWord = "哈雷的移动城堡"
    Douyin.inputKeyWord(keyWord);

    Douyin.search();
    Douyin.zongheTab();
    Douyin.filterTab();
    Douyin.filterMostStar();
    Douyin.closeFitlerTab();
    Douyin.video();
  },
  getHotComment: function () {
    Douyin.commentTab();
    let hotComment = Douyin.getHotComment();
    Douyin.closeCommentTab();
    return hotComment;
  },
  comment: function (comment) {
    Douyin.commentTab();
    Douyin.comment(comment);
    Douyin.closeCommentTab();
  },
  start: function () {
    log("机器人启动");

    let keywordsArr;
    if (Config.keywords) {
      let regex = /，/gi;
      keywordsArr = Config.keywords.trim().replace(regex, ",").split(",");
    }

    if (keywordsArr == null) {
      log("请配置关键字");
      return;
    }

    function unique(arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i] === arr[j]) {
            arr.splice(j, 1);
            j--;
          }
        }
      }
      return arr;
    }

    keywordsArr = unique(keywordsArr);

    log("关键词列表 %j", keywordsArr);
    let lastTimeKeyword = LocalStorage.getLastTimeKeyword(
      Config.commentCountLimit
    );
    if (keywordsArr.indexOf(lastTimeKeyword) > -1) {
      log("断点续搞");
      let arriveLastKeyword = false;
      for (let keyword of keywordsArr) {
        if (arriveLastKeyword) {
          log("开始关键词");

          log("%s", keyword);
          AutojsUtil.reloadApp(Douyin.name);
          this.intoLocation();
          this.task(keyword, Config.commentCountLimit);
        } else {
          if (lastTimeKeyword == keyword) {
            arriveLastKeyword = true;
          } else {
            log("跳过关键字 %s", keyword);
            continue;
          }
        }
      }
    } else {
      for (let keyword of keywordsArr) {
        log("开始关键词");
        log("%s", keyword);
        AutojsUtil.reloadApp(Douyin.name);
        this.intoLocation();
        this.task(keyword, Config.commentCountLimit);
      }
    }
  },
  task: function (keyword, commentCountLimit) {
    LocalStorage.setThisTimeKeyword(keyword, commentCountLimit);

    this.intoVedioBySearch(keyword);
    AutojsUtil.s(2, 3);
    let hotComment = this.getHotComment();

    let tryCount = 0;

    if (useComment != null && useComment != "") {
      log("使用指定评论 %s", useComment);
      hotComment = useComment;
    }

    while (1) {
      AutojsUtil.s(3, 5);

      AutojsUtil.pageDownBySwipe();
      log("---> 下一个");
      AutojsUtil.s(8, 15);
      let newHotComment = genComment(hotComment);
      this.comment(newHotComment);
      tryCount++;
      log("已评 %d 次", tryCount);
      if (tryCount == commentCountLimit) {
        log("达到评论限制数 %d", commentCountLimit);
        log("结束本关键词 %s", keyword);
        break;
      }
    }
  },
};

module.exports = {
  Robot,
};
