const { AutojsUtil } = require("./autojsUtil");
const { LocalStorage } = require("./localStorage");

const Tab = {
  waitInKs: function (location, timeout) {
    timeout = timeout || 5211314000; //默认一个超大值
    let startTime = currentTime();
    while (currentTime() - startTime < timeout) {
      sleep(1000);
      ele = this.findKsTab(location, 3000);
      // if (ele || currentPackage() == "com.smile.gifmaker") {  //这种可能包含广告
      if (ele) {
        log("已找到 %s", location);
        return true;
      }
    }
  },

  bootIntoTab: function (location) {
    AutojsUtil.setClipX("");

    let appName = "快手";
    AutojsUtil.reloadApp(appName);
    AutojsUtil.cleanInit(appName);

    console.log("等待进入 %s", appName);

    // while (currentPackage() != "com.smile.gifmaker") {
    //   sleep(2000);
    // }

    this.waitInKs("精选");

    // 判断有没有广告，直接跳过
    if (this.skipAD()) {
      sleep(500);
    }

    this.clickKsTab(location);

    if (location == "关注") {
      console.log("等待加载 关注");
      id("pymi_user_live_label").className("ImageView").waitFor();
    }
  },
  clickKsTab: function (tab) {
    t = ["关注", "发现", "同城", "直播"];
    if (t.indexOf(tab) > -1) {
      // 加强一下，有时候点击没反应
      while (1) {
        this.clickKsTab("首页");
        if (this.waitInKs("发现", 2000)) {
          break;
        }
      }
      //等一会吧
      sleep(500);
    }
    log("切tab %s", tab);
    ksTab = this.findKsTab(tab);
    // log(ksTab);
    sleep(1000); // 比较关键。立马去点击，可能点击不到。
    return AutojsUtil.clickEle(ksTab);
  },
  findKsTab: function (tab, timeout) {
    timeout = timeout || 5000;
    t = ["关注", "发现", "同城", "直播"];
    b = ["精选", "首页", "消息", "我"];
    if (t.indexOf(tab) > -1) {
      if (tab == "直播") {
        return desc(tab)
          .visibleToUser(true)
          .boundsInside(
            device.width / 2,
            0,
            device.width,
            device.height * (20 / 100)
          )
          .findOne(timeout);
      }

      return desc(tab)
        .visibleToUser(true)
        .boundsInside(0, 0, device.width, device.height * (20 / 100))
        .findOne(timeout);
    }

    if (b.indexOf(tab) > -1) {
      return desc(tab)
        .visibleToUser(true)
        .boundsInside(
          0,
          device.height * (70 / 100),
          device.width,
          device.height
        )
        .findOne(timeout);
    }
    log("desc 参数错误");
  },
  findOnceKsTab: function (tab) {
    t = ["关注", "发现", "同城", "直播"];
    b = ["精选", "首页", "消息", "我"];
    if (t.indexOf(tab) > -1) {
      return desc(tab)
        .visibleToUser(true)
        .boundsInside(0, 0, device.width, device.height * (20 / 100))
        .findOnce(); //只找一遍
    }

    if (b.indexOf(tab) > -1) {
      return desc(tab)
        .visibleToUser(true)
        .boundsInside(
          0,
          device.height * (70 / 100),
          device.width,
          device.height
        )
        .findOnce(); //只找一遍
    }
    log("desc 参数错误");
  },
  checkLocation: function (location) {
    t = ["关注", "发现", "同城", "直播"];
    b = ["精选", "首页", "消息", "我"];
    if (t.indexOf(location) > -1) {
      return desc(location)
        .visibleToUser(true)
        .boundsInside(0, 0, device.width, device.height * (20 / 100))
        .findOne(5000);
    }

    if (b.indexOf(location) > -1) {
      return desc(location)
        .visibleToUser(true)
        .boundsInside(
          0,
          device.height * (80 / 100),
          device.width,
          device.height
        )
        .findOne(5000);
    }
    log("desc 参数错误");
  },

  bootFromClip: function (text) {
    appName = "快手";

    console.log("杀掉,启动应用"); //todo 不一定要杀掉应用，可能切换到其他界面也行的。
    AutojsUtil.reloadApp(appName);
    AutojsUtil.cleanInit(appName);

    AutojsUtil.setClipX(text);

    console.log("等待 进入 %s", appName);
    while (currentPackage() != "com.smile.gifmaker") {
      sleep(1000);
    }

    console.log("等待 弹框 15s]");
    var ele = textMatches("[^的]*直播.*")
      .id("action")
      .clickable()
      .findOne(15000);
    // log(ele);

    if (!ele) {
      console.log("失败【未自动弹出】");
      return false;
    }
    log("xxx" + ele.text());
    if (ele.text().indexOf("暂未直播") > 0) {
      console.log("失败【暂停直播了】");
      return false;
    }

    sleep(1000);
    // log(ele);
    ele.click();
    sleep(300);
    //找不到之前的，说明跳转成功了
    var ele = textMatches("[^的]*直播.*").id("action").clickable().findOnce();
    return !ele;
  },
  // refresh: () => {
  //   AutojsUtil.clickImgWithCache(picConfigs.tab_shouye);
  // },
  testInto: function (location) {
    return this.findOnceKsTab(location) != null;
  },

  scrollDownAt: (location) => {
    var st = 3000;
    if ("关注" == location) {
      return () => {
        // id("recycler_view").scrollForward(); //牛逼
        // id("pymi_users_list").scrollForward() //用户直播列表
        //注意：使用findOne，可以加速滚动的速度。并且返回正确的返回值。
        let scrollEle = id("recycler_view").findOne(4000);
        if (scrollEle) {
          log("下滑 %s", scrollEle.scrollForward());
          sleep(1000);
        } else {
          console.log("下滑失败，组件未找到");
          log("下滑");
          AutojsUtil.pageDownBySwipe();
        }
      };
    } else if ("同城" == location) {
      return () => {
        // autoScrollDown([2, 3, 4, 1]);
        log("下滑");
        AutojsUtil.pageDownBySwipe();
        sleep(st);
      };
    } else if ("直播" == location) {
      return () => {
        // autoScrollDown([4, 1, 2, 3]);
        log("下滑");
        AutojsUtil.pageDownBySwipe();
        sleep(3000);
      };
    } else if ("发现" == location) {
      return () => {
        // autoScrollDown([1, 2, 3, 4]);
        log("下滑");
        AutojsUtil.pageDownBySwipe();
        sleep(st);
      };
    }
    console.warn("未找到滚动配置");
  },
  searchRedReward: () => {
    let r = AutojsUtil.searchImg(picConfigs.list_xiaohongbao); //此参数不稳定。
    return r;
  },
  skipAD: () => {
    if (AutojsUtil.clickIfFind(text("跳过"), 1500)) {
      log("跳过广告");
      return true;
    }
  },
};
const KS = {
  name: "快手",
  closePop: function () {
    let e = text("朋友推荐").findOne(20000);
    if (e != null) {
      log("关闭朋友推荐弹窗");
      AutojsUtil.clickSelector(id("close_btn"));
    }
  },
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
    // ksActive.tabFind();
    if (Tab.clickKsTab("关注") == false) {
      toastLog("请手动点击关注");
      sleep(10000);
    }

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
