const Autojsx = {
  boot: function () {
    home();
    sleep(1000);
    app.launchApp("Autox.js v6");
    sleep(1000);
    // 侧边栏是否打开
    if (text("打开USB调试").exists()) {
      log("点击空白处");
      press(device.width - 10, device.height / 2, 1);
      sleep(500);
    }

    pageUpBySwipe();
  },
  backIfInbuildDir: function () {
    if (textMatches(/.*apk/).findOne(1000)) {
      // log("返回到首页")

      log("当前在build目录");

      back();
      sleep(500);
      back();
      sleep(500);
      pageUpBySwipe();

      this.boot();
      sleep(1000);
    }
  },
  pack: function (buildDir, projectName) {
    click(id("name").text(buildDir).findOne());

    click(id("build").findOne());

    function setVersion() {
      function editTextEle(name) {
        return text(name).findOne().parent().parent();
      }

      let now = new Date();
      let verisonName =
        now.getMonth() +
        1 +
        "-" +
        now.getDate() +
        "-" +
        now.getHours() +
        "-" +
        now.getMinutes() +
        "-" +
        now.getSeconds();

      // 保证是int类型

      let versionNum =
        "1" +
        (now.getMonth() + 1 > 9
          ? now.getMonth() + 1
          : "0" + (now.getMonth() + 1)) +
        "" +
        (now.getDate() > 9 ? now.getDate() : "0" + now.getDate()) +
        "" +
        (now.getHours() > 9 ? now.getHours() : "0" + now.getHours()) +
        "" +
        (now.getMinutes() > 9 ? now.getMinutes() : "0" + now.getMinutes()) +
        "";
      // (now.getSeconds() > 9 ? now.getSeconds() : "0" + now.getSeconds());
      log("设置版本");
      log(verisonName);
      log(versionNum);
      editTextEle("应用名称").setText(projectName);
      editTextEle("版本名称").setText(verisonName);
      editTextEle("版本号").setText(versionNum);

      return projectName + "_v" + verisonName + ".apk";
    }

    let apkName = setVersion();

    log("开启 PaddleOCR");
    click(scrollUtillFind(text("PaddleOCR")));

    log("开启 打包默认的PaddleOCR训练数据");
    click(scrollUtillFind(text("打包默认的PaddleOCR训练数据")));

    log("关闭 显示启动界面");
    click(scrollUtillFind(text("显示启动界面")));

    log("开启 需要后台弹出界面权限");
    click(scrollUtillFind(text("需要后台弹出界面权限")));

    log("开启 需要无障碍服务");
    click(scrollUtillFind(text("需要无障碍服务")));

    log("开启 需要悬浮窗权限");
    click(scrollUtillFind(text("需要悬浮窗权限")));

    log("开启 简单加密js文件");
    click(scrollUtillFind(text("简单加密js文件")));

    log("点击 完成");
    click(desc("完成").findOne());

    while (!text("打包成功").exists()) {
      sleep(500);
    }
    log("打包成功 %s", apkName);

    return apkName;
  },
  back: function () {
    log("返回");
    back();
    sleep(800);
    back();
    sleep(800);
    click(text("直接退出").findOne(3000));

    this.buildDir();

    // log("返回到首页")
    // back()
    // sleep(500)
    // pageUpBySwipe()
  },
  buildDir: function () {
    pageUpBySwipe();

    sleep(1000);
    log("跳转到build位置");

    click(text("build").id("name").findOne());
    sleep(1000);

    pageUpBySwipe();

    toast("老板，打包完成！！");
    sleep(1000);
  },
  share: function (apkName) {
    click3Dot(apkName);

    function click3Dot(apkName) {
      function get3DotEle(apkName) {
        let eles = id("item").find();
        for (let e of eles) {
          if (e.findOne(text(apkName))) {
            let es = e.find(className("android.widget.LinearLayout"));
            for (let a of es) {
              if (a.bounds().left > device.width / 2) {
                return a;
              }
            }
          }
        }
      }

      // let dot3Ele = get3DotEle("3-")
      let dot3Ele = get3DotEle(apkName);
      let db = dot3Ele.bounds();
      log("点击3dot");
      press(db.centerX(), db.centerY(), 1);
    }

    sleep(1500);
    log("点击 发送");
    click(text("发送").findOne());
  },
  getClipX: function (callback) {
    // 清空剪切板存储
    let clipStorage = storages.create("clip");
    clipStorage.put("1", "111111");

    var w = floaty.window(
      <frame gravity="center" bg="#ffffff">
        <text id="text"></text>
      </frame>
    );
    ui.run(function () {
      w.requestFocus();
      setTimeout(() => {
        // toastLog();
        let c = getClip();
        log("读取剪切板内容: %s", c);
        // 设置剪切板存储
        let clipStorage = storages.create("clip");
        clipStorage.put("1", c);
        w.disableFocus();
        w.close();
        //执行回调函数,异步处理
        if (callback) {
          threads.start(function () {
            callback(c);
          });
        }
      }, 1);
    });

    //可以阻塞获取值 // 这样是错误的。获取不到
    return () => {
      let clipStorage = storages.create("clip");
      while (1) {
        let c = clipStorage.get("1", "111111");
        if (c != "111111") {
          log("阻塞获取剪切板内容为：%s", c);
          return c;
        }
        sleep(200);
      }
    };
  },
  setClipX: function (text) {
    console.log("设置剪切板=> %s", text);
    setClip(text);
    sleep(500);
  },
};

