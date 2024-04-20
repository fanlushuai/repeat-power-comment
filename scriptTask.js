const { Robot } = require("./robot");
const { AutojsUtil } = require("./autojsUtil");
const { Config } = require("./config");
const { LocalStorage } = require("./localStorage");

AutojsUtil.keepScreen();

// 在程序第二次运行的时候，就会开启控制台
// 动态确定控制台的位置
let consoleYRange = LocalStorage.getConsoleYRange();
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
}

// 内存隔离，重新加载配置
Config.loadConfig();

AutojsUtil.AddFloatContrlButton(function () {
  Robot.start();
});
