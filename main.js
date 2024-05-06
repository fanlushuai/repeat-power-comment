"ui";

const { AutojsUtil } = require("./autojsUtil");
const { Config } = require("./config");
const { KS } = require("./ks");
const { LocalStorage } = require("./localStorage");

auto.waitFor();
AutojsUtil.loadUI("./project.json", "./ui.xml");
Config.setLSConfig2UI();
AutojsUtil.autoServiceCheck();

function revoverBootButton() {
  AutojsUtil.buttonEnable(ui.boot, "启 动");
}

AutojsUtil.onChildStop(function (msg) {
  log("接收到广播 %s", msg);
  AutojsUtil.buttonEnable(ui.boot, "启 动");

  hasStart = false;
  log("3s之后，停止子脚本");
  setTimeout(() => {
    AutojsUtil.stopOtherScriptEngine();
  }, 3000);
  threads.shutDownAll(); //显然，只能停止当前脚本内部的由threads.start启动的所有线程。部分父子
});

AutojsUtil.onChildReboot(function (msg) {
  log("接收到重启广播");
  // 重新开始执行
  AutojsUtil.execScriptFile("./scriptTask.js");
});

ui.emitter.on("resume", function () {
  // log("切换回界面就会执行这个");
  // todo 判断子脚本引擎是否存在，然后在进行操作
  revoverBootButton();
  hasStart = false;
  // log("ssss");
  // AutojsUtil.stopOtherScriptEngine();
});

ui.getAllAppNames.click(function () {
  threads.start(function () {
    // 启动快手
    let ksNames = AutojsUtil.getAllAppNames("快手")
    let ks = ksNames.join(",")
    log("分身快手:" + ks)

    // 启动抖音
    let dyNames = AutojsUtil.getAllAppNames("抖音")
    let dy = dyNames.join(",")
    log("分身抖音:" + dy)

    ui.run(function () {
      ui.ksAppNames.setText(ks);
      ui.dyAppNames.setText(dy);
    });
  })


})

ui.useCNMoive.click(function () {
  threads.start(function () {
    function getKeysWordForWeb() {
      let url =
        "https://www.zgdypw.cn/data/searchDayBoxOffice.json?timestamp=" +
        new Date().getTime();
      // log(url)

      let rsp = http.get(url);

      let topFilms = rsp.body.json().data.top10Films;

      let keywords = "";

      for (let film of topFilms) {
        // log(film.filmName)
        keywords += film.filmName + ",";
      }

      keywords = keywords.substring(0, keywords.length - 1);
      log(keywords);
      return keywords;
    }
    let keywords = getKeysWordForWeb();
    toastLog(keywords);
    if (keywords && keywords.length >= 2) {
      ui.run(function () {
        ui.keywords.setText(keywords);
      });
    }
  });
});

ui.save.click(function () {
  log("保存配置");
  Config.setUI2LSConfig();
  ui.run(function () {
    AutojsUtil.buttonFlashing(ui.save, "已 保 存");
  });
});

ui.clearCache.click(function () {
  log("清除缓存");
  LocalStorage.localStorage().clear();
  LocalStorage.appStorage("快手").clear();
  LocalStorage.appStorage("抖音").clear();
  toast("缓存已经清除");
});
ui.resetConsole.click(function () {
  log("控制台位置已重置");
  LocalStorage.clearConsolePostion("快手");
  LocalStorage.clearConsolePostion("抖音");
  toast("控制台位置已重置");
});

let hasStart = false;

ui.boot.click(function () {
  // 用来提供测试版本
  // var untilDate = new Date("2024-5-7 10:21:12");
  // if (new Date().getTime() > untilDate.getTime()) {
  //   alert("脚本异常,请联系开发者");
  //   return;
  // } else {
  //   toast("当前处于测试版本");
  // }

  if (auto.service == null) {
    toastLog("请先开启无障碍服务！");
    return;
  }

  AutojsUtil.buttonDisable(ui.boot, "已启动");
  log("保存配置");
  Config.setUI2LSConfig();

  if (!hasStart) {
    hasStart = true;

    // 设置重启次数为0
    LocalStorage.setBootTimes(0);

    engines.execScriptFile("./scriptTask.js"); //简单的例子
  }
});

// threads.start(function () {
//   log("启动辅助线程");
//   // 20s时间处理
//   while (1) {
//     KS.closePop();
//   }
// });
