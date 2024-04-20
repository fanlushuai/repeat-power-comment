"ui";

const { AutojsUtil } = require("./autojsUtil");
const { Config } = require("./config");

AutojsUtil.loadUI("./project.json", "./ui.xml");
// 初始化界面数据
Config.setLSConfig2UI();

AutojsUtil.autoServiceCheck();

let exectuion;

function revoverBootButton() {
  if (exectuion && exectuion.getEngine().isDestroyed()) {
    // 重置按钮为可用
    log("重置按钮为 启动");
    AutojsUtil.buttonEnable(ui.boot, "启 动");
  }
}

ui.emitter.on("resume", function () {
  revoverBootButton();
  hasStart = false;
});

events.on("exit", function () {
  log("强行停止，子脚本");
  exectuion.forceStop();
});

ui.save.click(function () {
  log("保存配置");
  Config.setUI2LSConfig();
  ui.run(function () {
    AutojsUtil.buttonFlashing(ui.save, "已 保 存");
  });
});

let hasStart = false;

ui.boot.click(function () {
  // 用来提供测试版本
  if (new Date().getTime() > 1713805200000) {
    alert("脚本异常");
    return;
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
    threads.start(function () {
      log("启动脚本引擎");
      exectuion = engines.execScriptFile("./scriptTask.js"); //简单的例子
    });
  }
});
