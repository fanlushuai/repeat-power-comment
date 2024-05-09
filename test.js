const { AutojsUtil } = require("./autojsUtil");
const { KS } = require("./ks");

// KS.comment("Test");

function xx(comment) {
  let firstCommentELe = text("快来抢首评吧").findOne(1500);
  if (firstCommentELe != null) {
    log("首评视频");
    firstCommentELe.setText(comment);
  } else {
    log("评论");
  }
}

xx("哈哈");
