const { AutojsUtil } = require("./autojsUtil");
const { LocalStorage } = require("./localStorage");

const KS = {
  name: "快手",
  intoSearch: function () {
    const ksActive = {
      tabFind: () => {
        app.startActivity({
          action: "android.intent.action.VIEW",
          data: "kwai://home/hot",
          packageName: "com.smile.gifmaker",
        });
      },
    };

    sleep(2000);
    ksActive.tabFind();

    log("搜索tab");
    AutojsUtil.clickSelectorWithAutoRefresh(
      id("com.smile.gifmaker:id/search_btn").visibleToUser(true),
      "搜索tab",
      8,
      this.name
    );
  },
  inputKeyWord: function (keyWord) {
    let ele = AutojsUtil.getEleBySelectorWithAutoRefresh(
      id("com.smile.gifmaker:id/editor").visibleToUser(true),
      "搜索输入框",
      8,
      this.name
    );
    if (ele) {
      log("输入关键字 %s", keyWord);
      ele.setText(keyWord);
    }
  },
  search: function () {
    AutojsUtil.clickSelectorWithAutoRefresh(
      id("com.smile.gifmaker:id/right_button").visibleToUser(true),
      "搜索",
      8,
      this.name
    );

    log("等待搜索结果");
    while (1) {
      let e = id("com.smile.gifmaker:id/nick_name")
        .visibleToUser(true)
        .findOne(3000);
      if (e != null) {
        log("出现结果");
        break;
      }
      AutojsUtil.refreshUI(this.name);
    }
  },
  filterTab: function () {
    log("筛选tab");
    sleep(800);
    let ele = AutojsUtil.getEleBySelectorWithAutoRefresh(
      id("com.smile.gifmaker:id/tab_filter_image").visibleToUser(true),
      "筛选tab",
      8,
      this.name
    );

    if (!ele) {
      return;
    }

    let minY = ele.bounds().bottom;
    LocalStorage.setConsoleMinY(minY, this.name);

    log("点击筛选tab");
    AutojsUtil.clickEle(ele);
  },
  filterMostStar: function () {
    let ele = AutojsUtil.getEleBySelectorWithAutoRefresh(
      text("点赞最多").visibleToUser(true),
      "筛选most star",
      8,
      this.name
    );

    if (!ele) {
      return;
    }

    let maxY = ele.bounds().bottom;
    LocalStorage.setConsoleMaxY(maxY, this.name);

    log("点击most star");
    AutojsUtil.clickEle(ele);
  },
  closeFitlerTab: function () {
    log("关闭过滤");
    AutojsUtil.clickSelectorWithAutoRefresh(
      id("com.smile.gifmaker:id/confirm_btn").visibleToUser(true),
      "确定",
      8,
      this.name
    );
  },
  video: function () {
    AutojsUtil.clickSelectorWithAutoRefresh(
      id("com.smile.gifmaker:id/subject_op_title_newfeed").visibleToUser(true),
      "进视频",
      8,
      this.name
    );
  },
  commentTab: function () {
    AutojsUtil.clickSelectorWithAutoRefresh(
      id("com.smile.gifmaker:id/comment_icon").visibleToUser(true),
      "评论Tab",
      8,
      this.name
    );
  },
  getHotComment: function () {
    // 置顶不好处理，
    // 作者也不好排除
    // 那么使用点赞量，来决定，哪个评论更有价值
    id("com.smile.gifmaker:id/tv_like_count").visibleToUser(true).waitFor();
    let likeEls = id("com.smile.gifmaker:id/tv_like_count").find();
    let maxCountLikeEle;
    let maxCount = 0;
    for (let e of likeEls) {
      if (parseInt(e.getText()) > maxCount) {
        maxCount = parseInt(e.getText());
        maxCountLikeEle = e;
      }
    }

    let hotComment = maxCountLikeEle
      .parent()
      .parent()
      .parent()
      .findOne(id("com.smile.gifmaker:id/comment"))
      .getText();
    log("热评->", hotComment);
    return hotComment;
  },
  closeCommentTab: function () {
    AutojsUtil.clickSelectorWithAutoRefresh(
      id("com.smile.gifmaker:id/tabs_panel_close").visibleToUser(true),
      "关闭评论Tab",
      8,
      this.name
    );
  },
  comment: function (comment) {
    AutojsUtil.clickSelectorWithAutoRefresh(
      id("com.smile.gifmaker:id/editor_holder_text").visibleToUser(true),
      "点击评论框",
      8,
      this.name
    );

    let ele = AutojsUtil.getEleBySelectorWithAutoRefresh(
      id("com.smile.gifmaker:id/editor").visibleToUser(true),
      "评论输入框",
      8,
      this.name
    );

    log("设置评论 %s", comment);
    ele.setText(comment);

    sleep(500);

    AutojsUtil.clickSelectorWithAutoRefresh(
      id("com.smile.gifmaker:id/finish_button").visibleToUser(true),
      "发送",
      8,
      this.name
    );
  },
  clickSearchInVedio: function () {
    ele = AutojsUtil.clickSelectorWithAutoRefresh(
      id("com.smile.gifmaker:id/search_button").visibleToUser(true),
      "搜索",
      8,
      this.name
    );
  },
  getBlankCloseXY: function () {
    // 什么都不做，补充环境
    // 抖音的需要，快手的不要
  },
};
5;

// KS.intoSearch();
// KS.comment(KS.getHotComment())
// KS.filterTab();
// KS.filterMostStar();
// KS.intoVedio();
// KS.commentTab();
// KS.getHotComment();
// KS.closeCommentTab();
// KS.clickSearchInVedio();

module.exports = {
  KS,
};
