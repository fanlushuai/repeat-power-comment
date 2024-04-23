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

    // toast("手动点击")
    // AutojsUtil.s(10, 10)

    Douyin.closeFitlerTab();
    Douyin.video();
    Douyin.getBlankClickXY()
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

    if (keywordsArr.length < 1) {
      toast("请输入关键字")
      return
    }

    if (Config.autoInDouyin) {
      log("第一次，重启抖音")
      AutojsUtil.reloadApp(Douyin.name);
    } else {
      log("请手动切换到抖音，主页面")
      toast("请手动切换到抖音，主页面")
      desc("搜索").visibleToUser(true).waitFor()
      text("关注").visibleToUser(true).waitFor()
      log("已进入抖音")
      toast("已进入抖音")
      AutojsUtil.s(1.5, 1.5)
    }

    this.intoLocation();

    // 第一次重启，后面，都从界面内切换
    let hasPassFirst = false

    if (keywordsArr.indexOf(lastTimeKeyword) > -1) {
      log("断点续搞");
      let arriveLastKeyword = false;
      for (let keyword of keywordsArr) {

        if (LocalStorage.localStorage().get("stopChild") == true) {
          log("内存通知，停止咯")
          AutojsUtil.childStop()
          exit()
        }

        if (arriveLastKeyword) {
          log("开始关键词");

          log("%s", keyword);

          if (hasPassFirst) {
            log("从视频入口搜索")
            Douyin.clickSearchInVedio()
          }

          this.task(keyword, Config.commentCountLimit);
          hasPassFirst = true

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

        if (LocalStorage.localStorage().get("stopChild") == true) {
          log("内存通知，停止咯")
          AutojsUtil.childStop()
          exit()
        }


        log("开始关键词");
        log("%s", keyword);
        if (hasPassFirst) {
          log("从视频入口搜索")
          Douyin.clickSearchInVedio()
        }

        this.task(keyword, Config.commentCountLimit);
        hasPassFirst = true

      }
    }

    toastLog("机器人任务完成")
  },
  task: function (keyword, commentCountLimit) {
    LocalStorage.setThisTimeKeyword(keyword, commentCountLimit);

    this.intoVedioBySearch(keyword);
    AutojsUtil.s(2, 3);

    let tryCount = 0;
    let hotComment
    let useComment = Config.useComment;
    if (useComment != null && useComment != "") {
      log("使用指定评论 %s", useComment);
      hotComment = useComment;
    } else {
      log("抓取第一条视频热评")
      hotComment = this.getHotComment();
      AutojsUtil.s(3, 5);

      log("下一条")
      AutojsUtil.pageDownBySwipe();
    }

    let commentWithoutEmoCount = 0
    while (1) {
      if (LocalStorage.localStorage().get("stopChild") == true) {
        log("内存通知，停止咯")
        AutojsUtil.childStop()
        exit()
      }

      AutojsUtil.s(8, 15);

      commentWithoutEmoCount++
      if (commentWithoutEmoCount > Config.commentWithoutEmoCountLimit) {
        let newHotComment = genComment(hotComment);
        this.comment(newHotComment);
      } else {
        this.comment(hotComment);
      }

      tryCount++;
      log("已评 %d 次", tryCount);
      if (tryCount == commentCountLimit) {
        log("达到评论限制数 %d", commentCountLimit);
        log("结束本关键词 %s", keyword);
        break;
      }

      AutojsUtil.s(3, 5);
      log("---> 下一个");
      AutojsUtil.pageDownBySwipe();
    }
  },
};

module.exports = {
  Robot,
};