const WeiXin = {
  sendTo: function (name, msg) {
    WeiXin.boot();
    click(text(name).findOne());
    sleep(2000);

    // let clipContent = Autojsx.getClipX()();

    id("com.tencent.mm:id/bkk") //点击必须使用全id！！！
      .clickable(true)
      .findOne()
      .setText(msg);
    log("设置输入框");
    sleep(3000);

    click(text("发送").findOne());
    log("点击发送");
    back(); //收回键盘
    back(); //返回首页
    log("发送微信链接结束");
  },
  boot: function () {
    app.launchApp("微信");
    sleep(2000);
  },
};

const Oppo = {
  sendToWss: function () {
    log("上传文叔叔");
    click(text("文叔叔").findOne());
    sleep(500);
    click(text("通过文叔叔发送").findOne());
    sleep(500);

    let j = descMatches(/(跳过.*)/)
      .clickable(true)
      .findOne(2000);
    if (j) {
      log("跳过广告");
      sleep(500);
      // click(j);
      j.click();
    }

    let e = desc("发送").findOne();
    sleep(3000); //排除，悬浮气泡提示
    // click(e);
    e.click();

    // 不存在，就一直等着
    while (!desc("上传中…").exists()) {
      sleep(1000);
    }

    log("上传中");

    while (desc("上传中…").exists()) {
      sleep(1000);
    }

    log("上传成功");
    sleep(2000);
    let downloadUrl = descMatches(/(https:.*)/)
      .findOne(10000)
      .desc();
    log("获取链接 %s", downloadUrl);
    return downloadUrl;
    // log("长按复制");
    // let b = desc("复制").findOne();
    // press(b.bounds().centerX(), b.bounds().centerY(), 800);
  },
};

function click(b) {
  sleep(1 * 1000);
  // AutojsUtil.showPoint(b.bounds().centerX(), b.bounds().centerY());
  // log("点击 %s %s", b.bounds().centerX(), b.bounds().centerY());
  press(b.bounds().centerX(), b.bounds().centerY(), 1);
  sleep(1 * 1000);
}

function scrollUtillFind(selector) {
  while (1) {
    let e = selector.findOne(1000);
    if (e) {
      sleep(300);
      return e;
    }
    pageDownBySwipe();
  }
}

function pageUpBySwipe() {
  var h = device.height; //屏幕高
  var w = device.width; //屏幕宽
  var x = random((w * 1) / 3, (w * 2) / 3); //横坐标随机。防止检测。
  var h1 = (h / 6) * 5; //纵坐标6分之5处
  var h2 = h / 6; //纵坐标6分之1处
  swipe(x, h2, x, h1, 500); //向上翻页(从纵坐标6分之1处拖到纵坐标6分之5处)
}

function pageDownBySwipe() {
  var h = device.height; //屏幕高
  var w = device.width; //屏幕宽
  // var x = (w / 3) * 2; //横坐标2/3处。
  var x = random((w * 2) / 5, (w * 3) / 5); //横坐标随机。防止检测。
  var h1 = (h / 6) * 5; //纵坐标6分之5处
  var h2 = h / 6; //纵坐标6分之1处
  swipe(x, h1, x, h2, 100); //向下翻页(从纵坐标6分之5处拖到纵坐标6分之1处)
}

let projectName = "inHereBuild";

function build(projectName) {
  Autojsx.boot();
  Autojsx.backIfInbuildDir();

  let apkName = Autojsx.pack("inHereBuild", projectName);
  Autojsx.back();
  return apkName;
}

function share(apkName) {
  Autojsx.share(apkName);
  let downloadUrl = Oppo.sendToWss();
  WeiXin.sendTo("文件传输助手", downloadUrl);
}

let projectJsonPath = "./project.json";
let projectJsonStr = files.read(projectJsonPath).toString();
let projectData = JSON.parse(projectJsonStr);

// log(projectData);

let apkName = build(projectData.name);
log(apkName);
// share(apkName);
