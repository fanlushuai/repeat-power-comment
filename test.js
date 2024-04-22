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
const { LocalStorage } = require("./localStorage");

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


// app.startActivity({
//     data: "snssdk1180://search/trending",
// });

// let appName = '抖音'
// // log(app.launchApp(appName))

// log(app.getPackageName(appName))
// // com.ss.android.ugc.aweme
// app.launchPackage("com.ss.android.ugc.aweme")



// desc('抖音').findOne().click()

// Douyin.intoSearch()



// Douyin.boot()
// Douyin.intoSearch()
// Douyin.inputKeyWord("xxxx")
// Douyin.search()

// Douyin.filterTab()


// function clickTextByOCR(text, x, y, a, b) {
//     // AutojsUtil.autoPermisionScreenCapture();
//     var img = captureScreen(); // 截取当前屏幕图像
//     // var clip = images.clip(img, 0, 0, device.width, device.height / 3); // 裁剪图像，只保留上半部分
//     var clip = images.clip(img, x, y, a, b); // 裁剪图像，只保留上半部分
//     let res = paddle.ocr(clip);
//     // toastLog(JSON.stringify(res))
//     for (let t of res) {
//         if (t.text == text) {
//             // log("找到 %s %j", text, t)
//             log("OCR 点击 %s", text);
//             AutojsUtil.pressBounds(t.bounds);
//             return t;
//         }
//     }

//     console.error("ocr 点击失败 %s", text);
//     return false;
// }


// // requestScreenCapture(false)


// clickTextByOCR("最多点赞",
//     0,
//     0,
//     device.width,
//     device.height / 2)


// Douyin.filterMostStar()

// AutojsUtil.autoPermisionScreenCapture();


LocalStorage.localStorage().put("stopChild", false)

// Douyin.zongheTab()


// threads.start(function () {
//     const SC = text('立即开始').findOne(10000);
//     if (SC) {
//         const kj = SC.parent().children()
//         kj.forEach(e => {
//             if (e.className() == 'android.widget.CheckBox') e.click();
//             if (e.className() == "android.widget.Button" && e.text() == '立即开始') e.click();
//         });
//     } else toastLog("无法自动获得授权，请手动协助授权");
// })

//请求截图
//每次使用该函数都会弹出截图权限请求，建议选择“总是允许”。
// if (!requestScreenCapture()) {
//     toast("请求截图失败");
//     exit();
// }



// Douyin.waitResult()

// Douyin.video()
// Douyin.commentTab()

// Douyin.getHotComment()

// Douyin.commentIt("haha")
// Douyin.commentIt("haha")
Douyin.closeCommentTab()



AutojsUtil.pressXY(device.width / 2, b.bottom + 100)


function getBlankClickXY() {
    let ele = text('搜索').findOne()
    let b = ele.bounds()
    return { x: device.width / 2, y: b.bottom + 100 }
}

function xx() {
    // let ele = AutojsUtil.getEleBySelectorWithAutoRefresh(desc("关闭"), "关闭", 8, this.name)
    // AutojsUtil.press(ele)

    log("关闭评论Tab");



    let b = {
        left: 200,
        right: device.width - 200,
        top: device.height / 6,
        bottom: device.height / 5,
    };
    AutojsUtil.pressBounds(b);
    AutojsUtil.s13();

    // 查看评论右侧图标



    // let ele = id("com.ss.android.ugc.aweme:id/dc4")
    let ele = text('大家都在搜：')
        .visibleToUser(true)
        .findOnce();

    if (ele == null) {
        // 点击两次，防止失败
        AutojsUtil.pressBounds(b);
    }
}