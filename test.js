const { AutojsUtil } = require("./autojsUtil");
const { Douyin } = require("./douyin");
const { LocalStorage } = require("./localStorage");
LocalStorage.allowChild();

// Douyin.comment("哈哈");

// // KS.comment("Test");

// log("xxx")
// AutojsUtil.clickSelectorWithAutoRefresh(
//     idMatches(/(.*nick_name_layout.*|.*subject_op_title_newfeed|.*feed_card_op_like_tv.*)/).visibleToUser(true),
//     "进视频",
//     8,
//     this.name
//   );

//   log("xxx")
//   log(  idMatches(/(.*nick_name_layout.*|.*subject_op_title_newfeed|.*feed_card_op_like_tv.*)/).visibleToUser(true).findOne())
//   log("xxx")

// 未点赞，喜欢6.4万，按钮

let e=descEndsWith("，按钮").visibleToUser(true).clickable().find()
    // log(e[i].desc())

    let t=e[1].desc().replace("已点赞，喜欢","").replace("未点赞，喜欢","").replace("，按钮","")
    log(t)
    // e[1].parent().click()
    let ee=text(t).findOnce()
    click(ee.bounds().centerX()-device.width/4,ee.bounds().centerY())
    




