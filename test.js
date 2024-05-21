const { AutojsUtil } = require("./autojsUtil");
const { LocalStorage } = require("./localStorage");
LocalStorage.allowChild()

// KS.comment("Test");

log("xxx")
AutojsUtil.clickSelectorWithAutoRefresh(
    idMatches(/(.*nick_name_layout.*|.*subject_op_title_newfeed|.*feed_card_op_like_tv.*)/).visibleToUser(true),
    "进视频",
    8,
    this.name
  );

  log("xxx")
  log(  idMatches(/(.*nick_name_layout.*|.*subject_op_title_newfeed|.*feed_card_op_like_tv.*)/).visibleToUser(true).findOne())
  log("xxx")