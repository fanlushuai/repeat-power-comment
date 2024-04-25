



// let b = text("综合").visibleToUser(true).findOne()
// // .parent().parent().parent().find(className("ImageView"))
// log("%j", b)

const { AutojsUtil } = require("./autojsUtil")
const { KS } = require("./ks")






// id("com.ss.android.ugc.aweme:id/tv_desc").findOne().click()

// let eles=className("ImageView").visibleToUser(true).find()
// log(eles.size())


// let ele = AutojsUtil.getEleBySelectorWithAutoRefresh(
//     id('editor').visibleToUser(true),
//     "搜索输入框",
//     8,
//     this.name
//   );

//   ele.setText()

// KS.search()
// id("comment_frame")

// let commentAll = []
// let commentEles = id("comment_frame").find()
// for (let c of commentEles) {
//     if (c.find(id("comment_author_tag")).empty()) {
//         let comments = c.find(id("comment"))
//         for (let c of comments) {
//             commentAll.push(c)
//         }
//     } else {
//         log("包含作者标签")
//     }
// }

// for (let c of commentAll) {
//     log(c.getText())
// }

// id("tab_filter_image")

// let firstEle = id('comment').findOne()
// let mainCommentleftPositon = firstEle.bounds().left

// let commentAll = id('comment').find()

// for (let c of commentAll) {

//     // 去除子评论
//     if (c.bounds().left != mainCommentleftPositon) {
//         continue
//     }

//     log("处理 %s",c.getText())

//     // 去除置顶
//     let top = c.parent().findOne(id("comment_bottom_tag"))

//     log(top)

//     if (top) {
//         log("包含置顶")
//         continue
//     }

//     // 去除作者
//     let author = c.parent().findOne(id("comment_author_tag"))
//     if (author) {
//         log("是作者评论")
//         continue
//     }

//     log("---> %s",c.getText())

// }

// log(id('comment').findOne().getText())
// log(id('comment').findOne().parent().parent().findOne(id("comment_bottom_tag")))


// text('EditText')

id('editor').setText('xx')