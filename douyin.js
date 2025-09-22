const { AutojsUtil } = require("./autojsUtil");
const { LocalStorage } = require("./localStorage");

let blankClickXY = null;

const Douyin = {
  name: "抖音",
  boot: function () {
    log("启动抖音");
    app.launchApp(this.name);
    // 跳过广告
    desc("跳过").findOne(3000);
  },
  waitForInitLocation: function () {
    desc("搜索").visibleToUser(true).waitFor();
    text("关注").visibleToUser(true).waitFor();
    log("已进入%s", this.name);
    toast("已进入%s", this.name);
    AutojsUtil.s(1.5, 1.5);
  },
  intoSearch: function () {
    AutojsUtil.clickSelectorWithAutoRefresh(
      // id("com.ss.android.ugc.aweme:id/kb7").visibleToUser(true),
      desc("搜索").visibleToUser(true),
      "搜索tab",
      8,
      this.name
    );
  },
  inputKeyWord: function (keyWord) {
    let ele = AutojsUtil.getEleBySelectorWithAutoRefresh(
      className("EditText").id("et_search_kw"),
      "搜索输入框",
      8,
      this.name
    );
    if (ele) {
      log("输入关键字 %s", keyWord);
      ele.setText(keyWord);
    }
  },
  filterTab: function () {



    AutojsUtil.clickSelectorWithAutoRefresh(
      desc("筛选，按钮").visibleToUser(true),
      "筛选",
      8,
      this.name
    );

    // // todo 如果未来不稳定，可以换imageviwe方式，加上坐标来同时过滤。
    // sleep(600); //开始之前，确保，这个位置加载出来了
    // // 使用特殊算法，来兼容过滤的图标问题。直接使用id，有内存问题。
    // // let b = text("综合").visibleToUser(true).findOne().parent().bounds()

    // // let x = device.width - b.left - 2
    // // let y = b.top + parseInt((b.bottom - b.top) / 2)

    // // AutojsUtil.pressXY(x, y)

    // sleep(500);
    // let imageEles = className("ImageView").find();
    // log(imageEles.size());
    // let eles = AutojsUtil.filterEles(
    //   imageEles,
    //   (device.width * 3) / 4,
    //   0,
    //   device.width,
    //   device.height / 4
    // );
    // log(eles.length);

    // if (eles.length > 0) {
    //   let b = eles[0].bounds();
    //   press(b.centerX(), b.centerY(), 1);
    // }

    sleep(1000);
  },
  _zongheTab: function () {
    AutojsUtil.clickSelectorWithAutoRefresh(
      text("视频").visibleToUser(true),
      // id("com.ss.android.ugc.aweme:id/tg8").visibleToUser(true),
      "视频",
      8,
      this.name
    );
  },
  filterRecent: function () {
    let t = AutojsUtil.clickTextByOCR(
      "最新发布",
      0,
      0,
      device.width,
      device.height / 2
    );

        // 用来关闭过滤界面
    sleep(1500);
    Douyin._zongheTab()
  },
  filterMostStar: function () {
    let t = AutojsUtil.clickTextByOCR(
      "最多点赞",
      0,
      0,
      device.width,
      device.height / 2
    );

    let consoleY = t.bounds.bottom + 60;
    LocalStorage.setConsoleMinY(consoleY, this.name);

    // 用来关闭过滤界面
    sleep(1500);
    Douyin._zongheTab()
  },
  search: function () {
    log("dsdd")
    AutojsUtil.clickSelectorWithAutoRefresh(
      // id("com.ss.android.ugc.aweme:id/yqq").visibleToUser(true),
      desc("搜索").visibleToUser(true),
      "搜索",
      8,
      this.name
    );

    log("等待搜索结果加载完成...");

    while (text("视频").findOnce() == null) {
      sleep(500)
    }

    AutojsUtil.clickSelectorWithAutoRefresh(
      text("视频").visibleToUser(true),
      "视频",
      8,
      this.name
    );

    let xx = text("综合").findOnce()
    let min = xx.bounds().bottom + 500
    let waitLoad = true
    while (waitLoad) {

      let eles = find()

      for (let ele of eles) {
        if (ele.text() != null && ele.text() != "" && ele.bounds().top > min) {
          log("加载完成...")
          waitLoad = false
          break
        }
      }
      if (waitLoad) {
        sleep(1000)
      }
    }
  },
  // waitResult: function () {
  //   id("com.ss.android.ugc.aweme:id/y6g").waitFor();
  // },
  closeFitlerTab: function () {
    log("关闭过滤");
    this._zongheTab();
  },
  // play: function () {
  //   id("com.ss.android.ugc.aweme:id/lug");
  // },
  video: function () {
    // 多图，和视频，都可以
    // AutojsUtil.clickSelectorWithAutoRefresh(
    //   // textMatches(/(点赞较多|点赞飙升)/).visibleToUser(true),
    //   text("视频").visibleToUser(true),
    //   // id("com.ss.android.ugc.aweme:id/ly1").visibleToUser(true),
    //   "视频1",
    //   8,
    //   this.name
    // );

    log("加载中...")
    while(descEndsWith("，按钮").visibleToUser(true).findOnce()==null){
      sleep(1000)
    }

    let e=descEndsWith("，按钮").visibleToUser(true).clickable().find()
    // log(e[i].desc())

    let t=e[1].desc().replace("已点赞，喜欢","").replace("未点赞，喜欢","").replace("，按钮","")
    log(t)
    // e[1].parent().click()
    let ee=text(t).findOne()
    click(ee.bounds().centerX()-device.width/4,ee.bounds().centerY())
    sleep(1000)
  },
  commentTab: function () {
    let ele = AutojsUtil.getEleBySelectorWithAutoRefresh(
      descMatches(/评论.*按钮/).visibleToUser(true),
      "评论tab",
      8,
      this.name
    );

    let consoleMaxY = ele.bounds().top - 60;

    LocalStorage.setConsoleMaxY(consoleMaxY, this.name);

    log("点 %s", "评论tab");
    sleep(400);
    AutojsUtil.clickEle(ele);

    AutojsUtil.s(2, 3);
  },
  getHotComment: function () {
    let contents = id("com.ss.android.ugc.aweme:id/content")
      .visibleToUser(true)
      .find();
    // log(contents)

    let hotComment = "";
    let firstCommentEle = contents[0];
    let firstComment = firstCommentEle.text();

    // log(firstComment.indexOf("置顶"))
    // log(firstComment.length - 2)
    let commentLeftPostion = 0;
    if (firstComment.indexOf("置顶") == firstComment.length - 2) {
      log("第一条为置顶评论");

      commentLeftPostion = firstCommentEle.bounds().left;

      for (let c of contents) {
        if (c.bounds().left != commentLeftPostion) {
          continue;
        }

        let comment = c.text();
        if (comment.indexOf("置顶") == comment.length - 2) {
          continue;
        }

        hotComment = comment;

        break;
      }
    } else {
      hotComment = firstComment;
    }

    log("热评->%s", hotComment);
    toastLog(hotComment);
    sleep(2000);
    return hotComment;
  },
  comment: function (comment) {
    // EditText
    AutojsUtil.clickSelectorWithAutoRefresh(
      // id("com.ss.android.ugc.aweme:id/dbx")
      // text("善语结善缘，恶言伤人心").className("EditText").visibleToUser(true),
      className("EditText").visibleToUser(true),
      "评论框",
      8,
      this.name
    );
    sleep(800);
    let ele = AutojsUtil.getEleBySelectorWithAutoRefresh(
      // id("com.ss.android.ugc.aweme:id/dbx").visibleToUser(true),
      // text("善语结善缘，恶言伤人心").className("EditText").visibleToUser(true),
      className("EditText").visibleToUser(true),
      "评论框",

      8,
      this.name
    );
    if (ele) {
      log("设置内容 %s", comment);
      ele.setText(comment);
    }

    sleep(random(1, 4) * 1000);

    ele = AutojsUtil.getEleBySelectorWithAutoRefresh(
      text("发送").visibleToUser(true),
      "发送",
      8,
      this.name
    );

    let consoleMaxY = ele.bounds().top - 60;
    LocalStorage.setConsoleMaxY(consoleMaxY, this.name);

    log("点 %s", "发送");
    sleep(400);
    AutojsUtil.clickEle(ele);
    // text('发送')
    // text('善语结善缘，恶言伤人心')
  },
  clickSearchInVedio: function () {
    ele = AutojsUtil.clickSelectorWithAutoRefresh(
      text("搜索").visibleToUser(true),
      "搜索",
      8,
      this.name
    );
  },
  getBlankCloseXY: function () {
    this._getBlankClickXY();
  },
  _getBlankClickXY: function () {
    if (blankClickXY != null) {
      return blankClickXY;
    }

    let ele = text("搜索").findOne();
    let b = ele.bounds();
    blankClickXY = { x: device.width / 2, y: b.bottom + 100 };
    log("找到关闭坐标 %j", blankClickXY);

    return blankClickXY;
  },
  closeCommentTab: function () {
    Douyin.closeCommentTab1()


    // log("关闭评论Tab");
    // let xy = this._getBlankClickXY();
    // AutojsUtil.pressXY(xy.x, xy.y);
    // AutojsUtil.s13();

    // // 查看评论右侧图标

    // let ele = text("搜索").visibleToUser(true).findOnce();

    // if (ele == null) {
    //   // 点击两次，防止失败
    //   AutojsUtil.pressXY(xy.x, xy.y);
    // }
  },
  closeCommentTab1: function () {
    AutojsUtil.clickSelectorWithAutoRefresh(id("com.ss.android.ugc.aweme:id/back_btn").visibleToUser(true), "关闭", 8, this.name)
  }
};

// Douyin.boot()
// Douyin.intoSearch()
// Douyin.inputKeyWord("xxxx")
// log("dfsdfd")
// Douyin.search()

// Douyin.filterTab()
// Douyin.filterMostStar()


// Douyin._zongheTab()

// Douyin.video()
// Douyin.commentTab()

// Douyin.getHotComment()

// Douyin.comment("haha")
// Douyin.closeCommentTab1()

module.exports = { Douyin };
