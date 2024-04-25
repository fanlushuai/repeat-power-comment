"ui";

const { AutojsUtil } = require("./autojsUtil");
const { Config } = require("./config");
const { LocalStorage } = require("./localStorage");

auto.waitFor();

AutojsUtil.loadUI("./project.json", "./ui.xml");
// 初始化界面数据
Config.setLSConfig2UI();

AutojsUtil.autoServiceCheck();

function revoverBootButton() {
  AutojsUtil.buttonEnable(ui.boot, "启 动");
}

AutojsUtil.onChildStop(function (msg) {
  log("接收到广播 %s", msg)
  AutojsUtil.buttonEnable(ui.boot, "启 动");
  hasStart = false;
})

ui.emitter.on("resume", function () {
  revoverBootButton();
  hasStart = false;
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
  toast("缓存已经清除");
});

let hasStart = false;

ui.boot.click(function () {
  // 用来提供测试版本 
  var untilDate = new Date("2024-4-30 10:21:12")
  if (new Date().getTime() > untilDate.getTime()) {
    alert("脚本异常,请联系开发者");
    return;
  } else {
    toast("当前处于测试版本");
  }

  if (auto.service == null) {
    toastLog("请先开启无障碍服务！");
    return;
  }

  AutojsUtil.buttonDisable(ui.boot, "已启动");
  log("保存配置");
  Config.setUI2LSConfig();

  if (!hasStart) {
    hasStart = true;
    engines.execScriptFile("./scriptTask.js"); //简单的例子
  }
});


