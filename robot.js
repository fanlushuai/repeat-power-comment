const { AutojsUtil } = require("./autojsUtil.js");
const { genComment } = require("./commentGen.js");
const { Config } = require("./config.js");
const { Douyin } = require("./douyin.js");
const { KS } = require("./ks.js");
const { LocalStorage } = require("./localStorage.js");

const Robot = {
  // reinit: function () {
  //   AutojsUtil.reloadApp(this.targetApp.name);
  //   AutojsUtil.execScriptFile("./scriptTask.js", { delay: 5000 });
  //   AutojsUtil.stopCurrentScriptEngine();
  // },
  targetApp: null,
  intoLocation: function () {
    this.targetApp.intoSearch();
  },
  intoVedioBySearch: function (keyWord) {
    // keyWord = "哈雷的移动城堡"
    this.targetApp.inputKeyWord(keyWord);

    this.targetApp.search();
    // this.targetApp.zongheTab();
    this.targetApp.filterTab();
    this.targetApp.filterMostStar();

    // toast("手动点击")
    // AutojsUtil.s(10, 10)

    this.targetApp.closeFitlerTab();
    this.targetApp.video();

    // 提前获取，空白坐标。
    this.targetApp.getBlankCloseXY()
  },
  getHotComment: function () {
    this.targetApp.commentTab();
    let hotComment = this.targetApp.getHotComment();
    this.targetApp.closeCommentTab();
    return hotComment;
  },
  comment: function (comment) {
    this.targetApp.commentTab();
    this.targetApp.comment(comment);
    this.targetApp.closeCommentTab();
  },
  start: function () {
    log("机器人启动 %s", this.targetApp.name);

    let keywordsArr;
    if (Config.keywords) {
      let regex = /，/gi;
      keywordsArr = Config.keywords.trim().replace(regex, ",").split(",");
    }

    if (keywordsArr == null) {
      log("请配置关键字");
      AutojsUtil.childStop()
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
    let lastTimeKeyword = LocalStorage.getLastTimeKeyword(this.targetApp.name,
      Config.commentCountLimit
    );

    if (keywordsArr.length < 1) {
      toast("请输入关键字")
      return
    }
    log("第一xx次，重启%s ", this.targetApp.name)



    // 只有第一次boot，为手动，才会手动。不然全部都是自动
    if (LocalStorage.getBootTimes() == 1 && !Config.autoInTargetApp) {
      log("请手动切换到%s，主页面", this.targetApp.name)
      toast("请手动切换到%s，主页面", this.targetApp.name)
      desc("搜索").visibleToUser(true).waitFor()
      text("关注").visibleToUser(true).waitFor()
      log("已进入%s", this.targetApp.name)
      toast("已进入%s", this.targetApp.name)
      AutojsUtil.s(1.5, 1.5)

    } else {
      log("重启%s ", this.targetApp.name)
      AutojsUtil.reloadApp(this.targetApp.name);
    }

    this.intoLocation();

    // 第一次重启，后面，都从界面内切换
    let hasPassFirst = false

    if (keywordsArr.indexOf(lastTimeKeyword) > -1) {
      log("断点续搞");
      let arriveLastKeyword = false;
      for (let keyword of keywordsArr) {

        if (arriveLastKeyword) {
          log("开始关键词");

          log("%s", keyword);

          if (hasPassFirst) {
            log("从视频入口搜索")
            this.targetApp.clickSearchInVedio()
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
        log("开始关键词");
        log("%s", keyword);
        if (hasPassFirst) {
          log("从视频入口搜索")
          this.targetApp.clickSearchInVedio()
        }

        this.task(keyword, Config.commentCountLimit);
        hasPassFirst = true

      }
    }

    toastLog('机器人 ' + this.targetApp.name + ' 任务完成')
  },
  task: function (keyword, commentCountLimit) {
    LocalStorage.setThisTimeKeyword(this.targetApp.name, keyword, commentCountLimit);

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
