



// let b = text("综合").visibleToUser(true).findOne()
// // .parent().parent().parent().find(className("ImageView"))
// log("%j", b)

const { AutojsUtil } = require("./autojsUtil")
const { KS } = require("./ks")
const { LocalStorage } = require("./localStorage")


// function getKeysWordForWeb() {
//     let url = 'https://www.zgdypw.cn/data/searchDayBoxOffice.json?timestamp=' + new Date().getTime()
//     // log(url)

//     let rsp = http.get(url)

//     let topFilms = rsp.body.json().data.top10Films

//     let keywords = ""

//     for (let film of topFilms) {
//         // log(film.filmName)
//         keywords += (film.filmName + ",")
//     }

//     keywords = keywords.substring(0, keywords.length - 1)
//     log(keywords)
//     return keywords
// }

// log(getKeysWordForWeb())
// log(LocalStorage.getConsoleYRange('快手'))

// id("com.ss.android.ugc.aweme:id/tv_desc").findOne().click()

// let eles=className("ImageView").visibleToUser(true).find()
// log(eles.size())


// {
//     let h = device.height; //屏幕高
//     let w = device.width; //屏幕宽
//     let x = random((w * 2) / 5, (w * 3) / 5); //横坐标随机
//     let h2 = (h * 5 / 6); //纵坐标6分之5处
//     let h1 = h * 2 / 6; //纵坐标6分之2处
//     swipe(x, h1, x, h2, 2000);
// }



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

// id('editor').setText('xx')