const { Robot } = require("./robot");
const { AutojsUtil } = require("./autojsUtil");
const { Config } = require("./config");
const { LocalStorage } = require("./localStorage");
const { Douyin } = require("./douyin.js");
const { KS } = require("./ks.js");
// AutojsUtil.keepScreen();

AutojsUtil.onChildStop(function (msg) {
  log("接收到广播 %s", msg);
  threads.shutDownAll(); //显然，只能停止自己的子线程
  // AutojsUtil.stopOtherScriptEngine();
});

LocalStorage.incBootTimes();

device.keepScreenOn(3600 * 1000);

// 在程序第二次运行的时候，就会开启控制台
// 动态确定控制台的位置

// 内存隔离，重新加载配置
Config.loadConfig();

AutojsUtil.AddFloatContrlButton(function () {
  if (Config.openDY) {
    Robot.targetApp = Douyin;

    let consoleYRange = LocalStorage.getConsoleYRange(Robot.targetApp.name);
    if (consoleYRange) {
      let console = AutojsUtil.configBaseConsole("热评搬运");
      let dw = device.width;
      let dh = device.height;
      let cw = (dw * 3) / 10;
      // let ch = (dh * 2) / 8;

      // 冗余60
      let ch = consoleYRange.maxY - consoleYRange.minY - 60;
      console.setSize(cw, ch); //需要前面等待一会
      console.setPosition(dw - cw, consoleYRange.minY);
      sleep(1500);
    }

    Robot.start();
  }

  if (Config.openKS) {
    Robot.targetApp = KS;

    let consoleYRange = LocalStorage.getConsoleYRange(Robot.targetApp.name);
    if (consoleYRange) {
      let console = AutojsUtil.configBaseConsole("热评搬运");
      let dw = device.width;
      let dh = device.height;
      let cw = (dw * 3) / 10;
      // let ch = (dh * 2) / 8;

      // 冗余60
      let ch = consoleYRange.maxY - consoleYRange.minY - 60;
      console.setSize(cw, ch); //需要前面等待一会
      console.setPosition(dw - cw, consoleYRange.minY);
      sleep(1500);
    }

    Robot.start();
  }
});
