// let b = text("综合").visibleToUser(true).findOne()
// // .parent().parent().parent().find(className("ImageView"))
// log("%j", b)

const { AutojsUtil } = require("./autojsUtil");
const { KS } = require("./ks");
const { LocalStorage } = require("./localStorage");

// let eles = text("确定").find();
// // log(eles);

// for (let e of eles) {
//   log("xx");
//   log(e.text());
//   AutojsUtil.clickEle(e);
// }

function logEx(ele) {
  //   let l = "className:" + ele.className();
  if (ele == null || ele.className() == null) {
    log("xx");
    return;
  }
  let l = "cN:" + ele.className().replace("android", "").replace("widget", "");

  if (ele.id()) {
    l += " - id: " + ele.id().split("/")[1];
  }

  if (ele.text()) {
    l += " - text: " + ele.text();
  }

  if (ele.contentDescription) {
    l += " - desc: " + ele.contentDescription;
  }

  if (ele.clickable()) {
    l += " - clickable: true";
  }

  if (ele.scrollable()) {
    l += " - scrollable: true";
  }

  return l;
}
// // AutojsUtil.clickSelector(id("btn_buy"));
// let e = id("btn_buy").findOne();
// // logEx(e);
// log(e.bounds());
// let b = e.bounds();
// // press(b.centerX(), b.centerY(), 2);
// // press(b.centerX() + 5, b.centerY() + 6, 2);
// log(device.width);
// log(device.height);
// log(b.centerX());
// log(b.centerY());
// var w = floaty.rawWindow(<frame gravity="center" bg="#44ffcc00" />);

// w.setSize(-1, -1);
// w.setTouchable(false);

// setTimeout(() => {
//   w.close();
// }, 4000);

// press(b.centerX() - 5, b.centerY() - 8, 1);
// swipe(b.centerX() - 5, b.centerY() - 8, b.centerX() + 5, b.centerY() + 6, 1000);
// press(b.centerX() + 5, b.centerY() + 6, 2);
// press(b.centerX() + 5, b.centerY() + 6, 2);
press(852, 2300, 1000);

// AutojsUtil.pageDownBySwipe();
// AutojsUtil.clickEle(e);
