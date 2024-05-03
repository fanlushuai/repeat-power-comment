// let b = text("综合").visibleToUser(true).findOne()
// // .parent().parent().parent().find(className("ImageView"))
// log("%j", b)

const { AutojsUtil } = require("./autojsUtil");
const { KS } = require("./ks");
const { LocalStorage } = require("./localStorage");


// log(xmlString)
// 假设 xmlString 是你的 XML 字符串
// "./ui.xml"
function parseUiXml(uiPath) {
  let xmlString = files.read(uiPath).toString();
  let uiComponent = {
    "checkIds": [],
    "textIds": [],
    "numberIds": []
  }
  let idRegex = /<(\S*).*id="([^"]*)".*\/>/g;
  let match;
  while (match = idRegex.exec(xmlString)) {
    let tagName = match[1];
    let idValue = match[2];
    let content = match[0]; // 匹配到的整个标签内容
    // console.log("Tag Name: " + tagName);
    // console.log("ID: " + idValue);
    // console.log("Content: " + content);
    if (tagName === "Switch" || tagName === "checkbox" || tagName === "radio") {
      if (idValue != 'autoService') {
        // 排除自动服务
        uiComponent.checkIds.push(idValue);
      }
    } else if (tagName === "input") {
      if (content.indexOf("inputType=\"number\"") > -1) {
        uiComponent.numberIds.push(idValue);
      } else {
        uiComponent.textIds.push(idValue);
      }
    } else {
      // 非输入类型的id，不做处理
    }
  }

  return uiComponent;
}

log(parseUiXml("./ui.xml"))




// // fullId("com.smile.gifmaker:id/cl_like")
// id("com.smile.gifmaker:id/cl_like").visibleToUser(true).waitFor();
// let likeEls = id("cl_like").visibleToUser(true).find();
// log(likeEls)
// let maxCountLikeEle;
// let maxCount = 0;
// for (let e of likeEls) {
//   let like_count = AutojsUtil.getEleTextByOCR(e)
//   log(like_count)

//   // 2.0万
//   if (like_count.indexOf("万") > -1) {
//     like_count = parseFloat(like_count.replace("万", "")) * 10000;
//   }

//   if (like_count > maxCount) {
//     maxCount = like_count;
//     maxCountLikeEle = e;
//   }
// }

// log(maxCountLikeEle)

// let hotComment = maxCountLikeEle
//   .parent()
//   .parent()
//   .parent()
//   .findOne(id("com.smile.gifmaker:id/comment"))
//   .getText();
// log("热评->", hotComment);

// function getKeysWordForWeb() {
//     let url = 'https://www.zgdypw.cn/data/searchDayBoxOffice.json?timestamp=' + new Date().getTime()
//     // log(url)

//     let rsp = http.get(url)

//     let topFilms = rsp.body.json().data.top10Films

//     let keywords = ""
// log(id("search_button").findOne());

// let e = idMatches(/(.*nick_name|.*tab)/)
//   .visibleToUser(true)
//   .findOne(5000);

// log(e);
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
