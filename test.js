// id('g6t').findOne().click()
// id('tkv').findOne().click()
// id('tku').findOne().click()
// id('tj4').findOne().click()
// id('d7h').findOne().click()
// id('lwb').findOne().click()
// id('s=q').findOne().click()
// id('tbv').findOne().click()
// id('s+o').findOne().click()
// id('c=c').findOne().click()
// id('d=w').findOne().click()
// id('g=_').findOne().click()
// id('iia').findOne().click()

const { AutojsUtil } = require("./autojsUtil");
const { Douyin } = require("./douyin");

// AutojsUtil.pageDownBySwipe()
// Douyin.closeCommentTab()
// storages.create("xxxxjk23232").clear();
// let name = "抖音";
// let packageName = getPackageName(name) || getAppName(name);
// if (!packageName) {
//   log("找不到packageName" + packageName);
//   return;
// }

// let ele = id("com.ss.android.ugc.aweme:id/dc4").visibleToUser(true).findOnce();

// log(ele);

// AutojsUtil.getEleBySelectorWithAutoRefresh(
//     id("com.ss.android.ugc.aweme:id/kb7").visibleToUser(true),
//     "搜索tab",
//     8,
//     this.name
//   );


app.startActivity({
    data: "snssdk1180://search/trending",
});