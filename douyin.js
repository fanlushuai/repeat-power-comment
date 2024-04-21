const { AutojsUtil } = require("./autojsUtil");
const { LocalStorage } = require("./localStorage");

const Douyin = {
  name: "抖音",
  boot: function () {
    log("启动抖音");
    app.launchApp(this.name);
    // 跳过广告
    desc("跳过").findOne(3000);
  },
  intoSearch: function () {
    AutojsUtil.clickSelectorWithAutoRefresh(
      id("com.ss.android.ugc.aweme:id/kb7").visibleToUser(true),
      "搜索tab",
      8,
      this.name
    );
  },
  inputKeyWord: function (keyWord) {
    let ele = AutojsUtil.getEleBySelectorWithAutoRefresh(
      id("et_search_kw").visibleToUser(true),
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
      id("com.ss.android.ugc.aweme:id/g6t").visibleToUser(true),
      "筛选",
      8,
      this.name
    );
    sleep(1000);
  },
  zongheTab: function () {
    AutojsUtil.clickSelectorWithAutoRefresh(
      id("com.ss.android.ugc.aweme:id/tg8").visibleToUser(true),
      "综合",
      8,
      this.name
    );
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
    LocalStorage.setConsoleMinY(consoleY);
  },
  search: function () {
    AutojsUtil.clickSelectorWithAutoRefresh(
      id("com.ss.android.ugc.aweme:id/yqq").visibleToUser(true),
      "搜索",
      8,
      this.name
    );
  },
  waitResult: function () {
    id("com.ss.android.ugc.aweme:id/y6g").waitFor();
  },
  closeFitlerTab: function () {
    log("关闭过滤");
    AutojsUtil.clickSelectorWithAutoRefresh(
      id("com.ss.android.ugc.aweme:id/tg8").visibleToUser(true),
      "综合",
      8,
      this.name
    );
  },
  play: function () {
    id("com.ss.android.ugc.aweme:id/lug");
  },
  video: function () {
    // 多图，和视频，都可以
    AutojsUtil.clickSelectorWithAutoRefresh(
      id("com.ss.android.ugc.aweme:id/ly1").visibleToUser(true),
      "视频",
      8,
      this.name
    );
  },
  commentTab: function () {
    let ele = AutojsUtil.getEleBySelectorWithAutoRefresh(
      id("com.ss.android.ugc.aweme:id/dc4").visibleToUser(true),
      "评论tab",
      8,
      this.name
    );

    let consoleMaxY = ele.bounds().top - 60;

    LocalStorage.setConsoleMaxY(consoleMaxY);

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
    return hotComment;
  },
  comment: function (comment) {
    // EditText
    AutojsUtil.clickSelectorWithAutoRefresh(
      id("com.ss.android.ugc.aweme:id/dbx"),
      "评论框",
      8,
      this.name
    );
    sleep(800);
    let ele = AutojsUtil.getEleBySelectorWithAutoRefresh(
      id("com.ss.android.ugc.aweme:id/dbx").visibleToUser(true),
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
    LocalStorage.setConsoleMaxY(consoleMaxY);

    log("点 %s", "发送");
    sleep(400);
    AutojsUtil.clickEle(ele);
    // text('发送')
    // text('善语结善缘，恶言伤人心')
  },
  closeCommentTab: function () {
    // let ele = AutojsUtil.getEleBySelectorWithAutoRefresh(desc("关闭"), "关闭", 8, this.name)
    // AutojsUtil.press(ele)

    log("关闭评论Tab");
    let b = {
      left: 100,
      right: device.width - 100,
      top: device.height / 6,
      bottom: device.height / 5,
    };
    AutojsUtil.pressBounds(b);
    AutojsUtil.s13();

    // 查看评论右侧图标
    let ele = id("com.ss.android.ugc.aweme:id/dc4")
      .visibleToUser(true)
      .findOnce();

    if (ele) {
      // 点击两次，防止失败
      AutojsUtil.pressBounds(b);
    }
  },
};

// Douyin.boot()
// Douyin.intoSearch()
// Douyin.inputKeyWord("xxxx")
// Douyin.search()

// Douyin.filterMostStar()
// Douyin.zongheTab()
// Douyin.waitResult()

// Douyin.video()
// Douyin.commentTab()

// Douyin.getHotComment()

// Douyin.commentIt("haha")
// Douyin.commentIt("haha")
// Douyin.closeComment()

module.exports = { Douyin };
