const { AutojsUtil } = require("./autojsUtil");
const { KS } = require("./ks");

// KS.comment("Test");


let ele=text('打开西瓜视频，发表评论').visibleToUser(true).findOne(3000) 
log(ele)